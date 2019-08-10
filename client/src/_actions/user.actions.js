import { userConstant } from "../_constants/user.constants";
import {history} from '../_helpers/history';
import Auth from "../_services/auth.service";

const auth = new Auth();

const login = data => {
    return dispatch => {
        dispatch(loginRequest(data.email));
        auth.login(data).then(user => {
            dispatch(loginSuccess(user.token));
            history.push(`/home/${user.token}`);
        }).catch(err => {
            dispatch(loginFailure(err));
        })
    }
}

const signupRequest = user => {
    return {
        type: userConstant.SIGNUP_REQUEST,
        user
    }
}

const loginRequest = user => {
    return {
        type: userConstant.LOGIN_REQUEST,
        user
    }
}

const signupSuccess = () => {
    return {
        type: userConstant.SIGNUP_SUCCESS
    }
}

const loginSuccess = user => {
    return {
        type: userConstant.LOGIN_SUCCESS,
        user
    }
}

const signupFailure = error => {
    return {
        type: userConstant.SIGNUP_FAILURE,
        error
    }
}

const loginFailure = error => {
    return {
        type: userConstant.LOGIN_FAILURE,
        error
    }
}

export const userActions = {
    signup,
    login
}