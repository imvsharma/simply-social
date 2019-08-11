import { userConstant } from "../_constants/user.constants";

export const registration = (state = {}, action) => {
    switch (action.type) {
        case userConstant.SIGNUP_REQUEST:
            return {
                registering: true
            };
        case userConstant.SIGNUP_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstant.SIGNUP_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
}