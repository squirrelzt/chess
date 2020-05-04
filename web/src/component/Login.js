import React, { Component, Fragment } from 'react';
import {  Form, Icon, Button, message, Input } from 'antd';
import axios from 'axios';
import { auth } from '../common/auth';
import './css/login.less';
import store from './../store/index';
// import { HANDLE_INPUT_USERNAME, HANDLE_INPUT_PASSWORD, RESET_USERNAME_PASSWORD } from './../store/actionType';
import { getHandleInputUsernameAction, getHandleInputPasswordAction, getResetUsernamePasswordAction } from './../store/actionCreators';

class Login extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     username: '',
        //     password: ''
        // }
        this.state = store.getState();
        store.subscribe(this.handleStoreChange)
    }

    componentDidMount = () => {

    }

    handleStoreChange = () => {
        this.setState(store.getState())
    }

    handleInputUsername = (e) => {
        // const username = e.target.value;
        // this.setState({
        //     username
        // });
        // const action = {
        //     type: HANDLE_INPUT_USERNAME,
        //     value: e.target.value
        // }
        const action = getHandleInputUsernameAction(e.target.value);
        store.dispatch(action);
    }
    handleInputPassword = (e) => {
        // const password = e.target.value;
        // this.setState({
        //     password
        // });
        // const action = {
        //     type: HANDLE_INPUT_PASSWORD,
        //     value: e.target.value
        // }
        const action = getHandleInputPasswordAction(e.target.value);
        store.dispatch(action);
    }
    handleSubmit = (e) => {
        this.fetch({
            username: this.state.username,
            password: this.state.password
        })
    }
    fetch = (params = {}) => {
        axios.post(auth.getPath() + '/logins', params)
        .then((response) => {
            const result = response.data;
            if (result.result == 0) {
                result.data.id ? localStorage.setItem('id', result.data.id):'';
                result.data.username ? localStorage.setItem('username', result.data.username):'';
                if (result.data.state) {
                    localStorage.setItem('state', result.data.state);
                }
                result.data.state ? localStorage.setItem('state', result.data.state):'';
                result.data.role ? localStorage.setItem('role', result.data.role):'';
                result.data.opponentId ? localStorage.setItem('opponentId', result.data.opponentId):"";
                result.data.color ? localStorage.setItem('color', result.data.color):"";
                window.location.href="./chess";
            } else if (result.result == 1) {
                // this.setState({
                //     username: '',
                //     password: ''
                // });
                // const action = {
                //     type: RESET_USERNAME_PASSWORD,
                //     value: {
                //         username: '',
                //         password: '',
                //     }
                // }
                const action = getResetUsernamePasswordAction('', '');
                store.dispatch(action);
                message.error('用户名或密码错误！');
            }
        })
        .catch((error) => {
            console.log(error);
            const action = getResetUsernamePasswordAction('', '');
            store.dispatch(action);
            message.error('用户名或密码错误！');
        })
        .then(() => {
            
        })
        // auth.fetch('/logins','get',params,(result)=>{
        //     if (result.result == 0) {
        //         result.data.id ? localStorage.setItem('id', result.data.id):'';
        //         result.data.username ? localStorage.setItem('username', result.data.username):'';
        //         result.data.state ? localStorage.setItem('state', result.data.state):'';
        //         result.data.role ? localStorage.setItem('role', result.data.role):'';
        //         result.data.opponentId ? localStorage.setItem('opponentId', result.data.opponentId):"";
        //         result.data.color ? localStorage.setItem('color', result.data.color):"";
        //         window.location.href="./chess";
        //     } else if (result.result == 1) {
        //         // this.setState({
        //         //     username: '',
        //         //     password: ''
        //         // });
        //         // const action = {
        //         //     type: RESET_USERNAME_PASSWORD,
        //         //     value: {
        //         //         username: '',
        //         //         password: '',
        //         //     }
        //         // }
        //         const action = getResetUsernamePasswordAction('', '');
        //         store.dispatch(action);
        //         message.error('用户名或密码错误！');
        //     }
        // });
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 6 },
        };
        return (
            <Fragment>
                <div className='login-container'>
                    <div className="login-title">
                        <span className="sysName">棋盘游戏登录</span>
                    </div>
                    <Form className='loginForm' >
                        <Form.Item {...formItemLayout}
                            label='用户名' htmlFor='login-username'>
                            <Input id='login-username' onChange={this.handleInputUsername} value={this.state.username}/>
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="密&nbsp;&nbsp;码："
                            htmlFor='login-password'
                            hasFeedback>
                            <Input id='login-password' type="password" autoComplete="off" placeholder="请输入密码"
                                onChange={this.handleInputPassword}
                                value={this.state.password}/>
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 12, offset: 7 }}>
                            <Button type="primary" className="loginBtn" style={{width:228}} onClick={this.handleSubmit}>登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Fragment>
        )
    }
}

export default Login