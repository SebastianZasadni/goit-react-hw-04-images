import React, { Component } from 'react';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import css from './Index.module.css';
import { fetchImages } from 'api/api';
import { Searchbar } from 'components/SearchBar/Searchbar';

export class App extends Component {
  static defaultProps = {
    images: [],
    query: null,
    isLoading: false,
    error: null,
    page: null,
    isModal: false,
    largeImg: null,
    tags: null,
    isLoadButton: false,
  };

  state = {
    images: this.props.images,
    query: this.props.query,
    isLoading: this.props.isLoading,
    error: this.props.error,
    page: this.props.page,
    isModal: this.props.isModal,
    largeImg: this.props.largeImg,
    tags: this.props.tags,
    isLoadButton: this.props.isButton,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== this.state.query) {
      this.setState({
        isLoading: true,
        page: 2,
      });
      try {
        const newData = await fetchImages(query, page);
        newData.length
          ? this.setState({
              images: [...newData],
              isLoadButton: true,
            })
          : this.setState({
              error: {
                message: 'Images not found',
              },
            });
      } catch (error) {
        this.setState({ error: error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  openModal = (url, tags) => {
    this.setState({
      isModal: true,
      largeImg: url,
      tags: tags,
    });
  };

  closeModal = () => {
    this.setState({
      isModal: false,
      largeImg: null,
    });
  };

  loadMore = async () => {
    this.setState(prevState => ({
      isLoading: true,
      page: prevState.page + 1,
    }));

    const { query, page } = this.state;

    try {
      const newData = await fetchImages(query, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...newData],
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const searchedImages = form.elements.query.value;
    this.setState({ query: searchedImages });
    form.reset();
  };

  render() {
    const { isLoading, error, isModal, largeImg, tags, isLoadButton, images } =
      this.state;
    return isLoading ? (
      <Loader />
    ) : error ? (
      Notiflix.Notify.failure(`Whoops, something went wrong: ${error.message}`)
    ) : isModal ? (
      <Modal
        largeImageUrl={largeImg}
        onPress={() => this.closeModal()}
        onEscDown={() => this.closeModal()}
        tags={tags}
      />
    ) : (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <div className={css.mainSection}>
          <ImageGallery images={images} openModal={this.openModal} />
          {isLoadButton ? <Button onButton={this.loadMore} /> : null}
        </div>
      </>
    );
  }
}

App.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      previewURL: PropTypes.string,
      largeImageURL: PropTypes.string,
      id: PropTypes.number,
    })
  ),
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  page: PropTypes.number,
  isModal: PropTypes.bool.isRequired,
  largeImg: PropTypes.string,
  isLoadButton: PropTypes.bool.isRequired,
};
