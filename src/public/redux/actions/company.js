import axios from 'axios';

export const getCompany = url => ({
  type: 'GET_COMPANY',
  payload: axios.get(url),
});
