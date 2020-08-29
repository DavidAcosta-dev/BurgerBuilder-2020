import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component { 


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
                    ingredients={this.props.ings} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData} />

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);