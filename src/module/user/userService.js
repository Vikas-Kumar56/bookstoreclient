import axios from 'axios';
import baseUrl from '../../config';

export const login = (email, password) =>
  axios.post(`${baseUrl}/api/v1/login`, {
    email,
    password,
  });

export const regiserApi = (user) =>
  axios.post(`${baseUrl}/api/v1/register`, user);
