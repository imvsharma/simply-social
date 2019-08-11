import { combineReducers } from "redux";
import { authentication } from "./auth.reducers";
import { registration } from "./user.registration.reducers";

const rootReducer = combineReducers({
    authentication,
    registration
})

export default rootReducer;