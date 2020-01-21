import axios from 'axios';
import {API_KEY_URL} from 'react-native-dotenv';

export const loginEngineer = data => ({
  type: 'LOGIN',
  payload: axios.post(`${API_KEY_URL}/auth/engineer`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  }),
});

export const loginCompany = data => ({
  type: 'LOGIN',
  payload: axios.post(`${API_KEY_URL}/auth/company`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  }),
});
