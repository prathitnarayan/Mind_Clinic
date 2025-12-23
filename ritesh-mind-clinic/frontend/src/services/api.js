import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mind-clinic.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const createAppointment = (data) =>
  api.post('/appointments', data);

export default api;