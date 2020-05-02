import { 
    HANDLE_INPUT_USERNAME, 
    HANDLE_INPUT_PASSWORD, 
    RESET_USERNAME_PASSWORD, 
    INIT_DATA, 
    HANDLE_RESET, 
    LOCK_FRAME, 
    SELECT_ITEM, 
    OPERATE_MODAL_VISIBLE, 
    REVERSE_CHESS 
} from './actionType'

export const getHandleInputUsernameAction = (value) => ({
    type: HANDLE_INPUT_USERNAME,
    value
});

export const getHandleInputPasswordAction = (value) => ({
    type: HANDLE_INPUT_PASSWORD,
    value
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

export const getReverseChess = (items, semaphore) => ({
    type: REVERSE_CHESS,
    value: {
        items,
        semaphore
    }
});