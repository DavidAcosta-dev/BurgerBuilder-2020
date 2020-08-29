import React from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';




class BurgerBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            purchasingMode: false,
            loading: false,
            error: false
        }
    }

    componentDidMount() {
        // console.log(this.props);
        // axios.get(`https://react-my-burger-3f060.firebaseio.com/ingredients.json`)
        //     .then(res => {
        //         const ingredients = res.data;
        //         this.setState({ingredients});
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         this.setState({error: true})
        //     })
    }

    updatePurchasableState = (ingredientsClone) => {
        const ingQuantity = Object.values(ingredientsClone).reduce((a,b)=> {
            return a + b;
        })
        
        return ingQuantity > 0;
        
    }


    purchaseModeHandler = () => {
        this.setState({
            purchasingMode: true
        })
    }

    closeModalHandler = () => {
        this.setState({
            purchasingMode: false
        })
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disableInfo = {...this.props.ings}; //state is passed in as props by the {connect} HOC

        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        //"disabledInfo"....the for-in loop above is saying, for every key in disabledInfo(which is an ingredients clone) make the property of each key equal true or false depending if they are <= zero or not. Check out the console log below.


        let orderSummary = null; //Same reason we conditionally render burgerAndControls below, we fetch ingredients from server so it starts off as null and since these components depend on ingredients to render correctly, we must not render them until ingredients are present.
    
        let burgerAndControls = this.state.error ? <p>Ingredients cannot be loaded!...</p> : <Spinner />;

        //if ingredients does NOT equal "null", then render Burger and BuildControls, as well as OrderSummary otherwise, render a <Spinner />. Reason for this is because we fetch ingredients from firebase so it starts off as null.
        if(this.props.ings) {
            burgerAndControls = (
                <>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        addIngredient={this.props.onIngredientAdded} 
                        removeIngredient={this.props.onIngredientRemoved} 
                        disabled={disableInfo}   
                        totalPrice={this.props.price} 
                        purchasable={this.updatePurchasableState(this.props.ings)}
                        purchasingMode={this.purchaseModeHandler}
                    />
            </>
            );//end of burgerAndControls
            
            orderSummary = <OrderSummary 
                                ingredients={this.props.ings} 
                                totalPrice={this.props.price}
                                closeModal={this.closeModalHandler} 
                                purchaseContinue={this.purchaseContinueHandler}
                            />
        }//end of conditional rendering

        //Check if loading is true, if so we replace orderSummary w/ a spinner.
        if(this.state.loading) {
            orderSummary = <Spinner />;
        }

        return(
            <>
                <Modal show={this.state.purchasingMode} closeModal={this.closeModalHandler}>
                    {orderSummary}
                </Modal>
                { burgerAndControls }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)( withErrorHandler(BurgerBuilder, axios) );

//How connect works: connect detects the store={store} that was passed in by the <Provider>.
//It then accepts the mapping functions which are nothing special by themselves, but when passed 
//into connect, connect sees that the mappingFunction accepts an arg (doesn't matter what you named it)
//and it passes the store's -> reducer.js's -> state into that mappingFunction and from there the mappingFunction
//we set up returns an object with our state's properties. We use abbreviated keys like ings so that when we use it 
//in the code we know that it's the mapped version that we made in here. 
//Connect then wraps the exported component (this component) and injects the props we just made into it. Kinda weird to think of
//our state being passed in as props from a mapped object we made inside the component receiving it but state is usually passed in as 
//props anyway a lot of the time. The injecting props into itself part is still strange though.
//ALL OF THIS ALSO GOES FOR THE DISPATCH FUNCTIONS IN THE mapDispatchToProps 

