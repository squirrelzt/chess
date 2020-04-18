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
            role: 'consumer'
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
        } else {
            window.location.href="/login";
        }
        
    }

    //初始化页面时查询页面状态是active还是lock
    fetchChesserById(params) {
        auth.fetch('/queryChesserById','get',params,(result)=>{
            const state = localStorage.setItem('state', result.state);
            const role = localStorage.getItem('role', result.role);
            if (state) {
                let semaphore = 0;
                if (state == 'active' && role == 'consumer') {
                    semaphore = 1;
                } else if (state == 'active' && role == 'producer') {
                    semaphore = 0;
                } else if (state == 'lock' && role == 'consumer') {
                    semaphore = 0;
                } else if (state == 'lock' && role == 'producer') {
                    semaphore = 1;
                }
                this.setState({
                    semaphore
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
        let semaphore;
        items[item.x-1][item.y-1].state = 'DISPLAY'; 
        const role = localStorage.getItem('role');
        if (role == 'consumer') {
            semaphore = 0;
        } else if (role == 'producer') {
            semaphore = 1;
        } else if (!role) {
            //TODO 第一次翻子
            semaphore = 0;
            this.firstReverseChess(item.id, item.color);
        }
        this.setState({
            items,
            semaphore
        });
    }
    //第一次翻子
    firstReverseChess(itemId,itemColor) {
        localStorage.setItem('role','consumer');
        const chesserId = localStorage.getItem('id');
        let params = {
            id: itemId,
            chesserId,
            side: itemColor
        }
        auth.fetch('/firstReverseChess','get',params,(result)=>{
            console.log(result)
        });
    }
    render() {
        const { items, selectedItem, selectedItemBackgroudColor, started, semaphore, role } = this.state;
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
                                                disabled={(role=='consumer'&&semaphore==0)||(role=='producer'&&semaphore==1)}>
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