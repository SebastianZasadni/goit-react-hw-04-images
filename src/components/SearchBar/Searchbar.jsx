import React from 'react';

import css from '../../Index.module.css';

export const Searchbar = ({ onSubmit }) => {
  return (
    <header className={css.searchBar}>
      <form className={css.searchForm} onSubmit={onSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>
        <input
          name="query"
          type="text"
          className={css.searchFormInput}
          autoComplete="off"
          autoFocus
          placeholder="Search image and photos"
          id="search-input"
        ></input>
      </form>
    </header>
  );
};
