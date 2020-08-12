import React from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
// import Aux from '../../HOC/Auxiliary';    (using a fragment instead)

class Layout extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showSideDrawer: false
        }
    }

    closeSideDrawerHandler = () => {
        this.setState({showSideDrawer: false})
    }

    toggleSideDrawer = () => {
        this.setState((prevState,props)=> {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render() {
        
        return (
            <>
                <Toolbar toggleSideDrawer={this.toggleSideDrawer} />
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