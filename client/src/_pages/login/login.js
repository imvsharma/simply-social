import React, {Component} from 'react';
import './login.scss';

const emailRgx = RegExp(/^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$/);

const formValid = ({formErrors, ...rest}) => {
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

export default class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            formErrors: {
                email: "",
                password: ""
            },
            isFormValid: false
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        if(formValid(this.state)) {
            console.log(`
                --SUBMITTING--
                Email: ${this.state.email}
                Password: ${this.state.password}
            `)
        } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
    }

    handleChange = e => {
        e.preventDefault();
        const {name, value} = e.target;
        let formErrors = this.state.formErrors;

        switch (name) {
            case 'email':
                formErrors.email =value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? '': 'Invalid email address';
                break;

            case 'password':
                formErrors.password = value.length < 6 && value.length > 0 ? 'Minimum 6 characters required': ''
                break;
            
            default:
                break;
        }

        this.setState({formErrors, [name]: value}, () => {
            console.log(this.state);
        })
    }

    render() {
        const {formErrors} = this.state;
        return(
            <React.Fragment>
                <div id="appname">SimplySocial</div>
                <div id="authform">
                    <div id="signupform">  
                        <h3 id="heading" >Welcome Back</h3>
                        <form autoComplete="off">
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

                            {/* {formErrors.email.length === 0 && <span className="validationIcon">
                                    <svg className="svg-icon-correct-fullname" viewBox="0 0 20 20">
                                        <path d="M10.219,1.688c-4.471,0-8.094,3.623-8.094,8.094s3.623,8.094,8.094,8.094s8.094-3.623,8.094-8.094S14.689,1.688,10.219,1.688 M10.219,17.022c-3.994,0-7.242-3.247-7.242-7.241c0-3.994,3.248-7.242,7.242-7.242c3.994,0,7.241,3.248,7.241,7.242C17.46,13.775,14.213,17.022,10.219,17.022 M15.099,7.03c-0.167-0.167-0.438-0.167-0.604,0.002L9.062,12.48l-2.269-2.277c-0.166-0.167-0.437-0.167-0.603,0c-0.166,0.166-0.168,0.437-0.002,0.603l2.573,2.578c0.079,0.08,0.188,0.125,0.3,0.125s0.222-0.045,0.303-0.125l5.736-5.751C15.268,7.466,15.265,7.196,15.099,7.03"></path>
                                    </svg>
                                </span>} */}
                            {/* <span class="validationIcon" *ngIf="emailValidation('email') === true">
                                    <svg class="svg-icon-err-fullname" viewBox="0 0 20 20">
                                        <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
                                    </svg>
                                </span>
                                <span class="validationIcon" *ngIf="emailValidation('email') === false">
                                    <svg class="svg-icon-correct-fullname" viewBox="0 0 20 20">
                                        <path d="M10.219,1.688c-4.471,0-8.094,3.623-8.094,8.094s3.623,8.094,8.094,8.094s8.094-3.623,8.094-8.094S14.689,1.688,10.219,1.688 M10.219,17.022c-3.994,0-7.242-3.247-7.242-7.241c0-3.994,3.248-7.242,7.242-7.242c3.994,0,7.241,3.248,7.241,7.242C17.46,13.775,14.213,17.022,10.219,17.022 M15.099,7.03c-0.167-0.167-0.438-0.167-0.604,0.002L9.062,12.48l-2.269-2.277c-0.166-0.167-0.437-0.167-0.603,0c-0.166,0.166-0.168,0.437-0.002,0.603l2.573,2.578c0.079,0.08,0.188,0.125,0.3,0.125s0.222-0.045,0.303-0.125l5.736-5.751C15.268,7.466,15.265,7.196,15.099,7.03"></path>
                                    </svg>
                                </span> */}
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
                            {/* <span class="validationIcon" *ngIf="emailValidation('password') === true">
                                <svg class="svg-icon-err-fullname" viewBox="0 0 20 20">
                                    <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
                                </svg>
                            </span>
                            <span class="validationIcon" *ngIf="emailValidation('password') === false">
                                <svg class="svg-icon-correct-fullname" viewBox="0 0 20 20">
                                    <path d="M10.219,1.688c-4.471,0-8.094,3.623-8.094,8.094s3.623,8.094,8.094,8.094s8.094-3.623,8.094-8.094S14.689,1.688,10.219,1.688 M10.219,17.022c-3.994,0-7.242-3.247-7.242-7.241c0-3.994,3.248-7.242,7.242-7.242c3.994,0,7.241,3.248,7.241,7.242C17.46,13.775,14.213,17.022,10.219,17.022 M15.099,7.03c-0.167-0.167-0.438-0.167-0.604,0.002L9.062,12.48l-2.269-2.277c-0.166-0.167-0.437-0.167-0.603,0c-0.166,0.166-0.168,0.437-0.002,0.603l2.573,2.578c0.079,0.08,0.188,0.125,0.3,0.125s0.222-0.045,0.303-0.125l5.736-5.751C15.268,7.466,15.265,7.196,15.099,7.03"></path>
                                </svg>
                            </span> */}
                        </div>
                        {formErrors.password.length > 0 && <div className="ValidationError" >{formErrors.password}</div>}
                        {/* <div class="ValidationError" *ngIf="emailValidation('password') === true">Password is not valid</div> */}
                        <div className={`formrow1 ${!this.state.isFormValid? 'unselectedBtn': 'selectedBtn'}` }>
                            <button className={!this.state.isFormValid? 'unselectedBtn': 'selectedBtn'} type="submit" value="Submit" disabled={!this.state.isFormValid}>Log in</button>
                        </div>
                        </form>
                        <div>
                            <div id="signupwithnum">Forget password</div>
                            <hr id="separator" />
                            <div id="signupwithfb">Login with Facebook</div>
                        </div>
                        
                        <div id="loginlinkdiv">Don't have an account ? <span id="login">Sign up</span></div>
                    </div>
                </div>
            </React.Fragment>
            
        ) 
    }
}