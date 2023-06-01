import React from 'react';
import PropTypes from 'prop-types';
import css from 'Index.module.css';

export const Button = ({ onButton }) => {
  return (
    <button className={css.button} type="submit" onClick={onButton}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onButton: PropTypes.func.isRequired
};
