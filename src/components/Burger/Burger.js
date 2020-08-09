import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = (props) => {

    let ingredientsArray = Object.keys(props.ingredients)
        .map(ing => {
            return [...Array(props.ingredients[ing])].map((_, index) => {
                return <BurgerIngredient name={ing} key={ing+index} />
            })
        }) 
        .reduce((accu, el) => {             //we chain reduce() method to our array of arrays in order to flaten it and see all ingredients in one array. starting accumulator value will be [] instead of the 1st element. There are of course other ways of doing this but reduce is very powerful and should be learned.
            return accu.concat(el)
        }, []);

        console.log(ingredientsArray);

        if(ingredientsArray.length === 0) {
            ingredientsArray = <p className={classes.NoIngredients}>Please add ingredients</p>
        }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient name="bread-top" />
            {ingredientsArray}
            <BurgerIngredient name="bread-bottom" />
        </div>
    );
};

export default burger;