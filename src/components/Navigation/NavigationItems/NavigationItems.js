import React from 'react';
import classes from './NavigationItems.module.css';
import NavItem from './NavItem/NavItem';

//for boolean props, you can just pass in the name by itself without assignment. so "active" instead of active="active" or active={true}
const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavItem link="/" exact>Burger Builder</NavItem>
        { props.isAuthenticated ? <NavItem link="/orders">Orders</NavItem> : null }
        { !props.isAuthenticated 
            ? <NavItem link="/auth">Authenticate</NavItem> 
            : <NavItem link="/logout">Logout</NavItem> 
        }
    </ul>
);

export default navigationItems;