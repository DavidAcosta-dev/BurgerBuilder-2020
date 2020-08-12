import React from 'react';
import BUTTON from '../../UI/BUTTON/BUTTON';

class OrderSummary extends React.Component {
    //this could be a functional component, doesn't have to be a class.
    componentWillUpdate() {
        console.log("orderSummary will update")
    }

    render() {
        const style = {
            textTransform: "capitalize"
        }
        const ingredientSummary = Object.keys(this.props.ingredients).map((ing, index)=> {
            return(
                <li key={ing+index}>
                    <span style={style}>{ing}</span> : x{this.props.ingredients[ing]}
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
                <p><strong>Total Price: </strong>${this.props.totalPrice.toFixed(2)}</p>
                <p>Continue to Checkout?</p>
                <BUTTON btnType="Danger" clicked={()=> this.props.closeModal()} >CANCEL</BUTTON>
                <BUTTON btnType="Success"clicked={()=> this.props.purchaseContinue()}>CONTINUE</BUTTON>
            </>
        )
    }
    
};


export default OrderSummary;