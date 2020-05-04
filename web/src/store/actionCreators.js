import axios from 'axios';
import { auth } from '../common/auth';
import { Icon, Row, Col, Button, message, Modal } from 'antd';
import { 
    HANDLE_INPUT_USERNAME, 
    HANDLE_INPUT_PASSWORD, 
    CLEAR_SELECTED_AND_SELECTED_OPPONENT,
    RESET_USERNAME_PASSWORD, 
    INIT_DATA, 
    HANDLE_RESET, 
    LOCK_FRAME, 
    SELECT_ITEM, 
    OPERATE_MODAL_VISIBLE, 
    REVERSE_CHESS,
} from './actionType'

export const getHandleInputUsernameAction = (value) => ({
    type: HANDLE_INPUT_USERNAME,
    value
});

export const getHandleInputPasswordAction = (value) => ({
    type: HANDLE_INPUT_PASSWORD,
    value
});

export const getClearSelectedAndSelectedOpponentAction = (selectedItem, selectedOpponentItem) => ({
    type: CLEAR_SELECTED_AND_SELECTED_OPPONENT,
    value: {
        selectedItem,
        selectedOpponentItem
    }
});

export const getResetUsernamePasswordAction = (username, password) => ({
    type: RESET_USERNAME_PASSWORD,
    value: {
        username,
        password
    }
});

export const getInitDataAction = (value) => ({
    type: INIT_DATA,
    value
});

export const getHandleResetAction = (localStorageSetItemRole, localStorageSetItemState, localStorageSetItemColor, selectedItem, role, semaphore) => ({
    type: HANDLE_RESET,
    value: {
        localStorageSetItemRole,
        localStorageSetItemState,
        localStorageSetItemColor,
        selectedItem,
        role,
        semaphore
    }
});

export const getLockFrameAction = (semaphore, role) => ({
    type: LOCK_FRAME,
    value: {
        semaphore,
        role
    }
});

export const getSelectItemAction = (value) => ({
    type: SELECT_ITEM,
    value
});

export const getOperateModalVisibleAction = (value) => ({
    type: OPERATE_MODAL_VISIBLE,
    value
});

export const getReverseChessAction = (items, semaphore) => ({
    type: REVERSE_CHESS,
    value: {
        items,
        semaphore
    }
});

export const getSetSemaphoreAction = (value) => ({
    type: SET_SEMAPHORE,
    value
});

export const loginAction = (username, password) => {
    return (dispatch) => {
        axios.post(auth.getPath() + '/logins', {
            username,
            password
        })
        .then((response) => {
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
                dispatch(action);
                message.error('用户名或密码错误！');
            }
        })
        .catch((error) => {
            console.log(error);
            const action = getResetUsernamePasswordAction('', '');
            dispatch(action);
            message.error('用户名或密码错误！');
        })
        .then(() => {
            
        })
    }
}

export const initDataAction = () => {
    return (dispatch) => {
        axios.get(auth.getPath() + '/query')
        .then((response) => {
            const items = [['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','','']];
            if (response.data) {
                response.data.forEach(element => {
                    items[element.x-1][element.y-1] = element;
                });
              
                const action = getInitDataAction(items);
                dispatch(action);
            }
        })
        .catch((error) => {
            console.log(error);
            message.error('查询棋子失败');
        })
        .then(() => {

        });
    }
}

export const fetchChesserByIdAction = (params) => {
    return (dispatch) => {
        axios.get(auth.getPath() + '/queryPersonById', { params })
        .then((response) => {
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
                dispatch(action);
            }
        })
        .catch((error) => {
            console.log(error);
            message.error('根据id查询用户信息失败');
        })
        .then(() => {

        });
    }
}

export const operationAciton = (params) => {
    return (dispatch) => {
        axios.get(auth.getPath() + '/operate', { params })
        .then((response) => {
            const result = response.data;
            if (result && result.result == 0) {
                if (result.victory) {
                    const modalVisibleAction = getOperateModalVisibleAction(true);
                    dispatch(modalVisibleAction);
                }
                const action = getSelectItemAction('');
                dispatch(action);
            } else if (result && result.result == 1) {
                message.error(result.msg);
            }
        })
        .catch((error) => {
            console.log(error);
            message.error('操作失败');
        })
        .then(() => {

        });
    }
}

export const reverseChessAction = (params) => {
    return (dispatch) => {
        axios.get(auth.getPath() + '/reverseChess', { params })
        .then((response) => {
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
                dispatch(action);
            }
        })
        .catch((error) => {
            console.log(error);
            message.error('翻子操作失败');
        })
        .then(() => {

        });
    }
}

export const firstReverseChessAction = (params) => {
    return (dispatch) => {
        axios.get(auth.getPath() + '/firstReverseChess', { params })
        .then((response) => {
            const result = response.data;
            if (result && result.result == 0) {
                axios.get(auth.getPath() + '/queryPersonById', { params: {
                    id: params.personId 
                    }
                })
                .then((res) => {
                    if (res.data) {
                        localStorage.setItem('color', res.data.color);
                        localStorage.setItem('state', res.data.state);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    console.log('根据id查询用户信息失败')
                })
                .then(() => {

                })
            }
        })
        .catch((error) => {
            console.log(error);
            message.error('第一次翻子操作失败');
        })
        .then(() => {

        });
    }
}

export const resetAction = () => {
    return (dispatch) => {
        axios.get(auth.getPath() + '/initData')
        .then((response) => {
            const result = response.data;
            if (result && result.result == 0) {
                message.success('重开成功');
                const action = getHandleResetAction('', '', '', '', 'CONSUMER', 1);
                dispatch(action);
            } else {
                message.error('重开失败');
            }
        })
        .catch((error) => {
            console.log(error);
            message.error('重开操作失败');
        })
        .then(() => {

        });
    }
}
