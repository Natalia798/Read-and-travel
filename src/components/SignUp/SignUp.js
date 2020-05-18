import React, { Component } from 'react';
import classes from './SignUp.module.css';
import PasswordStrengthMeter from '../SignUp/PasswordStrengthMeter/PasswordStrengthMeter';
import terms from '../../assets/terms.pdf';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { getOrDefault } from '../../utils/utilities';

export class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            email: null,
            password: null,
            confirm_password: null,
            dateOfBirth: null,
            passwordOpen: false,
            errorMessage: {
                username: "",
                email: "",
                confirm_password: "",
                dateOfBirth: ""
            }
        };
    };

    handleSubmit = event => {
        event.preventDefault();
        const usernameError = this.state.errorMessage.username;
        const emailError = this.state.errorMessage.email;
        const passwordError = this.state.errorMessage.password;
        const confirm_passwordError = this.state.errorMessage.confirm_password;
        const dateOfBirthError = this.state.errorMessage.dateOfBirth;

        if (!usernameError && !emailError && !passwordError && !confirm_passwordError && !dateOfBirthError) {
            const newUser = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                dateOfBirth: this.state.dateOfBirth
            }
            this.props.signUp(newUser);
        }
        else {
            alert("Failed SignUp");
        }
    };

    //USERNAME
    handleUsernameChange = event => {
        const val = event.target.value
        const errorMessage = {
            ...this.state.errorMessage,
            username: "",
        }
        if (val.length < 5) {
            errorMessage.username = "Username must contain at least 5 characters"
        }
        this.setState({ username: val, errorMessage });
    };

    //EMAIL
    handleEmailChange = event => {
        const val = event.target.value
        const errorMessage = {
            ...this.state.errorMessage,
            email: "Email is invalid"
        }
        if (val.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            errorMessage.email = "";
        }
        this.setState({ email: val, errorMessage });
    };

    //PASSWORD MATCH
    handleChange = event => {
        const val = event.target.value;
        const errorMessage = {
            ...this.state.errorMessage,
            confirm_password: ""
        };
        if (val !== this.state.confirm_password) {
            errorMessage.confirm_password = "Password doesn't match";
        }
        this.setState({ password: val, errorMessage });
        this.setState({password: event.target.value });
    };

    //CONFIRM PASSWORD
    handleConfirmPassword = event => {
        const val = event.target.value;
        const errorMessage = {
            ...this.state.errorMessage,
            confirm_password: ""
        }
        if (val !== this.state.password) {
            errorMessage.confirm_password = "Password doesn't match"
        }
        this.setState({ confirm_password: val, errorMessage });
    };

    //DATE
    handleDateChange = event => {
        const val = event.target.value;
        const errorMessage = {
            ...this.state.errorMessage,
            dateOfBirth: ""
        }
        const year = new Date(val).getFullYear();

        if (year < new Date().getFullYear() - 100) {
            errorMessage.dateOfBirth = "You're too old for this app"
        }
        this.setState({ dateOfBirth: val, errorMessage });
    };

    cancelBtnHandle = () => {
        this.props.history.push('/');
    };

    togglePasswordMeter(flag = false) {
        this.setState({
            passwordOpen: flag
        })
    };

    render() {
        if (this.props.auth.uid) {
            this.cancelBtnHandle();
        }
        const signupErrorMsg = getOrDefault(this.props.signupError);

        return (
            <div className={classes.container}>
                <div className={classes.signUp}>
                    <h1>Create your account</h1>
                    <hr />
                    <form onSubmit={this.handleSubmit} >
                        <div>
                            <label >Username</label>
                            <input
                                name="username"
                                type="text"
                                placeholder="Your Name"
                                onBlur={event => this.handleUsernameChange(event)}
                                required
                            />
                            <span className={classes.error}>{this.state.errorMessage.username}</span>
                        </div>

                        <div>
                            <label>Email Address</label>
                            <input
                                name="email"
                                type="email"
                                className={classes.email}
                                placeholder="Your email address"
                                onBlur={event => this.handleEmailChange(event)}
                                required
                            />
                            <span className={classes.error}>{this.state.errorMessage.email}</span>
                        </div>

                        <div>
                            <label>Password</label>
                            <input
                                type="password"
                                className={classes.pwd}
                                placeholder='Enter password'
                                onFocus={(event) => this.togglePasswordMeter(true)}
                                onBlur={(event) => this.togglePasswordMeter()}
                                onChange={(event) => this.handleChange(event)}
                                required
                            />
                            <PasswordStrengthMeter
                                opened={this.state.passwordOpen}
                                pass={this.state.password}
                            />
                        </div>

                        <div>
                            <label>Password Confirmation</label>
                            <input
                                name="confirm_password"
                                type="password"
                                className={classes.confirm_password}
                                placeholder="Confirm Password"
                                onChange={event => this.handleConfirmPassword(event)}
                                required
                            />
                            <span className={classes.error}>{this.state.errorMessage.confirm_password}</span>
                        </div>

                        <div>
                            <label>Date of birth</label>
                            <input
                                name="dateOfBirth"
                                type="date"
                                className={classes.dateOfBirth}
                                placeholder="Date of birth"
                                onBlur={event => this.handleDateChange(event)}
                                required
                            />
                            <span className={classes.error}>{this.state.errorMessage.dateOfBirth}</span>
                        </div>

                        <div className={classes.btn}>
                            <p>
                                <input name="check" type="checkbox" required />
                                By creating an account you agree to our <a href={terms} target="_blank" rel="noopener noreferrer">Terms &amp; Privacy</a>
                            </p>
                            <label>
                                <button type="button" className={classes.cancelBtn} onClick={this.cancelBtnHandle}>Cancel</button>
                                <button type="submit" className={classes.signUpBtn} >Sign Up</button>
                                <span className={classes.errorFirebase}>{signupErrorMsg}</span>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        signupError: state.auth.registerError
    };
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: (newUser) => dispatch(actions.register(newUser))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);