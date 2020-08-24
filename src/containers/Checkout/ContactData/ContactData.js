import React from 'react';
import classes from './ContactData.module.css';
import INPUT from '../../../components/UI/Forms/INPUT/INPUT';
import Button from '../../../components/UI/BUTTON/BUTTON';
import Spinner from '../../../components/UI/Spinner/Spinner';

import axios from '../../../axios-orders';

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
                    value: ''
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: ''
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Zip Code'
                    },
                    value: ''
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: ''
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your E-Mail'
                    },
                    value: ''
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'economic', displayValue: 'Economic'}
                        ]
                    },
                    value: ''
                }
            },
            loading: false,

        }
    }

    orderHandler = (e) => {
        e.preventDefault();
        
        if(Object.keys(this.props.ingredients).length === 0){
            console.log("MISSING INGREDIENTS");
            return
        }

        this.setState({
            loading: true
        });

        const formData = {};
        for( let inputIdentifier in this.state.orderForm) {
            formData[inputIdentifier] = this.state.orderForm[inputIdentifier].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }


        axios.post(`/orders.json`, order)
            .then(res=> {
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch(err=> {
                console.log(err);
                this.setState({
                    loading: false
                })
            })

    }//END of orderHandler()


    inputChangedHandler = (e, inputIdentifier) => {
        console.log(e.target.value)
        console.log(inputIdentifier)
        //deep cloning
        const orderFormClone = {
            ...this.state.orderForm
        };
        const updatedInputIdentifier = {
            ...orderFormClone[inputIdentifier]
        }
        updatedInputIdentifier.value = e.target.value;

        orderFormClone[inputIdentifier] = updatedInputIdentifier;

        this.setState({
            orderForm: orderFormClone
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
                        changed={(e)=> this.inputChangedHandler(e, el.id)} />
                ))}
                <Button btnType="Success">ORDER</Button>
            </form>
        );
        if (this.state.loading) {
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

export default ContactData;