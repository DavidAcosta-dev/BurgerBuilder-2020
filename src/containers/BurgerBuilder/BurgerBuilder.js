import React from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
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
            ingredients: {
                cheese: 0,
                salad: 0,
                bacon: 0,
                meat: 0
            },
            totalPrice: 4,
            purchasable: false,
            purchasingMode: false,
            loading: false
        }
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
        // console.log("continuing!!!! :D")
        this.setState({
            loading: true
        })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'David Acosta',
                address: {
                    street: 'Teststreet 13',
                    zipCode: '12357',
                    country: 'Australia'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }


        axios.post(`/orders.json`, order)
            .then(res=> {
                this.setState({
                    loading: false,
                    purchasingMode: false
                })
            })
            .catch(err=> {
                console.log(err);
                this.setState({
                    loading: false,
                    purchasingMode: false
                })
            })
    }//end of purchaseContinueHandler()

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = <OrderSummary 
                                ingredients={{...this.state.ingredients}} 
                                totalPrice={this.state.totalPrice}
                                closeModal={this.closeModalHandler} 
                                purchaseContinue={this.purchaseContinueHandler}
                            />

        if(this.state.loading) {
            orderSummary = <Spinner />;
        }
        //the for loop above is saying, for every key in disabledInfo(which is an ingredients clone) make the property of each key equal true or false depending if they are <= zero or not. Check out the console log below.
        console.log(disableInfo);

        return(
            <>
                <Modal show={this.state.purchasingMode} closeModal={this.closeModalHandler}>
                    {orderSummary}
                </Modal>
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
        )
    }
}


export default BurgerBuilder;


