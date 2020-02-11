import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import { StoreContext } from '../context/StoreContext';
import potatoe from '../assets/potatoe.gif';

const Header = props => {
  const [state] = useContext(StoreContext);
  const isAuth = useContext(AuthContext);
  const quantity = state.cartItems.map(item => item.quantity);
  const numberToDisplay = quantity.reduce((a, c) => a + c, 0);
  return (
    <div className="Nav-container">
      <div className="Nav">
        <div>
          <Link className="Nav-group__item" to="/">
            <img className="Nav__logo" src={potatoe} alt="Potatoe logo" />
          </Link>
        </div>
        <div className="Nav-group">
          <NavLink className="Nav-group__item" to="/products">
            Products
          </NavLink>
          {isAuth && (
            <NavLink className="Nav-group__item" to="/admin">
              Admin
            </NavLink>
          )}
        </div>
        <div className="Nav-group__cart">
          <Link className="Nav-group__cart-item" to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            <p className="Nav-group__cart-quantity">{numberToDisplay}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
