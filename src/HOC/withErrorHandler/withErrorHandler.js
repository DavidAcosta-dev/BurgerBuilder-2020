import React from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    // "functional component returning a class component": This looks very strage but it's a functional wrapper component that we set it's arguments to the component we will wrap+axios for interceptors middleware.
    //We then return an anonymous class component because we need it's class "shell" to hold state and access certain lifecycle hooks. Then inside that anonymous class comonent we return the child comonent we passed into withErrorHandler as an argument.
    
    //"Anonymous class function"...
    return class extends React.Component { 
        state = {
            error: null
        }

        componentWillMount() {
            //creating a class variable that we can reference in all parts of the anonymous class. This is opposed to declaring "let reqInterceptor;"  outside of this method and then assigining it's value in this method.
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                console.log(error);
                this.setState({error: error}); //receiving error message from server via the axios response and passing that error object to local state.
            })
        }

        componentWillUnmount() {
            //getting rid of our interceptors when we are not using them, when withErrorHandler is about to unmount to prevent memory leak.
            console.log('Will Unmount', this.resInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }


        render() {

            return (
                <>
                    <Modal show={this.state.error} closeModal={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
                
            );

        }
    }
}

export default withErrorHandler;