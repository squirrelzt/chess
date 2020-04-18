import React, { Component } from 'react';
import {  Menu, Breadcrumb, Icon, Row, Col, Button, message, Table } from 'antd';
import auth from '../common/auth';

let columns = [
    {
        title: '1',
        dataIndex: 'name',
        key: '1'
    }, {
        title: '2',
        dataIndex: 'color',
        key: '2'
    }
];

let dataSource = [
    {
        key: '1',
        name: '帅',
        data: {
            name: '帅',
            color: 'RED',
            x: '1',
            y: '1',
            state: 'NONE'
        }
    }, {
        key: '2',
        name: '士',
        data: {
            name: '士',
            color: 'RED',
            x: '1',
            y: '2',
            state: 'NONE'
        }
    }
]

  
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state={
            items: [['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','','']],
            selectedItem: '',
            selectedItemBackgroudColor: '#6387ea',
            data: [],
        }
    }
    

    fetch(params = {}) {
        this.setState({ loading: true });
        auth.fetch('/query','get',params,(result)=>{
            // console.log("------------------");
            // console.log(result);
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

    componentWillMount(){
        // console.log(localStorage.getItem('username'))
        this.fetch();
    }

    fileList(item) {
        if (item.directory) {
            return (
                <div key={item.filename + item.updateTime}>
        <img className="dir-img" src="./../../images/dir.png"/>
                <div className="monitor-file">{item.filename}</div>
            </div>

        )
        } else {
            return (
                <div key={item.filename + item.updateTime}>
        <img className="dir-img" src="./../../images/txt.png"/>
                <div className="monitor-file">{item.filename}</div>
            </div>
        )
        }
    }

    // 点击棋子
    onSelect(item) {
        // 未加载数据，返回
        if (!item) {
            return;
        }
        this.setState({
            selectedItem: item
        })
        this.reverseChess(item);
        
    }

    // 翻子
    reverseChess(item) {
        // 判断当前棋子是否处于显示状态
        if (item.state == 'NONE') {
            let items = this.state.items;
            items[item.x-1][item.y-1].state = 'DISPLAY'; 
            this.setState({
                items
            });
        }
    }
    render() {
        // console.log('+++++++++++++++')
        // console.log(this.state.items)
        const { items, selectedItem, selectedItemBackgroudColor } = this.state;
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
                                                onClick={this.onSelect.bind(this, colItem)}>
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