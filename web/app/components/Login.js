import React, { Component } from 'react';
import {  Form, Icon, Button, message, Input } from 'antd';
import auth from '../common/auth';
import '../css/login.css'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    componentDidMount() {

    }

    handleInputUsername(e) {
        const username = e.target.value;
        this.setState({
            username
        });
    }
    handleInputPassword(e) {
        const password = e.target.value;
        this.setState({
            password
        });
    }
    handleSubmit(e) {
        this.fetch({
            username: this.state.username,
            password: this.state.password
        })
    }
    fetch(params = {}) {
        auth.fetch('/login','get',params,(result)=>{
            if (result.result == 0) {
                result.data.id ? localStorage.setItem('id', result.data.id):'';
                result.data.username ? localStorage.setItem('username', result.data.username):'';
                result.data.state ? localStorage.setItem('state', result.data.state):'';
                result.data.role ? localStorage.setItem('role', result.data.role):'';
                result.data.opponentId ? localStorage.setItem('opponentId', result.data.opponentId):"";
                result.data.color ? localStorage.setItem('color', result.data.color):"";
                window.location.href="/chess";
            } else if (result.result == 1) {
                this.setState({
                    username: '',
                    password: ''
                });
                message.error('用户名或密码错误！');
            }
        });
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 6 },
        };
        return (
            <div>
                <div className='login-container'>
                    <div className="login-title">
                        <span className="sysName">棋盘游戏登录</span>
                    </div>
                    <Form className='loginForm' >
                        <Form.Item {...formItemLayout}
                            label='用户名'>
                            <Input onChange={this.handleInputUsername.bind(this)} value={this.state.username}/>
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="密&nbsp;&nbsp;&nbsp;&nbsp;码："
                            hasFeedback>
                            
                            <Input type="password" autoComplete="off" placeholder="请输入密码"
                                onContextMenu={false} onPaste={false} onCopy={false} onCut={false}
                                onChange={this.handleInputPassword.bind(this)}
                                value={this.state.password}/>
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 12, offset: 7 }}>
                            <Button type="primary" className="loginBtn" style={{width:228}} onClick={this.handleSubmit.bind(this)}>登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}