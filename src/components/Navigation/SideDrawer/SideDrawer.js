import React from 'react';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';


const sideDrawer = (props) => {
    const sideDrawerStyling = [classes["SideDrawer"]];
    props.showSideDrawer ? sideDrawerStyling.push(classes["Open"]) : sideDrawerStyling.push(classes["Close"]);
    return(
        <>
            <Backdrop closeModal={props.closeSideDrawer} show={props.showSideDrawer} />
            <div className={sideDrawerStyling.join(" ")}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </>
    );
}

export default sideDrawer;

//in here, Backdrop's "show" prop is linked to sideDrawer's "showSideDrawer" prop passed from Layout's state. This differs from how Backdrop receives it's "show" prop in Modal.
//Likewise, Backdrop's "closeModal" prop is given a value of closeSideDrawer. (the naming for closeModal doesn't make sense since we are not closing a modal but that's fine.)