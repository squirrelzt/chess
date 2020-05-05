import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { message } from 'antd';
import { auth } from '../common/auth';
import { SAGA_LOGIN } from './actionType';
import { loginSagas } from './../effects/login/loginSagas';
import { homeSagas } from './../effects/home/homeSagas';
import {
  getResetUsernamePasswordAction
} from './actionCreators';


function* rootagas() {
    // yield takeEvery(SAGA_LOGIN, login)
    yield all([
      loginSagas(),
      homeSagas()
    ]);
};

export default rootagas;