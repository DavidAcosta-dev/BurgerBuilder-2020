import React from 'react';
import BUTTON from '../../UI/BUTTON/BUTTON';

const orderSummary = (props) => {
    const style = {
        textTransform: "capitalize"
    }
    const ingredientSummary = Object.keys(props.ingredients).map((ing, index)=> {
        return(
            <li key={ing+index}>
                <span style={style}>{ing}</span> : x{props.ingredients[ing]}
            </li>
        )
    })

    return(
        <>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: </strong>${props.totalPrice.toFixed(2)}</p>
            <p>Continue to Checkout?</p>
            <BUTTON btnType="Danger" clicked={()=> props.closeModal()} >CANCEL</BUTTON>
            <BUTTON btnType="Success"clicked={()=> props.purchaseContinue()}>CONTINUE</BUTTON>
        </>
    )
};


export default orderSummary;