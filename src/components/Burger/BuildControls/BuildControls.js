import React from 'react';
import classes from './BuildControls.module.css';
import Control from './Control/Control';


//props: addIngredient()
const controlsArray = [
    { label: 'Salad', name: 'salad'},
    { label: 'Cheese', name: 'cheese'},
    { label: 'Bacon', name: 'bacon'},
    { label: 'Meat', name: 'meat'}
]




//Needed to access props for the callback props 
// const controlComponentsArray = controlsArray.map(ctrl => {
//     return <Control key={ctrl.label}  ingLabel={ctrl.label} addIngredient={props.addIngredient} />
// })

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>${props.totalPrice.toFixed(2)}</strong></p>
        { controlsArray.map(ctrl => 
            <Control 
                key={ctrl.label}   
                ingLabel={ctrl.label} 
                addIngredient={()=> props.addIngredient(ctrl.name)}
                removeIngredient={()=> props.removeIngredient(ctrl.name)}
                disabled={props.disabled[ctrl.name]} 
            />) 
        }
        <button 
            className={classes.OrderButton} 
            disabled={!props.purchasable} 
            onClick={()=> props.purchasingMode()}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER' }</button>
        
        
    </div>
)

export default buildControls;




/******  -- NOTE! --  ******/
//BuildControls should be a class component so that we could generate the controls array using props.ingredients instead of making a whole new controlsArray.
//This way, if we change the names of the ingredients or add more like "swiss cheese" or "tomatoes" we could do so dynamically. 