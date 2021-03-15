import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.css';

export const Button = ({ text, sync }) => (<button className={styles.blue_button} onClick={sync} type="button">{text}</button>);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  sync: PropTypes.func.isRequired,
};
