import React, { useState } from 'react';

import css from '../../Index.module.css';

export const Searchbar = ({ handleSubmit }) => {
  const [query, setQuery] = useState('');

  const inputQueryHandle = e => setQuery(e.target.value);

  const onSubmit = evt => {
    evt.preventDefault();
    if (!query) return;
    handleSubmit(query);
    setQuery('');
  };

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
          value={query}
          onChange={inputQueryHandle}
        />
      </form>
    </header>
  );
};
