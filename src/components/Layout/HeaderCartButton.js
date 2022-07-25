import React, {  useEffect, useState } from "react";

import { useSelector } from "react-redux/es/hooks/useSelector";

import classes from "./HeaderCartButton.module.css";



import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = (props) => {


  const [btnIsHiglighted, setBtnIsHiglighted] = useState(false);

  const itemsRedux = useSelector(state => state.cart.items)


  const numberOfCartItems = itemsRedux.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnIsHiglighted ? classes.bump : ''}`;

  useEffect(() => {
    if (itemsRedux.length === 0) {

      return;
      
    }
    setBtnIsHiglighted(true);
    const timer = setTimeout(() => {
      setBtnIsHiglighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [itemsRedux]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
