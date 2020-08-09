import React from 'react';

import classes from './Control.module.css';

const control = (props) => {
    return (
        <div className={classes.Control}>
            <div className={classes.ingLabel}>{props.ingLabel}</div>
            <button className={classes.Less} onClick={props.removeIngredient} disabled={props.disabled}>Less</button>
            <button className={classes.More} onClick={props.addIngredient} >More</button>
        </div>
    )
}

export default control;