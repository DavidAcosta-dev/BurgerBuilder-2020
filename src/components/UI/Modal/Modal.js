import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
const modal = (props) => {
    const style = {
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? 1 : 0
    }

    return(
        <>  <Backdrop show={props.show} closeModal={props.closeModal} />
            <div className={classes.Modal} style={style}>
                {props.children}
            </div>
        </>
    )
};


export default modal;