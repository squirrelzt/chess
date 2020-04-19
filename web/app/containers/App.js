import React, { Component } from 'react'
import {  Menu, Icon, Row, Col, Button, Modal, message } from 'antd';
import auth from '../common/auth';

export default class App extends Component {
  constructor(props) {
    super(props)
  }


  componentDidMount(){}

  logout() {
    localStorage.clear();
    window.location.href="/login";
  }
  handleCancel() {
    message.success('和局')
  }
  handleRest() {
    auth.fetch('/initData','get','',(result)=>{
        if (result && result.result == 0) {
          message.success('重开成功')
        } else {
          message.error('重开失败');
        }
    });
  }
  render() {
    const context = this.props.children;
    return (
        <div className="layout-aside" >
      <div className="layout-main" >
        <div className="header">
          <div className="title">棋牌游戏</div>
          <div className="logout">
              <span>当前用户: {localStorage.getItem('username')}</span>
              <Button type="primary" size="small" className="logout-btn" onClick={this.logout.bind(this)}><Icon type="logout"/>退出系统</Button>
          </div>
        </div>

        <div className="layout-container">
          <div className="layout-content">
            <div className="layout-operation">
                <Button type="primary" size="large" onClick={this.handleRest.bind(this)}>重开</Button>
                <Button type="primary" onClick={this.handleCancel.bind(this)}>结束</Button>
            </div>
          	{context}
          </div>
        </div>
      </div>
    </div>
    )
  }
};
