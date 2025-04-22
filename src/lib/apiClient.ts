
import axios from 'axios';

//  Configure the base URL for your Flask backend
// When in development mode, point to the Flask server
const API_URL = 'http://127.0.0.1:5000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Use this for debugging
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
