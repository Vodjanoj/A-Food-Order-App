
import { Fragment, useState } from "react";
import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css"

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Agrigento Meals</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className={classes['main-image']}>
        {/* it is possible also to use URL of image of course if that image would be on some server*/}
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
