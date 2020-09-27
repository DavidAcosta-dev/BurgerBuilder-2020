import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post(`/orders.json?auth=${token}`, orderData)
            .then(res=> {
                dispatch(purchaseBurgerSuccess( res.data.name, orderData ) );
            })
            .catch(err=> {
                console.log(err);
                dispatch(purchaseBurgerFail( err ) );
            })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        axios.get(`/orders.json${queryParams}`)
            .then(res => {
                const fetchedOrders = [];
                /*looping over each json object (which is an order) and cloning the keys from the order into a new object, adding a new key which 
                  we assign with the unique identifier (order) that firebase set up and then lastly pushing that new object to the array called fetchedOrders.*/
                for (let order in res.data) {
                    fetchedOrders.push({
                        ...res.data[order],
                        orderId: order
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));                
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            });
    };
};