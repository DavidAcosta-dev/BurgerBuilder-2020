import React from 'react';
import classes from './OrderItm.module.css';


//THIS IS AN INDIVIDUAL ORDER!!!! functional component
const OrderItm = (props) => {
    const ingredientsArray = [];

    for ( let ingKey in props.ingredients ) {
        ingredientsArray.push(
            {
                name: ingKey ,
                amount: props.ingredients[ingKey]
            }
        );
    }

    const ingredientOutput = ingredientsArray.map(ing => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ing.name}>{ing.name}({ing.amount})</span>
    })


    return (
        <div className={classes.OrderItm}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}

export default OrderItm;