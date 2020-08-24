import React from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: null,
            totalPrice: 0
        }
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            // ['salad', '1']
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients, totalPrice: price})
    }

    checkoutCanceled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {


        return (
            <div>
                <CheckoutSummary 
                    checkoutCanceled={this.checkoutCanceled} 
                    checkoutContinued={this.checkoutContinued} 
                    ingredients={this.state.ingredients} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(routeProps) => ( <ContactData ingredients={{...this.state.ingredients}} price={this.state.totalPrice}  {...routeProps} /> )} />

            </div>
        )
    }
}

export default Checkout;