import axios from 'axios';

export const getCompanyChat = url => ({
  type: 'GET_COMPANYCHAT',
  payload: axios.get(url),
});
