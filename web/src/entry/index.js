import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import store from './../store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../containers/App';
import Login from '../component/Login';
import './css/index.css';

function component() {
  var element = document.createElement('pre');
  element.innerHTML = '<div id="root"></div>';
  return element;
}

let element = component(); 
document.body.appendChild(element);

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store = { store }>
        <Router>
            <div>
              <Switch>
                <Route path="/login" breadcrumbName="登录"  component={Login} ></Route>
                <Route path="/" breadcrumbName="主页"  component={App} ></Route>
              </Switch>
            </div>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<Index/>,document.getElementById('root'));