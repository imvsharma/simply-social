import React, {Component} from 'react';
import {connect} from 'react-redux';

import './signup.scss';
import { userActions } from '../../../_actions/user.actions';
import createUserMutation from '../../../mutations/createUserMutation';

class Signup extends Component {
    constructor (props) {
        super(props);
        this.state = {
            firstname: null,
            lastname: null,
            email: null,
            password: null,
            formErrors: {
                firstname: "",
                lastname: "",
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
        if(this.formValid()) {
            //const {dispatch} = this.props;
            const {firstname, lastname,email,password} = this.state;
            console.log(`
                --SUBMITTING--
                Firstname: ${firstname}
                Lastname: ${lastname}
                Email: ${email}
                Password: ${password}
            `);
            const user = {
                firstname,
                lastname,
                email,
                password
            }

            createUserMutation(user).then(data => {
                console.log(data);
            }).catch(err => {
                console.log('error', err)
            })
            /* createUserMutation(user, ()=> {
                console.log('mutation completed');
            }) */

            //dispatch(userActions.signup({firstname,lastname,email,password}))
        } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
    }

    /* handleSubmit = e => {
        e.preventDefault();
        if(this.formValid()) {
            const {dispatch} = this.props;
            const {firstname, lastname,email,password} = this.state;
            console.log(`
                --SUBMITTING--
                Firstname: ${firstname}
                Lastname: ${lastname}
                Email: ${email}
                Password: ${password}
            `);
            dispatch(userActions.signup({firstname,lastname,email,password}))
        } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
    } */

    handleChange = e => {
        let formErrors= this.inputValidation(e.target);
        const {name, value} = e.target;
        this.setState({formErrors, [name]: value}, () => {})
    }

    inputValidation = ({name,value}) => {
        let formErrors = this.state.formErrors;

        switch (name) {
            case 'firstname':
                formErrors.firstname = value.length < 3 && value.length > 0 ? 'Minimum 3 characters required': '';
                break;
            
            case 'lastname':
                formErrors.lastname = value.length < 3 && value.length > 0 ? 'Minimum 3 characters required': '';
                break;

            case 'email':
                formErrors.email =value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? '': 'Invalid email address';
                break;

            case 'password':
                formErrors.password = value.length < 6 && value.length > 0 ? 'Minimum 6 characters required': ''
                break;
            
            default:
                break;
        }

        return formErrors;
    }

    render() {
        const {formErrors} = this.state;
        return(
            <React.Fragment>
                    <div id="signupform">  
                        <h3 id="heading" >Create an account</h3>
                        <form autoComplete="off" onSubmit={this.handleSubmit}>
                        <div className="formrow"> 
                            <input 
                                type="text" 
                                placeholder="Enter your firstname" 
                                name= "firstname"
                                noValidate
                                pattern="[a-zA-Z][a-zA-Z ]+"
                                onChange = {this.handleChange}
                            />
                            {formErrors.firstname.length > 0 && <span className="validationIcon" >
                                    <svg className="svg-icon-err-fullname" viewBox="0 0 20 20">
                                        <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
                                    </svg>
                                </span>}
                        </div>
                        {formErrors.firstname.length > 0 && <div className="ValidationError" >{formErrors.firstname}</div>}

                        <div className="formrow"> 
                            <input 
                                type="text" 
                                placeholder="Enter your lastname" 
                                name= "lastname"
                                noValidate
                                pattern="[a-zA-Z][a-zA-Z ]+"
                                onChange = {this.handleChange}
                            />
                            {formErrors.lastname.length > 0 && <span className="validationIcon" >
                                    <svg className="svg-icon-err-fullname" viewBox="0 0 20 20">
                                        <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
                                    </svg>
                                </span>}
                        </div>
                        {formErrors.lastname.length > 0 && <div className="ValidationError" >{formErrors.lastname}</div>}

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
                            <button className={!this.formValid()? 'unselectedBtn': 'selectedBtn'} type="submit" value="Submit" disabled={!this.formValid()}>Signup</button>
                        </div>
                        </form>
                        <div>
                            <div id="signupwithfb">Signup with Facebook</div>
                        </div>
                        
                        <div id="loginlinkdiv">Already have an account ? <span id="login">Log in</span></div>
                    </div>
                
            </React.Fragment>
            
        ) 
    }
}

const mapStateToProps = (state) => {
    const { registration } = state;
    return {
        registration
    }
}

export default connect(mapStateToProps)(Signup)