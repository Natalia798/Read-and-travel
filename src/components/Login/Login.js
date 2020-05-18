import React, { Component } from 'react';
import classes from './Login.module.css';
import '../UI/SimpleButton.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { getOrDefault } from '../../utils/utilities';

export class Login extends Component {
    state = {
        email: '',
        password: '',
        rememberMe: false
    }

    handleEmailChange = (event) => {
        const email = event.target.value;
        this.setState({ email });
    }

    handlePasswordChange = (event) => {
        const password = event.target.value;
        this.setState({ password });
    }

    handleRememberMeChange = () => {
        const rememberMe = this.state.rememberMe;
        this.setState({
            rememberMe: !rememberMe
        });
    }

    handleLogin = (event) => {
        event.preventDefault(); // to stop page refresh
        const email = this.state.email;
        const password = this.state.password;
        const rememberMe = this.state.rememberMe;
        this.props.login(email, password, rememberMe);
    }

    handleCancelBtn = () => {
        this.props.history.push('/');
    }

    render() {
        if (this.props.auth.uid) {
            this.handleCancelBtn();
        }
        const loginErrorMsg = getOrDefault(this.props.loginError);

        return (
            <div className={classes.formDiv}>
                <form className={classes.loginForm} onSubmit={(event) => this.handleLogin(event)}>
                    <div className={classes.container}>
                        <label className={classes.label}>
                            <b>Email</b>
                        </label>
                        <input
                            className={classes.input}
                            type="email"
                            placeholder="Enter Email"
                            value={this.state.email}
                            onChange={(event) => this.handleEmailChange(event)}
                            required
                        />

                        <label className={classes.label}>
                            <b>Password</b>
                        </label>
                        <input
                            className={classes.input}
                            type="password"
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={(event) => this.handlePasswordChange(event)}
                            required
                        />

                        <label className={classes.errorLabel}> {loginErrorMsg}  </label>
                        <button
                            type="submit"
                            className={"simpleButton " + classes.button}
                        >
                            Login
                        </button>
                        <label className={classes.label}>
                            <input type="checkbox" onChange={this.handleRememberMeChange} />
                            Remember me
                        </label>
                        <button
                            type="button"
                            className={classes.cancelLoginBtn}
                            onClick={this.handleCancelBtn}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        loginError: state.auth.loginError
    };
}

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password, rememberMe) => dispatch(actions.login(email, password, rememberMe))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);