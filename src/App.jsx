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
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [largeImg, setLargeImg] = useState(null);
  const [tags, setTags] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchImages(query, page);
        const newData = response.data.hits;
        const pages = Math.round(response.data.totalHits / 12);
        if (newData.length) {
          if (!isFormSubmitted && query) {
            setImages(prevImages => [...prevImages, ...newData]);
          } else {
            setImages([...newData]);
            setTotalPages(pages);
            setIsFormSubmitted(false);
          }
        } else {
          setError({ message: 'Images not found.' });
        }
      } catch (error) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
        setIsFormSubmitted(false);
      }
    };
    setIsLoading(true);
    fetchData();
  }, [query, page]);

  const openModal = (url, tags) => {
    setIsModal(true);
    setLargeImg(url);
    setTags(tags);
  };

  const closeModal = () => {
    setIsModal(false);
    setLargeImg(null);
  };

  const loadHandle = () => {
    setIsLoading(true);
    setPage(page + 1);
    setIsFormSubmitted(false);
  };

  const handleSubmit = searchedImages => {
    setQuery(searchedImages);
    setPage(1);
    setError(null);
    setIsFormSubmitted(true);
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
        <Searchbar handleSubmit={handleSubmit} />
      )}
      {error ? (
        Notiflix.Notify.failure(
          `Whoops, something went wrong: ${error.message}`
        )
      ) : isLoading ? (
        <Loader />
      ) : query ? (
        <div className={css.mainSection}>
          <ImageGallery images={images} openModal={openModal} />
          {page !== totalPages ? <Button onButton={loadHandle} /> : null}
        </div>
      ) : null}
    </>
  );
};
