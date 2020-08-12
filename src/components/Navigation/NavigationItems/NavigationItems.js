import React from 'react';
import classes from './NavigationItems.module.css';
import NavItem from './NavItem/NavItem';

//for boolean props, you can just pass in the name by itself without assignment. so "active" instead of active="active" or active={true}
const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavItem link="/" active>Burger Builder</NavItem>
        <NavItem link="/">Checkout</NavItem>
    </ul>
)

export default navigationItems;