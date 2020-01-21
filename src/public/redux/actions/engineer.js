import axios from 'axios';

export const getEngineer = url => ({
  type: 'GET_ENGINEER',
  payload: axios.get(url),
});
