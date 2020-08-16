import React from 'react';
import Modal from '../../components/UI/Modal/Modal';


const withErrrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component { 
        state = {
            error: null
        }

        componentWillMount() {
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })
            axios.interceptors.response.use(res => res, error => {
                console.log(error);
                this.setState({error: error}); //receiving error message from server via the axios response and passing that error object to local state.
            })
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

export default withErrrorHandler;