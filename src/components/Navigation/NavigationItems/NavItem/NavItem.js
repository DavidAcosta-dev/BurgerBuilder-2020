import React from 'react';
import classes from './NavItem.module.css';
import { NavLink } from 'react-router-dom';

//this component expects props: "link", "actice", "children/inner text"
const navItem = (props) => (
    <li className={classes.NavItem}>
        <NavLink exact={props.exact} to={props.link} activeClassName={classes.active}>
            {props.children}
        </NavLink>
    </li>
)

export default navItem;