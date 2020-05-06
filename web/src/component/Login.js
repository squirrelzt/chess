import React, { Component, Fragment } from 'react';
import {  Form, Icon, Button, message, Input } from 'antd';
import './css/login.less';
import { connect } from 'react-redux';
import { 
    getHandleInputUsernameAction, 
    getHandleInputPasswordAction, 
    sagaLoginAction,
 } from './../store/actionCreators';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {

    }

    handleSubmit = (e) => {
        this.props.handleSubmit(this.props.username, this.props.password)
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