import React, { Component } from 'react';
import {  Menu, Breadcrumb, Icon, Row, Col, Button, message, Table } from 'antd';
import auth from '../common/auth';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state={
            items: [['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','','']],
            selectedItem: '',
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

        data.forEach(element => {
            items[element.x-1][element.y-1] = element;
        });
        this.setState({
            items
        })
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
        });
    }
    // 点击棋子
    onSelect(item) {
        // 未加载数据，返回
        if (!item) {
            return;
        }
        // 判断此棋子是否已翻开
        if (item.state='NONE') {
            this.reverseChess(item);
        } else {
            this.setState({
                selectedItem: item
            })
        }
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
            if (result && result.result ==0) {
                auth.fetch('/queryPersonById','get',params,(result)=>{
                    if (result) {
                        localStorage.setItem('color', result.color);
                        localStorage.setItem('state', result.state);
                    }
                });
            }
        });
    }
    render() {
        const { items, selectedItem, selectedItemBackgroudColor, semaphore, role } = this.state;
        return (
            <div className="btn-margin">
                <div className="monitor-frame">
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