import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'
import '../common/lib';
import App from '../containers/App';
import Home from '../components/home';

ReactDOM.render((
  <Router  history={browserHistory}>
    <Route path="/" breadcrumbName="主页"  component={App} >
    <Route path="/chess" breadcrumbName="FTP 监控"  component={Home} ></Route>
    </Route>

  </Router>
), document.getElementById('react-content'))
