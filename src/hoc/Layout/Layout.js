/* istanbul ignore file */
import React from 'react';
import WrapComponents from '../Auxiliary/WrapComponents';
import Header from '../../components/UI/Header/Header';
import classes from './Layout.module.css';

export default function Layout(props) {
    return (
        <WrapComponents>
            <Header />
            <main className={classes.mainContent}>
                {props.children}
            </main>
        </WrapComponents>
    )
};