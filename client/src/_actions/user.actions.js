import { userConstant } from "../_constants/user.constants";
import {history} from '../_helpers/history';
import Auth from "../_services/auth.service";

const auth = new Auth();

const login = data => {
    return dispatch => {
        dispatch(loginRequest(data.email));
        auth.login(data).then(user => {
            dispatch(loginSuccess(user.token));
            //history.push(`/home/${user.token}`);
        }).catch(err => {
            dispatch(loginFailure(err));
        })
    }
}

const signup = data => {
    console.log(data)
    return dispatch => {
        dispatch(signupRequest(data));
        auth.signup(data).then(user => {
            dispatch(signupSuccess(user.token))
        }).catch(err => {
            dispatch(signupFailure(err))
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

const signupSuccess = user => {
    return {
        type: userConstant.SIGNUP_SUCCESS,
        user
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