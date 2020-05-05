import axios from 'axios';
import { auth } from '../common/auth';
import { message, Modal } from 'antd';
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

    SAGA_LOGIN,
    SAGA_INIT_DATA,
    SAGA_FETCH_CHESSER_BY_ID,
    SAGA_OPERATION,
    SAGA_REVERSE_CHESS,
    SAGA_FIRST_REVERSE_CHESS,
    SAGA_RESET
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

export const sagaLoginAction = (username, password) => ({
    type: SAGA_LOGIN,
    payload: {
        username,
        password
    }
})

export const sagaInitDataAction = () => ({
    type: SAGA_INIT_DATA,
});

export const sagaFetchChesserByIdAction = (id) => ({
    type: SAGA_FETCH_CHESSER_BY_ID,
    payload: {
        id
    }
});

export const sagaOperationAciton = (chessId, opponentChessId, personId, opponentId, personState) => ({
    type: SAGA_OPERATION,
    payload: {
        chessId,
        opponentChessId,
        personId,
        opponentId,
        personState
    }
});

export const sagaReverseChessAction = (personId, opponentId, personState, chessId) => ({
    type: SAGA_REVERSE_CHESS,
    payload: {
        personId,
        opponentId,
        personState,
        chessId
    }
});

export const sagaFirstReverseChessAction = (chessId, personId, opponentId, color) => ({
    type: SAGA_FIRST_REVERSE_CHESS,
    payload: {
        chessId,
        personId,
        opponentId,
        color
    }
});

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

export const sagaResetAction = () => ({
    type: SAGA_RESET
});