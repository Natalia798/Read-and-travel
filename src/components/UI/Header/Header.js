import React, { Component } from 'react';
import classes from './Header.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { NavLink } from 'react-router-dom';

export class Header extends Component {
    render() {
        let signOutLink = null;

        if (this.props.auth.uid)
            signOutLink = (
                <NavLink to="/" exact onClick={this.props.logout}     >
                    Log out
                </NavLink>
            );

        return (
            <header>
                <p className={classes.title}>Read &amp; Travel</p>
                {signOutLink}
            </header>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);