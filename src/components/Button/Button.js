import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ text, sync }) => (<button onClick={sync} type="button">{text}</button>);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  sync: PropTypes.func.isRequired,
};
