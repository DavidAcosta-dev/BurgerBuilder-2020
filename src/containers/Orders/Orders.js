import React from 'react';
import axios from '../../axios-orders';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import OrderItm from '../../components/Order/OrderItm';

class Orders extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            loading: true
        }
    }

    componentDidMount() {
        axios.get('/orders.json')
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
                console.log(fetchedOrders)
                this.setState({loading: false, orders: fetchedOrders});
                
            })
            .catch(err => {
                this.setState({loading: false});
            })
    }

    render() {

        return(
            <div>
                {this.state.orders.map(order => {
                    return (
                        <OrderItm 
                            key={order.orderId} 
                            ingredients={order.ingredients}
                            price={order.price}
                        />
                    )
                })}
            </div>
        )
    }

}


export default withErrorHandler(Orders, axios);