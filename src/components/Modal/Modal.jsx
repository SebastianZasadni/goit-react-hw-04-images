import React from 'react';
import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from 'Index.module.css';

export const Modal = ({ largeImageUrl, onPress, tags, onEscDown }) => {
  const inputReference = useRef(null);

  useEffect(() => {
    inputReference.current.focus();
  }, []);

  const handleKeyDown = e => {
    if (e === 'Escape') {
      return onEscDown();
    }
  };
  return (
    <div
      className={css.overlay}
      ref={inputReference}
      onClick={onPress}
      tabIndex="0"
      onKeyDown={e => {
        handleKeyDown(e.key);
      }}
    >
      <div className={css.modal}>
        <img src={largeImageUrl} alt={tags} className={css.largeImage} />
        <p className={css.description}>{tags}</p>
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageUrl: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};
