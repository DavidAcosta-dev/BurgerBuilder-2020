import React from 'react';
import { connect } from 'react-redux';

import classes from './ContactData.module.css';
import INPUT from '../../../components/UI/Forms/INPUT/INPUT';
import Button from '../../../components/UI/BUTTON/BUTTON';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../HOC/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Zip Code'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5
                    },
                    valid: false,
                    touched: false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your E-Mail'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'economic', displayValue: 'Economic'}
                        ]
                    },
                    value: 'fastest',
                    validation: {},
                    valid: true
                }
            },//end of orderForm
            formIsValid: false,

        }
    }


    orderHandler = (e) => {
        e.preventDefault();
        
        if(Object.keys(this.props.ings).length === 0){
            alert("Please add ingredients");
            return
        }

        const formData = {};
        for( let inputIdentifier in this.state.orderForm) {
            formData[inputIdentifier] = this.state.orderForm[inputIdentifier].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token);


        

    }//END of orderHandler()

    inputChangedHandler = (e, inputIdentifier) => {
        
        const updatedInput = updateObject(this.state.orderForm[inputIdentifier], {
            value: e.target.value,
            valid: checkValidity(e.target.value, this.state.orderForm[inputIdentifier].validation), //passing the updatedInput's value and validation key to the validation checker. This will return true or false and assign it to the "valid" key which sits on the input's state currently false by default.
            touched: true
        });

        //deep cloning
        const orderFormClone = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedInput
        })        
        

        let formIsValid = true;
        for (let inputIdentifier in orderFormClone) {
            formIsValid = orderFormClone[inputIdentifier].valid && formIsValid;
        }


        this.setState({
            orderForm: orderFormClone,
            formIsValid
        })
        
    }//end of inputChangedHandler()

    render() {
        const formElementsArray = [];
        //for every key inside the orderForm object (name,street,email...) we will push a new object to formElementsArray containing 
        //the key name itself as the id and config which is equal to the key's contents.
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        //Now we are mapping over the array of objects we created and making them into <INPUT /> elements inside of a <form></form>
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(el => (
                    <INPUT 
                        key={el.id}
                        elementType={el.config.elementType} 
                        elementConfig={el.config.elementConfig}
                        value={el.config.value}
                        invalid={!el.config.valid}
                        shouldValidate={el.config.validation}
                        touched={el.config.touched}
                        changed={(e)=> this.inputChangedHandler(e, el.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));