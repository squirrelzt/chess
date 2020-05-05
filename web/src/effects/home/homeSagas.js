import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { message } from 'antd';
import { auth } from '../../common/auth';
import { 
    SAGA_INIT_DATA,
    SAGA_FETCH_CHESSER_BY_ID,
    SAGA_OPERATION,
    SAGA_REVERSE_CHESS,
    SAGA_FIRST_REVERSE_CHESS,
    SAGA_RESET
 } from './../../store/actionType';
import {
    getInitDataAction,
    getLockFrameAction,
    getSelectItemAction,
    getSetSemaphoreAction,
    getHandleResetAction
} from './../../store/actionCreators';

function* initData(action) {
    try {
        const response = yield axios.get(auth.getPath() + '/query');
        const result = response.data;
        const items = [['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','','']];
        if (result) {
            result.forEach(element => {
                items[element.x-1][element.y-1] = element;
            });
          
            const action = getInitDataAction(items);
            yield put(action);
        }

    } catch(e) {
      console.log(e);
      message.error('查询棋子失败');
    }
}

function* fetchChesserById(action) {
    const { id } = action.payload;
    try {
        const response = yield axios.get(auth.getPath() + '/queryPersonById', { params: { id: id } });
        const role = response.data.role;
        const state = response.data.state;
        const color = response.data.color;
        role?localStorage.setItem('role', role):'';
        state?localStorage.setItem('state', state):'';
        color?localStorage.setItem('color', color):'';
        if (state && role) {
            let semaphore = 0;
            if (state == 'ACTIVE' && role == 'CONSUMER') {
                semaphore = 1;
            } else if (state == 'ACTIVE' && role == 'PRODUCER') {
                semaphore = 0;
            } else if (state == 'LOCK' && role == 'CONSUMER') {
                semaphore = 0;
            } else if (state == 'LOCK' && role == 'PRODUCER') {
                semaphore = 1;
            }
            const action = getLockFrameAction(semaphore, role);
            yield put(action);
            // dispatch(action);
        }
    } catch(e) {
        console.log(e);
        message.error('根据id查询用户信息失败');
    }
}

function* operation(action) {
    const { chessId, opponentChessId, personId, opponentId, personState } = action.payload;
    try {
        const response = yield axios.get(auth.getPath() + '/operate', { params: {
            chessId,
            opponentChessId,
            personId,
            opponentId,
            personState
        } });
        const result = response.data;
        if (result && result.result == 0) {
            if (result.victory) {
                const modalVisibleAction = getOperateModalVisibleAction(true);
                dispatch(modalVisibleAction);
            }
            const action = getSelectItemAction('');
            yield put(action);
            // dispatch(action);
        } else if (result && result.result == 1) {
            message.error(result.msg);
        }
    } catch(e) {
        console.log(e);
        message.error('操作失败');
    }
}

function* reverseChess(action) {
    const { personId, opponentId, personState, chessId } = action.payload;
    try {
        const response = axios.get(auth.getPath() + '/reverseChess', { params : {
            personId,
            opponentId,
            personState,
            chessId
        } });
        const result = response.data;
        if (result && result.result == 1) {
            const state = localStorage.getItem('state');
            let semaphore = this.state.semaphore
            if ("PRODUCER" == state) {
                semaphore += 1;
            } else if ('CONSUMER' == state) {
                semaphore -= 1;
            }
            const action = getSetSemaphoreAction(semaphore);
            yield put(action);
            // dispatch(action);
        }
    } catch(e) {
        console.log(e);
        message.error('翻子操作失败');
    }
}

function* firstReverseChess(action) {
    const { chessId, personId, opponentId, color } = action.payload;
    try {
        const response = yield axios.get(auth.getPath() + '/firstReverseChess', { params : {
            chessId,
            personId,
            opponentId,
            color
        } });
        const result = response.data;
        if (result && result.result == 0) {
            try {
                const res = yield axios.get(auth.getPath() + '/queryPersonById', { params: {
                    id: personId 
                    }
                });
                if (res.data) {
                    localStorage.setItem('color', res.data.color);
                    localStorage.setItem('state', res.data.state);
                }
            } catch(ex) {
                console.log(ex);
                console.log('根据id查询用户信息失败')
            }
        }
    } catch(e) {
        console.log(error);
        message.error('第一次翻子操作失败');
    }
}

function* reset() {
    try {
        const response = yield axios.get(auth.getPath() + '/initData');
        const result = response.data;
        if (result && result.result == 0) {
            message.success('重开成功');
            const action = getHandleResetAction('', '', '', '', 'CONSUMER', 1);
            yield put(action)
            // dispatch(action);
        } else {
            message.error('重开失败');
        }
    } catch(e) {
        console.log(e);
        message.error('重开操作失败');
    }
}

function* watchInitData() {
    yield takeEvery(SAGA_INIT_DATA, initData);
}

function* watchFetchChesserById() {
    yield takeEvery(SAGA_FETCH_CHESSER_BY_ID, fetchChesserById);
}

function* watchOperation() {
    yield takeEvery(SAGA_OPERATION, operation)
}

function* watchReverseChess() {
    yield takeEvery(SAGA_REVERSE_CHESS, reverseChess);
}

function* watchFirstReverseChess() {
    yield takeEvery(SAGA_FIRST_REVERSE_CHESS, firstReverseChess);
}

function* watchReset() {
    yield takeEvery(SAGA_RESET, reset);
}

export function* homeSagas() {
    // yield takeEvery(SAGA_INIT_DATA, initData)
    yield all([
        watchInitData(), 
        watchFetchChesserById(),
        watchOperation(),
        watchReverseChess(),
        watchFirstReverseChess(),
        watchReset()
    ])
}