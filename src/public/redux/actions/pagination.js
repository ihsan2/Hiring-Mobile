import axios from 'axios';

export const getPagination = url => ({
  type: 'GET_PAGINATION',
  payload: axios.get(url),
});
