import { nanoid } from 'nanoid';

import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from '../../Index.module.css';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.imageGallery}>
      {images ? (images.map(i => (
        <ImageGalleryItem
          key={nanoid()}
          smallImageUrl={i.previewURL}
          onPress={() => openModal(i.largeImageURL, i.tags)}
          tags={i.tags}
        />
      ))) : (
        null
      )}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      previewURL: PropTypes.string,
      largeImageURL: PropTypes.string,
      id: PropTypes.number.isRequired,
    })
  ),
openModal: PropTypes.func.isRequired
};
