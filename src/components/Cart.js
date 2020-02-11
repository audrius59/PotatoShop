import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import Modal from './Modal';
import ApiFactory from '../mock';
import { INCREASE, DECREASE, CLEAR_CART } from '../actionTypes/storeActions';

import { StoreContext } from '../context/StoreContext';

const Cart = () => {
  const [state, dispatch] = useContext(StoreContext);
  const [message, setMessage] = useState('');

  const handlePurchase = () => {
    if (state.cartItems.length > 0) {
      buyItems(state.cartItems);
    }
    return;
  };
  const handleClearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const handleIncrease = id => {
    dispatch({ type: INCREASE, payload: id });
  };

  const handleRemove = id => {
    dispatch({ type: DECREASE, payload: id });
  };

  const handleClose = () => {
    setMessage('');
  };

  function buyItems(items) {
    ApiFactory.getInstance()
      .post('/api/buy', { itemsToBuy: items })
      .then(function() {
        setMessage('Thank you for your order!');
        dispatch({ type: 'PURCHASE' });
      })
      .catch(error => {
        setMessage(error.response);
      });
  }

  const getTotal = () => {
    const temp = [];
    state.cartItems.map(item =>
      temp.push(parseFloat(item.price * item.quantity))
    );
    return temp.length > 0 ? temp.reduce((a, c) => a + c).toFixed(2) : 0;
  };

  return (
    <div className="content">
      {state.cartItems.length > 0 ? (
        <>
          <p className="Cart__message">Click buy to checkout :)</p>
          <div className="Cart">
            <div className="Cart__label">
              <span className="Cart__label--wide">Product</span>
              <span className="Cart__label--default">Cuantity</span>
              <span className="Cart__label--default">Price</span>
              <span className="Cart__label--default">Total price</span>
            </div>
            {state.cartItems.map(item => {
              return (
                <CartItem
                  handleAdd={() => handleIncrease(item.id)}
                  handleRemove={() => handleRemove(item.id)}
                  key={item.id}
                  data={item}
                />
              );
            })}
          </div>
          {state.cartItems.length > 0 && (
            <div className="Cart__btn-group">
              <button className="Cart__btn" onClick={handlePurchase}>
                Buy
              </button>
              <button className="Cart__btn" onClick={handleClearCart}>
                Clear Cart
              </button>
              <span className="Cart__price">{getTotal()}&euro;</span>
            </div>
          )}
        </>
      ) : (
        <>
          <p className="Cart__message">Your cart is currently empty :(</p>
          <Link className="Cart__backBtn" to="/">
            Go back
          </Link>
        </>
      )}

      {message && <Modal onClose={handleClose}>{message}</Modal>}
    </div>
  );
};

export default Cart;
