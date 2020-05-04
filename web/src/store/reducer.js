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


const defaultState = {
    username: '',
    password: '',
    items: [['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','','']],
    selectedItem: '',
    selectedOpponentItem: '',
    selectedItemBackgroudColor: '#6387ea',
    data: [],
    started: false,
    semaphore: 1,
    role: 'CONSUMER'
};

export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    if (action.type === HANDLE_INPUT_USERNAME) {
        newState.username = action.value;
    } else if (action.type === HANDLE_INPUT_PASSWORD) {
        newState.password = action.value;
    } else if (action.type === CLEAR_SELECTED_AND_SELECTED_OPPONENT) {
        newState.selectedItem = action.value.selectedItem;
        newState.selectedOpponentItem = action.value.selectedOpponentItem;
    } else if (action.type === RESET_USERNAME_PASSWORD) {
        newState.username = action.value.username;
        newState.password = action.value.password;
    } else if (action.type === INIT_DATA) {
        newState.items = action.value;
    }else if (action.type === HANDLE_RESET) {
        localStorage.setItem('role', action.value.localStorageSetItemRole);
        localStorage.setItem('state', action.value.localStorageSetItemState);
        localStorage.setItem('color', action.value.localStorageSetItemColor);
        newState.selectedItem = action.value.selectedItem;
        newState.role = action.value.role;
        newState.semaphore = action.value.semaphore;
    } else if (action.type === LOCK_FRAME) {
        newState.semaphore = action.value.semaphore;
        newState.role = action.value.role;
    } else if (action.type === SELECT_ITEM) {
        newState.selectedItem = action.value;
    } else if (action.type === OPERATE_MODAL_VISIBLE) {
        newState.modalVisible = action.value;
    } else if (action.type === REVERSE_CHESS) {
        newState.items = action.value.items;
        newState.semaphore = action.value.semaphore;
    } else if (action.type === SET_SEMAPHORE) {
        newState.semaphore = action.value;
    }
    return newState;
}