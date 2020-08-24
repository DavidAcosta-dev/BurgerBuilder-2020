import React from 'react';
import classes from './INPUT.module.css';


const INPUT = (props) => {
    //initially set to null, this variable will be dynamically checked and set by switch statement to an input type from the list. 
    //The props passed in will also be {...spread} into the <element {...props} /> via props.

    let inputElement = null;  
    const inputClasses = [classes.InputElement];

    if (props.shouldValidate && props.invalid && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed} />;
            break;

        case ('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed} />;
            break;
        
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value} 
                    onChange={props.changed} >
                                                                        {/* rendering <option> elements inside <select> dynamically */}
                        {props.elementConfig.options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.displayValue}
                            </option>
                        ))}

                </select>
            );
            break;

        default:
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} onChange={props.changed} />;
    }//end of switch

    return (
        <div className={classes.INPUT}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>

    )

    
}


export default INPUT;