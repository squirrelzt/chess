import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { message } from 'antd';
import { auth } from '../common/auth';
import { SAGA_LOGIN } from './actionType';
import {
  getResetUsernamePasswordAction
} from './actionCreators';



function* login(action) {
  const { username, password } = action.payload;
  try {
    const response = yield axios.post(auth.getPath() + '/logins', { username,password });
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
        const action = getResetUsernamePasswordAction('', '');
        yield put(action);
        // store.dispatch(action);
        message.error('用户名或密码错误！');
    }
  } catch(e) {
    console.log(e);
    message.error('登录失败！');
  }
  
}

function* rootagas() {
    yield takeEvery(SAGA_LOGIN, login)
};

export default rootagas;