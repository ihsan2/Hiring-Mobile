import axios from 'axios';

export const getMessage = url => ({
  type: 'GET_MESSAGE',
  payload: axios.get(url),
});

export const addMessage = (url, data) => ({
  type: 'ADD_MESSAGE',
  payload: axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  }),
});

export const deleteMessage = url => ({
  type: 'DELETE_MESSAGE',
  payload: axios.delete(url),
});
