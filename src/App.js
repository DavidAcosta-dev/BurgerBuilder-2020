import React from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends React.Component {
	render() {

		return(
			<div>
				<Layout>
					<BurgerBuilder />
				</Layout>
			</div>
		)

	}//end of render()

}

export default App;
