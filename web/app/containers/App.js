import React, { Component } from 'react'
import {  Menu, Breadcrumb, Icon, Row, Col, Button, message, Table } from 'antd';
import { Link } from 'react-router'
import auth from '../common/auth';
const SubMenu = Menu.SubMenu;

export default class App extends Component {
  // contextTypes: {
  //   // router: React.PropTypes.object.isRequired
  // }
  state={
        data: []
  }


  componentWillMount(){
    // this.fetch();
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
