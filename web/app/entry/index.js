import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'
import '../common/lib';
import App from '../containers/App';
import Login from '../components/Login';
import Home from '../components/Home';

ReactDOM.render((
  <Router  history={browserHistory}>
    <Route path="/login" breadcrumbName="登录"  component={Login} ></Route>
    <Route path="/" breadcrumbName="主页"  component={App} >
      <Route path="/chess" breadcrumbName="FTP 监控"  component={Home} ></Route>
    </Route>
  </Router>
), document.getElementById('react-content'))
