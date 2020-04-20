import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {  Menu, Icon, Row, Col, Button, Modal, message } from 'antd';
import Home from '../component/Home';
import './../component/css/login.less';
import './../component/css/home.less';

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
              <Button type="primary" size="small" className="logout-btn" onClick={this.logout.bind(this)}><Icon type="logout"/>退出系统</Button>
          </div>
        </div>
        <div className="layout-container">
          <div className="layout-content">
          <Route path="/chess" breadcrumbName="FTP 监控"  component={Home} ></Route>
          	{context}
          </div>
        </div>
      </div>
    </div>
    )
  }
};
