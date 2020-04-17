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

// const dataSource = [
//     {
//       key: '1',
//       name: '胡彦斌',
//       age: 32,
//       address: '西湖区湖底公园1号',
//     },
//     {
//       key: '2',
//       name: '胡彦祖',
//       age: 42,
//       address: '西湖区湖底公园1号',
//     },
//   ];
  
//   const columns = [
//     {
//       title: '姓名',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: '年龄',
//       dataIndex: 'age',
//       key: 'age',
//     },
//     {
//       title: '住址',
//       dataIndex: 'address',
//       key: 'address',
//     },
//   ];
  
export default class Home extends Component {
    state={
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

    fetch(params = {}) {
        this.setState({ loading: true });
        auth.fetch('/query','get',params,(result)=>{
            console.log("------------------");
            console.log(result);
            this.setState({
                data: result
            })
    });
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
    render() {
        const { item11 } = this.state;
        return (
            <div className="btn-margin">
                <div className="monitor-frame">
                    <div className="chess-container">
                        <Row>
                            <Col span={3}>
                                <Button shape="circle">
                                    {item11.state == 'DISPLAY' ? item11.name : ''}
                                </Button>
                            </Col>
                            <Col span={3}>
                                <Button shape="circle">
                                    士
                                </Button>
                            </Col>
                            <Col span={3}>
                                <Button shape="circle">
                                    士
                                </Button>
                            </Col>
                            <Col span={3}>
                                <Button shape="circle">
                                    相
                                </Button>
                            </Col>
                            <Col span={3}>
                                <Button shape="circle">
                                    相
                                </Button>
                            </Col>
                            <Col span={3}>
                                <Button shape="circle">
                                    马
                                </Button>
                            </Col>
                            <Col span={3}>
                                <Button shape="circle">
                                    马
                                </Button>
                            </Col>
                            <Col span={3}>
                                <Button shape="circle">
                                    车
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}