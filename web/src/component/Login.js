import React, { Component, Fragment } from 'react';
import {  Form, Icon, Button, message, Input } from 'antd';
import axios from 'axios';
import { auth } from '../common/auth';
import './css/login.less';
import store from './../store/index';
import { connect } from 'react-redux';
import { 
    getHandleInputUsernameAction, 
    getHandleInputPasswordAction, 
    getResetUsernamePasswordAction,
    loginAction,
    sagaLoginAction,
    REACT_REDUX_LOGIN,
 } from './../store/actionCreators';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        store.subscribe(this.handleStoreChange)
    }

    componentDidMount = () => {

    }

    handleStoreChange = () => {
        this.setState(store.getState())
    }

    handleInputUsername = (e) => {
        const action = getHandleInputUsernameAction(e.target.value);
        store.dispatch(action);
    }
    handleInputPassword = (e) => {
        const action = getHandleInputPasswordAction(e.target.value);
        store.dispatch(action);
    }
    handleSubmit = (e) => {
        // const action = loginAction(this.state.username, this.state.password);
        // store.dispatch(action);
        // const action = sagaLoginAction(this.state.username, this.state.password);
        // store.dispatch(action);
        this.props.handleSubmit(this.state.username, this.state.password)
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 6 },
        };
        const { username, password, handleInputUsername, handleInputPassword, handleSubmit } = this.props;
        return (
            <Fragment>
                <div className='login-container'>
                    <div className="login-title">
                        <span className="sysName">棋盘游戏登录</span>
                    </div>
                    <Form className='loginForm' >
                        <Form.Item {...formItemLayout}
                            label='用户名' htmlFor='login-username'>
                            <Input id='login-username' onChange={handleInputUsername} value={username}/>
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="密&nbsp;&nbsp;码："
                            htmlFor='login-password'
                            hasFeedback>
                            <Input id='login-password' type="password" autoComplete="off" placeholder="请输入密码"
                                onChange={handleInputPassword}
                                value={password}/>
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

const mapStateToProps = (state) => {
    return {
        username: state.username,
        password: state.password
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleInputUsername(e) {
            const action = getHandleInputUsernameAction(e.target.value);
            dispatch(action);
        },

        handleInputPassword(e) {
            const action = getHandleInputPasswordAction(e.target.value);
            dispatch(action);
        },

        handleSubmit(username, password){
            const action = sagaLoginAction(username, password);
            dispatch(action);
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)