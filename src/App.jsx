import React, { useState, useEffect } from 'react';
import Notiflix from 'notiflix';

import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import css from './Index.module.css';
import { fetchImages } from 'api/api';
import { Searchbar } from 'components/SearchBar/Searchbar';

export const App = () => {
  const [images, setImages] = useState(null);
  const [query, setQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [largeImg, setLargeImg] = useState(null);
  const [tags, setTags] = useState(null);
  const [isLoadButton, setIsLoadButton] = useState(false);

  const fetchData = async (query) => {
    try {
      const newData = await fetchImages(query,page);
      if (newData.length) {
        setImages([...newData]);
        setIsLoadButton(true);
      } else {
        setError({ message: 'Images not found.' });
      }
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchData(query);
      setIsLoading(true);
      setPage(2);
    } else {
      setIsLoading(false);
    }
  }, [query]);

  const openModal = (url, tags) => {
    setIsModal(true);
    setLargeImg(url);
    setTags(tags);
  };

  const closeModal = () => {
    setIsModal(false);
    setLargeImg(null);
  };

  const loadMore = async () => {
    setIsLoading(true);
    setPage(page + 1);
    try {
      const newData = await fetchImages(query, page);
      setImages([...images, ...newData]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const searchedImages = form.elements.query.value;
    setQuery(searchedImages);
    setError(null);
    form.reset();
  };

  return (
    <>
      {isModal ? (
        <Modal
          largeImageUrl={largeImg}
          onPress={() => closeModal()}
          onEscDown={() => closeModal()}
          tags={tags}
        />
      ) : (
        <Searchbar onSubmit={handleSubmit} />
      )}
      {error ? (
        Notiflix.Notify.failure(
          `Whoops, something went wrong: ${error.message}`
        )
      ) : isLoading ? (
        <Loader />
      ) : (
        <div className={css.mainSection}>
          <ImageGallery images={images} openModal={openModal} />
          {isLoadButton ? <Button onButton={loadMore} /> : null}
        </div>
      )}
    </>
  );
};
