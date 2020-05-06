import { 
    CLEAR_SELECTED_AND_SELECTED_OPPONENT,
    INIT_DATA, 
    HANDLE_RESET, 
    LOCK_FRAME, 
    SELECT_ITEM, 
    OPERATE_MODAL_VISIBLE, 
    REVERSE_CHESS,
    SET_SEMAPHORE,
} from './../store/actionType'


const defaultState = {
    items: [['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','','']],
    selectedItem: '',
    selectedOpponentItem: '',
    selectedItemBackgroudColor: '#6387ea',
    data: [],
    started: false,
    semaphore: 1,
    role: 'CONSUMER',
    modalVisible: false
};

export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case CLEAR_SELECTED_AND_SELECTED_OPPONENT :
            newState.selectedItem = action.value.selectedItem;
            newState.selectedOpponentItem = action.value.selectedOpponentItem;
            return newState;
        case INIT_DATA :
            newState.items = action.value;
            return newState;
        case HANDLE_RESET :
            localStorage.setItem('role', action.value.localStorageSetItemRole);
            localStorage.setItem('state', action.value.localStorageSetItemState);
            localStorage.setItem('color', action.value.localStorageSetItemColor);
            newState.selectedItem = action.value.selectedItem;
            newState.role = action.value.role;
            newState.semaphore = action.value.semaphore;
            return newState;
        case LOCK_FRAME :
            newState.semaphore = action.value.semaphore;
            newState.role = action.value.role;
            return newState;
        case SELECT_ITEM :
            newState.selectedItem = action.value;
            return newState;
        case OPERATE_MODAL_VISIBLE :
            newState.modalVisible = action.value;
            return newState;
        case REVERSE_CHESS : 
            newState.items = action.value.items;
            newState.semaphore = action.value.semaphore;
            return newState;
        case SET_SEMAPHORE : 
            newState.semaphore = action.value;
            return newState;
        default :
            break;
    }
    return state;
}