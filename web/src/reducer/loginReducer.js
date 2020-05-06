import { 
    HANDLE_INPUT_USERNAME, 
    HANDLE_INPUT_PASSWORD, 
    RESET_USERNAME_PASSWORD, 
} from './actionType'


const defaultState = {
    username: '',
    password: ''
};

export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case HANDLE_INPUT_USERNAME :
            newState.username = action.value;
            return newState;
        case HANDLE_INPUT_PASSWORD :
            newState.password = action.value;
            return newState;
        case RESET_USERNAME_PASSWORD :
            newState.username = action.value.username;
            newState.password = action.value.password;
            return newState;
        default :
            break;
    }
    return state;
}