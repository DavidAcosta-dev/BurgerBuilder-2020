import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import Input from '../../components/UI/Forms/INPUT/INPUT';
import Button from '../../components/UI/BUTTON/BUTTON';
import classes from './Auth.module.css'
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            controls: {
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Email Address'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                    touched: false
                },
                password: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Password'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 6
                    },
                    valid: false,
                    touched: false
                }
            },
            isSignup: true

        }//end of state
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (e, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: e.target.value,
                valid: checkValidity(e.target.value, this.state.controls[controlName].validation),
                touched: true
            }) 
        });
        this.setState({controls: updatedControls});
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup };
        });
    };



    render() {
        const formElementsArray = [];
        //for every key inside the orderForm object (name,street,email...) we will push a new object to formElementsArray containing 
        //the key name itself as the id and config which is equal to the key's contents.
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        };

        let form = formElementsArray.map(el => (
            <Input
                key={el.id}
                elementType={el.config.elementType} 
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                invalid={!el.config.valid}
                shouldValidate={el.config.validation}
                touched={el.config.touched}
                changed={(e)=> this.inputChangedHandler(e, el.id)} />
        ));

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                <h2>{!this.state.isSignup ? 'Welcome back, Sign in below' : 'New here? Create account below'}</h2>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    { form }
                    <Button btnType="Success">SUBMIT</Button>
                </form>
        <Button 
            clicked={this.switchAuthModeHandler}
            btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGN-IN' : 'SIGN-UP'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !==null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect( mapStateToProps, mapDispatchToProps)(Auth);