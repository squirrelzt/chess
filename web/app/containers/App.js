import React, { Component } from 'react'
import {  Menu, Icon, Row, Col, Button } from 'antd';
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
  render() {
    const context = this.props.children;
    return (
        <div className="layout-aside" >
      <div className="layout-main" >
        <div className="header">
          <div className="title">棋牌游戏</div>
          <div className="logout">
              <span>当前用户: {localStorage.getItem('username')}</span>
              <Button type="primary" size="small" className="logout-btn" onClick={this.logout}><Icon type="logout"/>退出系统</Button>
          </div>
        </div>

        <div className="layout-container">
          <div className="layout-content">
          	{context}
          </div>
        </div>
      </div>
    </div>
    )
  }
};
