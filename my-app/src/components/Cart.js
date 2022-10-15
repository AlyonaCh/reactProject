import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { changeCart } from '../features/cart/cartSlice'
import { useNavigate } from "react-router-dom";

export function Cart() {
  const count = useSelector((state) => state.cart.items.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.count;
  }, 0))
  const navigate = useNavigate();

  const clickCart = () => {
    navigate("/cart")
  }

  return (
    <div className="header-controls-pic header-controls-cart" onClick={clickCart}>
      {count > 0 &&
        <div className="header-controls-cart-full">{count}</div>
      }
        
        <div className="header-controls-cart-menu"></div>
    </div>
  );
}
