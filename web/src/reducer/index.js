import { combineReducers } from "redux";
import loginReducer from './loginReducer';
import homeReducer from './homeReducer';

export default combineReducers({
    login: loginReducer,
    home: homeReducer
});