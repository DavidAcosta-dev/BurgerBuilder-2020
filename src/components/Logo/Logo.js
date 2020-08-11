import React from 'react';
import classes from './Logo.module.css';
import burgerLogo from '../../assets/images/burger-logo.png' //webpack will handle this image import with a special module or plugin and copy it over to the destination directory it creates(only in memory during development) and will even optimize the image. "burgerLogo" will only be receiving the path of the image that webpack will copy/assign it to. This is a Dynamic image import.

const logo = (props) => {
    return(
        <div className={classes.Logo} style={ {height: props.height} }>
            <img src={burgerLogo} alt="MyBurger" />
        </div>
    );
}


export default logo;