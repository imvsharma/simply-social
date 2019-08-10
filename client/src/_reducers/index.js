import { combineReducers } from "redux";
import { authentication } from "./auth.reducers";

const rootReducer = combineReducers({
    authentication
})

export default rootReducer;