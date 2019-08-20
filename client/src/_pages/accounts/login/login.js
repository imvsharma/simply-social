import React, {Component} from 'react';
import { connect } from 'react-redux';
import {userActions} from '../../../_actions/user.actions'
import './login.scss';

class Login extends Component {
    constructor (props) {
        super(props);
        
        this.state = {
            email: null,
            password: null,
            formErrors: {
                email: "",
                password: ""
            }
        }
    }

    formValid = () => {
        const {formErrors, ...rest} = this.state;
        let valid = true;
        // validate forms errors being empty
        Object.values(formErrors).forEach(value => {
            value.length > 0 && (valid = false)
        })
    
        // validate the forms was filled out
        Object.values(rest).forEach(value => {
            value === null && (valid = false)
        })
    
        return valid;
    }

    handleSubmit = e => {
        e.preventDefault();
        const {dispatch} = this.props;
        const {email, password} = this.state;
        if(this.formValid()) {
            dispatch(userActions.login({email,password}))
        } else {
            //console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
    }

    handleChange = e => {
        let formErrors= this.inputValidation(e.target);
        const {name, value} = e.target;
        this.setState({formErrors, [name]: value}, () => {
            //console.log(this.state);
        })
    }

    inputValidation = ({name,value}) => {
        let formErrors = this.state.formErrors;
        if(name === 'email') {
            formErrors.email =value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? '': 'Invalid email address';
        } else if(name === 'password') {
            formErrors.password = value.length < 6 && value.length > 0 ? 'Minimum 6 characters required': ''
        }

        return formErrors;
    }

    render() {
        const {formErrors} = this.state;
        return(
            <React.Fragment>
                    <div id="signupform">  
                        <h3 id="heading" >Welcome Back</h3>
                        <form autoComplete="off" onSubmit={this.handleSubmit}>
                        <div className="formrow"> 
                            <input 
                                type="email" 
                                placeholder="Enter your email id" 
                                name= "email"
                                noValidate
                                onChange = {this.handleChange}
                            />
                            {formErrors.email.length > 0 && <span className="validationIcon" >
                                    <svg className="svg-icon-err-fullname" viewBox="0 0 20 20">
                                        <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
                                    </svg>
                                </span>}
                        </div>
                        {formErrors.email.length > 0 && <div className="ValidationError" >{formErrors.email}</div>}
                        <div className="formrow"> 
                            <input 
                                type="password" 
                                placeholder="Enter your password"
                                name="password"
                                noValidate
                                onChange = {this.handleChange}
                            />
                            {formErrors.password.length > 0 && <span className="validationIcon" >
                                    <svg className="svg-icon-err-fullname" viewBox="0 0 20 20">
                                        <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
                                    </svg>
                                </span>}
                        </div>
                        {formErrors.password.length > 0 && <div className="ValidationError" >{formErrors.password}</div>}
                        <div className={`formrow1 ${!this.formValid()? 'unselectedBtn': 'selectedBtn'}` }>
                            <button className={!this.formValid()? 'unselectedBtn': 'selectedBtn'} type="submit" value="Submit" disabled={!this.formValid()}>Log in</button>
                        </div>
                        </form>
                        <div>
                            <div id="signupwithnum">Forget password</div>
                            <hr id="separator" />
                            <div id="signupwithfb">Login with Facebook</div>
                        </div>
                        
                        <div id="loginlinkdiv">Don't have an account ? <span id="login">Sign up</span></div>
                    </div>
                
            </React.Fragment>
            
        ) 
    }
}

const mapStateToProps = (state) => {
    const { authentication } = state;
    return {
      authentication
    }
}
  
export default connect(mapStateToProps)(Login);