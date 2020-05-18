import React, { Component } from 'react';
import classes from './Footer.module.css';
import '../SimpleButton.css';

class Footer extends Component {

    handleBtnClick = (path) => {
        this.props.history.push(path);
    }

    render() {
        const leftBtn = [classes.button, classes.alignLeft].join(" ");
        const rightBtn = [classes.button, classes.alignRight].join(" ");
        return (
            <footer className={classes.footer}>
                {this.props.leftBtnText ?
                    <button
                        className={"simpleButton " + leftBtn}
                        onClick={() => this.handleBtnClick(this.props.leftBtnClickedPath)}
                    >
                        {this.props.leftBtnText}
                    </button>
                    : null}
                {this.props.rightBtnText ?
                    <button
                        className={"simpleButton " + rightBtn}
                        onClick={() => this.handleBtnClick(this.props.rightBtnClickedPath)}
                    >
                        {this.props.rightBtnText}
                    </button>
                    : null}
            </footer>
        );
    }
}

export default Footer;