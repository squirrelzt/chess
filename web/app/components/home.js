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
            item11: '',
            item12: '',
            item13: '',
            item14: '',
            item15: '',
            item16: '',
            item17: '',
            item18: '',
    
            item21: '',
            item22: '',
            item23: '',
            item24: '',
            item25: '',
            item26: '',
            item27: '',
            item28: '',
    
            item31: '',
            item32: '',
            item33: '',
            item34: '',
            item35: '',
            item36: '',
            item37: '',
            item38: '',
    
            item41: '',
            item42: '',
            item43: '',
            item44: '',
            item45: '',
            item46: '',
            item47: '',
            item48: '',
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
        // console.log('==========')
        // console.log(items)
        this.setState({
            items
        })

        data.forEach(element => {
            if ('11' == element.location) {
                this.setState({
                    item11: element
                })
            } else if ('12' == element.location) {
                this.setState({
                    item12: element
                })
            } else if ('13' == element.location) {
                this.setState({
                    item13: element
                })
            } else if ('14' == element.location) {
                this.setState({
                    item14: element
                })
            } else if ('15' == element.location) {
                this.setState({
                    item15: element
                })
            } else if ('16' == element.location) {
                this.setState({
                    item16: element
                })
            } else if ('17' == element.location) {
                this.setState({
                    item17: element
                })
            } else if ('18' == element.location) {
                this.setState({
                    item18: element
                })
            }
        })
    }

    componentWillMount(){
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
        const { item11, item12, item13, item14, item15, item16, item17, item18,
                item21, item22, item23, item24, item25, item26, item27, item28,
                item31, item32, item33, item34, item35, item36, item37, item38,
                item41, item42, item43, item44, item45, item46, item47, item48, items, selectedItem, selectedItemBackgroudColor } = this.state;
        return (
            <div className="btn-margin">
                <div className="monitor-frame">
                    <div className="chess-container">
                        <Row>
                            <Col span={3}>
                                <Button shape="circle" type='primary'
                                    onClick={this.onSelect.bind(this,item11)}>
                                    {item11.state == 'DISPLAY' ? item11.name : ''}
                                </Button>
                            </Col>
                            <Col span={3}>
                                <Button shape="circle">
                                {item12.state == 'DISPLAY' ? item12.name : ''}
                                </Button>
                            </Col>
                            <Col span={3}>
                                <Button shape="circle">
                                    {item13.state == 'DISPLAY' ? item13.name : ''}
                                </Button>
                            </Col>
                            <Col span={3}>
                                <Button shape="circle">
                                    {item14.state == 'DISPLAY' ? item14.name : ''}
                                </Button>
                            </Col>
                            <Col span={3}>
                                <Button shape="circle">
                                    {item15.state == 'DISPLAY' ? item15.name : ''}
                                </Button>
                            </Col>
                            <Col span={3}>
                                <Button shape="circle">
                                    {item16.state == 'DISPLAY' ? item16.name : ''}
                                </Button>
                            </Col>
                            <Col span={3}>
                                <Button shape="circle">
                                    {item17.state == 'DISPLAY' ? item17.name : ''}
                                </Button>
                            </Col>
                            <Col span={3}>
                                <Button shape="circle">
                                    {item18.state == 'DISPLAY' ? item18.name : ''}
                                </Button>
                            </Col>
                        </Row>
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