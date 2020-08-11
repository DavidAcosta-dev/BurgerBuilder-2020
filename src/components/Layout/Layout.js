import React from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
// import Aux from '../../HOC/Auxiliary';    (using a fragment instead)

class Layout extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showSideDrawer: true
        }
    }

    closeSideDrawerHandler = () => {
        this.setState({showSideDrawer: false})
    }

    openSideDrawer = () => {
        this.setState((prevState,props)=> {
            return {showSideDrawer: true}
        })
    }

    render() {
        
        return (
            <>
                <Toolbar openSideDrawer={this.openSideDrawer} />
                <SideDrawer 
                    closeSideDrawer={this.closeSideDrawerHandler} 
                    showSideDrawer={this.state.showSideDrawer} 
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </>
        )
    }
    
}

export default Layout;