import React from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

// *********NOTE*******: Refactor the state to be an array of ingredient Objects with their own name, quantity, and price keys.

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: null, //this will be populated by the server when we fetch ingredients in componentDidMount();
            totalPrice: 4,
            purchasable: false,
            purchasingMode: false,
            loading: false,
            error: false
        }
    }

    componentDidMount() {
        console.log(this.props);
        axios.get(`https://react-my-burger-3f060.firebaseio.com/ingredients.json`)
            .then(res => {
                const ingredients = res.data;
                this.setState({ingredients});
            })
            .catch(err => {
                console.log(err);
                this.setState({error: true})
            })
    }

    updatePurchasableState = (ingredientsClone) => {
        console.log(Object.values(ingredientsClone));
        const ingQuantity = Object.values(ingredientsClone).reduce((a,b)=> {
            return a + b;
        })
        console.log(ingQuantity);

        this.setState({
            purchasable: ingQuantity > 0
        })
    }

    //adds +1 to the value of the ingredient name passed in.
    addIngredient = (name) => {
        const updatedIngredients = {...this.state.ingredients}; //cloning state in immutable fashion
        console.log(`We will update ${name} from ${updatedIngredients[name]} to (${updatedIngredients[name]} + 1)`); //1
        updatedIngredients[name] = this.state.ingredients[name] + 1; //adding +1 to the specific element in cloned state object.
        // const priceAddition = INGREDIENT_PRICES[name];
        // const oldPrice = this.state.totalPrice;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[name];

        this.setState({
            ingredients: updatedIngredients,      //updating real state with altered clone-state
            totalPrice: newPrice
        });

        this.updatePurchasableState(updatedIngredients);

    }//end of addIngredient()


    removeIngredient = (name) => {
        console.log(name);
        if(this.state.ingredients[name] <= 0){
            console.log(`No more ${name} to remove.`);
            return
        }
        const ingredientsClone = {...this.state.ingredients};
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[name];
        ingredientsClone[name] --;
        console.log(ingredientsClone);
        this.setState({
            ingredients: ingredientsClone,
            totalPrice: newPrice
        });

        this.updatePurchasableState(ingredientsClone);
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

        // // console.log("continuing!!!! :D")
        
        const queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.state.ingredients[i])}`);
        }
        queryParams.push(`price=${this.state.totalPrice}`);
        const queryString = queryParams.join('&')
        this.props.history.push({           //push a new page onto the "stack" of pages
            pathname:'/checkout',
            search: `?${queryString}`
        });
    }//end of purchaseContinueHandler()

    render() {
        const disableInfo = {...this.state.ingredients};

        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        //"disabledInfo"....the for loop above is saying, for every key in disabledInfo(which is an ingredients clone) make the property of each key equal true or false depending if they are <= zero or not. Check out the console log below.
        console.log(disableInfo);

        let orderSummary = null; //Same reason we conditionally render burgerAndControls below, we fetch ingredients from server so it starts off as null and since these components depend on ingredients to render correctly, we must not render them until ingredients are present.
    
        let burgerAndControls = this.state.error ? <p>Ingredients cannot be loaded!...</p> : <Spinner />;

        //if ingredients does NOT equal "null", then render Burger and BuildControls, as well as OrderSummary otherwise, render a <Spinner />. Reason for this is because we fetch ingredients from firebase so it starts off as null.
        if(this.state.ingredients) {
            burgerAndControls = (
                <>
                    <Burger ingredients={{...this.state.ingredients}} />
                    <BuildControls 
                        addIngredient={this.addIngredient} 
                        removeIngredient={this.removeIngredient} 
                        disabled={disableInfo}   
                        totalPrice={this.state.totalPrice} 
                        purchasable={this.state.purchasable}
                        purchasingMode={this.purchaseModeHandler}
                    />
            </>
            );//end of burgerAndControls
            
            orderSummary = <OrderSummary 
                                ingredients={{...this.state.ingredients}} 
                                totalPrice={this.state.totalPrice}
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


export default withErrorHandler(BurgerBuilder, axios);


