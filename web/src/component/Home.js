import React, { Component } from 'react';
import { Icon, Row, Col, Button, message } from 'antd';
import { auth } from '../common/auth';
import './css/home.less'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state={
            items: [['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','','']],
            selectedItem: '',
            selectedOpponentItem: '',
            selectedItemBackgroudColor: '#6387ea',
            data: [],
            started: false,
            semaphore: 1,
            role: 'CONSUMER'
        }
    }
    
    fetch(params = {}) {
        auth.fetch('/query','get',params,(result)=>{
            this.initData(result);
        });
    }

    initData(data) {
        const items = [['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','','']];
        if (data) {
            data.forEach(element => {
                items[element.x-1][element.y-1] = element;
            });
            this.setState({
                items
            })
        }
    }

    componentDidMount(){
        const id = localStorage.getItem('id');
        if (id) {
            this.fetch();
            this.fetchChesserById({id:id});
            setInterval(()=>{
                this.fetch();
                this.fetchChesserById({id:id});
            },4000)
        } else {
            window.location.href="/login";
        }
        
    }

    //查询页面状态是active还是lock
    fetchChesserById(params) {
        auth.fetch('/queryPersonById','get',params,(result)=>{
            const role = result.role;
            const state = result.state;
            localStorage.setItem('role', role);
            localStorage.setItem('state', state);
            if (state && role) {
                this.lockFrame(state, role);
            }
        });
    }

    // 锁定页面
    lockFrame(state, role) {
        let semaphore = 0;
        if (state == 'ACTIVE' && role == 'CONSUMER') {
            semaphore = 1;
        } else if (state == 'ACTIVE' && role == 'PRODUCER') {
            semaphore = 0;
        } else if (state == 'LOCK' && role == 'CONSUMER') {
            semaphore = 0;
        } else if (state == 'LOCK' && role == 'PRODUCER') {
            semaphore = 1;
        }
        this.setState({
            semaphore,
            role
        })
    }
    // 点击棋子
    onSelect(item) {
        // 未加载数据，返回
        if (!item) {
            return;
        }
        // 判断此棋子是否已翻开
        if (item.state == 'NONE') {
            this.setState({
                selectedItem: '',
                selectedOpponentItem: ''
            })
            this.reverseChess(item);
        } else if (item.state == 'DISPLAY') {
            if (item.color !== localStorage.getItem('color') && !this.state.selectedItem) {
                return;
            }
            if (!this.state.selectedItem) {
                if (item.code == '') {
                    return;
                }
                // 选中要操作的棋子
                this.setState({
                    selectedItem: item
                })
            } else {
                this.operateChess(item);
            }
            
        }
    }

    // 兑子，吃子，移动操作
    operateChess(selectedOpponentItem) {
        const selectedX = this.state.selectedItem.x;
        const selectedY = this.state.selectedItem.y;
        const selectedColor = this.state.selectedItem.color;
        // 颜色相同，重新选择
        if (selectedColor == selectedOpponentItem.color) {
            this.setState({
                selectedItem: selectedOpponentItem
            })
            return;
        }
        if (selectedX != selectedOpponentItem.x && selectedY != selectedOpponentItem.y) {
            message.error('不同行或列的数据不能进行操作');
            return;
        }

        let state = localStorage.getItem('state');
        if (state == 'ACTIVE') {
            state = 'LOCK';
        } else if (state == 'LOCK') {
            state = 'ACTIVE';
        }
        
        this.lockFrame(state, localStorage.getItem('role'));
        this.fetchAllOver(this.state.selectedItem, selectedOpponentItem);
        // 兑子
        // if (this.state.selectedItem.code == selectedOpponentItem.code) {
        //     this.fetchAllOver(selectedItem, selectedOpponentItem);
        // }

    }

    fetchAllOver(selectedItem, selectedOpponentItem) {
        const chessId = selectedItem.id;
        const opponentChessId = selectedOpponentItem.id;
        const personId = localStorage.getItem('id');
        const opponentId = localStorage.getItem('opponentId');
        const personState = localStorage.getItem('state');
        let params = {
            chessId,
            opponentChessId,
            personId,
            opponentId,
            personState
        }
        auth.fetch('/operate','get',params,(result)=>{
            if (result && result.result == 0) {
                this.setState({
                    selectedItem: ''
                })
            }
        });
    }
    
    // 翻子
    reverseChess(item) {
        let items = this.state.items;
        let semaphore = this.state.semaphore;
        items[item.x-1][item.y-1].state = 'DISPLAY'; 
        const role = localStorage.getItem('role');
        if (role == 'CONSUMER') {
            semaphore = 0;
            this.setState({
                items,
                semaphore
            });
            this.commonReverseChess(item.id);
        } else if (role == 'PRODUCER') {
            semaphore = 1;
            this.setState({
                items,
                semaphore
            });
            this.commonReverseChess(item.id);
        }
         if (!role) {
            //TODO 第一次翻子
            semaphore = 0;
            this.setState({
                items,
                semaphore
            });
            this.firstReverseChess(item.id, item.color);
        }
    }
    commonReverseChess(itemId) {
        const personId = localStorage.getItem('id');
        const opponentId = localStorage.getItem('opponentId');
        let personState = localStorage.getItem('state');
        if (personState == 'ACTIVE') {
            localStorage.setItem('state', 'LOCK');
        } else if (personState == 'LOCK') {
            localStorage.setItem('state', 'ACTIVE');
        }
        personState = localStorage.getItem('state');
        let params = {
            personId,
            opponentId,
            personState,
            chessId: itemId
        }
        auth.fetch('/reverseChess','get',params,(result)=>{
            if (result && result.result == 1) {
                const state = localStorage.getItem('state');
                let semaphore = this.state.semaphore
                if ("PRODUCER" == state) {
                    semaphore += 1;
                } else if ('CONSUMER' == state) {
                    semaphore -= 1;
                }
                this.setState({
                    semaphore
                })
            }
        });
    }
    //第一次翻子
    firstReverseChess(itemId,itemColor) {
        localStorage.setItem('role','CONSUMER');
        const personId = localStorage.getItem('id');
        const opponentId = localStorage.getItem('opponentId');
        let params = {
            chessId: itemId,
            personId,
            opponentId,
            color: itemColor
        }
        auth.fetch('/firstReverseChess','get',params,(result)=>{
            if (result && result.result == 0) {
                auth.fetch('/queryPersonById','get',{id: personId},(res)=>{
                    if (res) {
                        localStorage.setItem('color', res.color);
                        localStorage.setItem('state', res.state);
                    }
                });
            }
        });
    }
    handleCancel() {
        message.success('和局')
      }
      handleRest() {
        auth.fetch('/initData','get','',(result)=>{
            if (result && result.result == 0) {
              message.success('重开成功');
              this.setState({
                  role: 'CONSUMER',
                  semaphore: 1
              })
            } else {
              message.error('重开失败');
            }
        });
      }
    render() {
        const { items, selectedItem, selectedItemBackgroudColor, semaphore, role } = this.state;
        return (
            <div className="btn-margin">
                <div className="monitor-frame">
                    <div className="layout-operation">
                        <Button type="primary" size="large" onClick={this.handleRest.bind(this)}>重开</Button>
                        <Button type="primary" onClick={this.handleCancel.bind(this)}>结束</Button>
                    </div>
                    <div className="chess-container">
                        {items.map((rowItem,rowIndex)=>{
                            return (
                                <Row key={rowIndex}>
                                    {rowItem.map((colItem, colIndex) => {
                                        return (
                                            <Col span={3} key={colIndex}>
                                                <Button shape="circle" 
                                                style={{color:colItem?colItem.color:'#fff',
                                                        backgroundColor: selectedItem && (selectedItem.x == colItem.x &&
                                                            selectedItem.y==colItem.y)?selectedItemBackgroudColor:'tan'}}
                                                onClick={this.onSelect.bind(this, colItem)}
                                                disabled={(role=='CONSUMER'&&semaphore==0)||(role=='PRODUCER'&&semaphore==1)}>
                                                    {colItem && colItem.state == 'DISPLAY'?colItem.name:''}
                                                </Button>
                                            </Col>
                                        )
                                    })
                                    }
                                </Row>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        );
    }
}