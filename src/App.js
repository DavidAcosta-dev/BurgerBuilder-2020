import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './HOC/asyncComponent/asyncComponent';

import Layout from './HOC/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const asyncCheckout = asyncComponent(() => {
	return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
	return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
	return import('./containers/Auth/Auth');
});



class App extends React.Component {

	componentDidMount() {
		this.props.onTryAutoSignup();
	}


	render() { 

		let routes = (
			<Switch>
				<Route path="/auth" component={asyncAuth} />
				<Route exact path="/" component={BurgerBuilder} />
				<Redirect to="/" />
			</Switch>
		);

		if(this.props.isAuthenticated) {
			routes = (
				<Switch>
					<Route path="/checkout" component={asyncCheckout} />
					<Route path="/orders" component={asyncOrders} />
					<Route path="/logout" component={Logout} />
					<Route path="/auth" component={asyncAuth} />
					<Route exact path="/" component={BurgerBuilder} />
					<Redirect to="/" />
				</Switch>
			)
		};
		
		return(
			<div>
				<Layout>
					{routes}
				</Layout>
			</div>
		)

	}//end of render()

}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	};
}

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState())
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
