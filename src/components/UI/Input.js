import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} />
      {/* {...props.input} This ensures that all the key value pairs, 
      which we receive on props.input are added as props to input. */}
    </div>
  );
};

export default Input;
