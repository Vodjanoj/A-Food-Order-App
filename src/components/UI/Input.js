import React from 'react';
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => { // React.forwardRef is being used here becase we can't use ref in MealItemForm.js in Input custom component
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
      {/* {...props.input} This ensures that all the key value pairs, 
      which we receive on props.input are added as props to input. */}
    </div>
  );
});

export default Input;
