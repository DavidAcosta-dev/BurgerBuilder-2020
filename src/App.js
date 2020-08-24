import React from 'react';
import { Route } from 'react-router-dom';
import Layout from './HOC/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';



class App extends React.Component {
	render() { 

		return(
			<div>
				<Layout>
					<Route exact path="/" component={BurgerBuilder} />
					<Route path="/checkout" component={Checkout} />
					<Route path="/orders" component={Orders} />
				</Layout>
			</div>
		)

	}//end of render()

}

export default App;
