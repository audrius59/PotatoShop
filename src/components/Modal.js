import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

const ErrorModal = React.memo(props => {
  return (
    <React.Fragment>
      <div className="backdrop" onClick={props.onClose} />
      <div className="Modal">
        <h3 className="Modal__text">{props.children}</h3>
        <div className="Modal__button-container">
          <button
            className="Modal__button"
            type="button"
            onClick={props.onClose}
          >
            <FontAwesomeIcon icon={faWindowClose} size="lg" />
          </button>
        </div>
      </div>
    </React.Fragment>
  );
});

export default ErrorModal;
