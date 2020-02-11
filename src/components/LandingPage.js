import React from 'react';
import { Link } from 'react-router-dom';

import chrisBolt from '../assets/christian-bolt-Uf0aVyl5C70-unsplash.jpg';
import dancoun from '../assets/dan-counsell-t4NNQyv09Sw-unsplash.jpg';
import moniGra from '../assets/monika-grabkowska-ECxiHN817xE-unsplash.jpg';
import moniGrab from '../assets/monika-grabkowska-N-xhCO5gY7s-unsplash.jpg';

const LandingPage = () => {
  return (
    <div className="LandingPage">
      <div className="LandingPage-content">
        <h1 className="LandingPage__title">
          Welcome to <span className="emphasized">Potato</span> shop
        </h1>
        <p className="LandingPage__text">Potato from around the world</p>
        <Link className="LandingPage__link" to="/products">
          Start shopping!
        </Link>
      </div>
      <div className="LandingPage-gallery">
        <img
          className="landscape"
          src={chrisBolt}
          alt="potato by Christian Bolt"
        />
        <img
          className="portrait"
          src={moniGra}
          alt="potato by Monika Grabowska"
        />
        <img className="landscape" src={dancoun} alt="potato by Dan Counsell" />
        <img
          className="portrait"
          src={moniGrab}
          alt="potato by Monika Grabowska"
        />
      </div>
    </div>
  );
};

export default LandingPage;
