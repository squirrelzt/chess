import store from ".";

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
    if (action.type === 'handle_input_username') {
        newState.username = action.value;
    } else if (action.type === 'handle_input_password') {
        newState.password = action.value;
    } else if (action.type === 'init_data') {
        newState.items = action.value;
    }else if (action.type === 'handle_reset') {
        localStorage.setItem('role', action.value.localStorageSetItemRole);
        localStorage.setItem('state', action.value.localStorageSetItemState);
        localStorage.setItem('color', action.value.localStorageSetItemColor);
        newState.selectedItem = action.value.selectedItem;
        newState.role = action.value.role;
        newState.semaphore = action.value.semaphore;
    } else if (action.type === 'lock_frame') {
        newState.semaphore = action.value.semaphore;
        newState.role = action.value.role;
    } else if (action.type === 'select_item') {
        newState.selectedItem = action.value;
    } else if (action.type === 'operate_modal_visible') {
        newState.modalVisible = action.value;
    } else if (action.type === 'reverse_chess') {
        newState.items = action.value.items;
        newState.semaphore = action.value.semaphore;
    }
    return newState;
}