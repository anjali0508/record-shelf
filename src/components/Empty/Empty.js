import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button/Button';
import styles from './Empty.module.css';

export const EmptyComponent = ({ sync }) => (
  <div className={styles.container}>
    <p>:((</p>
    <p>Seems a bit empty in heree</p>
    <Button sync={sync} text="sync" />
  </div>
);

EmptyComponent.propTypes = {
  sync: PropTypes.func.isRequired,
};
