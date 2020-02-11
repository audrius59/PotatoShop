import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const CartItem = ({ data, handleAdd, handleRemove }) => {
  return (
    <div className="CartItem">
      <div className="CartItem__product">
        <img
          className="CartItem__product-image"
          src={data.image}
          alt="product"
        />
        <div className="CartItem__product-container">
          <h5 className="CartItem__product-title">{data.name}</h5>
          <p className="CartItem__product-description">
            {data.description.replace(/^(.{190}[^\s]*).*/, '$1')}...
          </p>
        </div>
      </div>
      <div className="CartItem__price">
        <div className="CartItem__inner">
          <button className="CartItem__inner--action" onClick={handleRemove}>
            <FontAwesomeIcon icon={faMinus} size="sm" />
          </button>
          <span>{data.quantity}</span>
          <button className="CartItem__inner--action" onClick={handleAdd}>
            <FontAwesomeIcon icon={faPlus} size="sm" />
          </button>
        </div>
        <div className="CartItem__inner">
          <span>{data.price.toFixed(2)}&euro;</span>
        </div>
        <div className="CartItem__inner">
          <span>{parseFloat(data.price * data.quantity).toFixed(2)}&euro;</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
