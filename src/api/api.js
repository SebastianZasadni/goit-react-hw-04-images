import axios from 'axios';

export const fetchImages = async (searchQuery, page) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=34267096-8e89032011ab6ec20673badb0&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data.hits;
};

