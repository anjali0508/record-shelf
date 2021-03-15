import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button/Button';

export const EmptyComponent = ({ sync }) => (
  <>
    <div>Nothings here</div>
    <Button sync={sync} text="sync" />
  </>
);

EmptyComponent.propTypes = {
  sync: PropTypes.func.isRequired,
};
