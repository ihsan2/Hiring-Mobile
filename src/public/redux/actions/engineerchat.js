import axios from 'axios';

export const getEngineerChat = url => ({
  type: 'GET_ENGINEERCHAT',
  payload: axios.get(url),
});
