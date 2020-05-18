import React, {Component} from 'react';
import classes from './Homepage.module.css';
import Footer from '../UI/Footer/Footer';
import WrapComponents from '../../hoc/Auxiliary/WrapComponents';
import SearchLocation from '../Homepage/SearchLocation/SearchLocation';
import '../UI/SimpleButton.css';
import { connect } from 'react-redux';


class Homepage extends Component {
    handleClick = () => {
        this.props.history.push('/explore');
    }

    render(){
    let footer = null;
    if (!this.props.auth.uid) {
        footer = (
            <Footer
                history={this.props.history}
                leftBtnText='SIGN UP'
                rightBtnText='LOG IN'
                leftBtnClickedPath='/signup'
                rightBtnClickedPath='/login'
            />)
    }
    return (
        <WrapComponents>
            <div className={classes.searchLocation}>
                <h1>Where Would You Like To Go?</h1>
                <SearchLocation />
                <button 
                className={"simpleButton " + classes.button}
                onClick={this.handleClick}
                >
                    EXPLORE
                </button>
            </div>
            {footer}
        </WrapComponents>
    );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth
    };
}

export default connect(mapStateToProps, null)(Homepage);
