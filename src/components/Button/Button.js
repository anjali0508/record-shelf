import React from 'react';
import PropTypes from 'prop-types';

import './Button.module.css';

export const Button = ({ text, sync }) => (<button onClick={sync} type="button" className="rounded-button">{text}</button>);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  sync: PropTypes.func.isRequired,
};
