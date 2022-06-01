import { combineReducers } from "redux";
import postReducer from "./post"
import notifyReducer from "./notifyReducer"
import socketReducer from "./socketReducer"

const rootReducer = combineReducers({
    posts:postReducer,
    notify:notifyReducer,
    socket:socketReducer

})

export default rootReducer