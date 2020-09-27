import React from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import OrderItm from '../../components/Order/OrderItm';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';


class Orders extends React.Component {


    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = <Spinner />;
        if(!this.props.loading) {
            orders = this.props.orders.map(order => {
                return (
                    <OrderItm 
                        key={order.orderId} 
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                )
            })
        };

        return(
            <div>
                {orders}
            </div>
        )
    }//end of render()

}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));