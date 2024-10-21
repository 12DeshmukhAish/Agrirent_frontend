'use client'
import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

if (!API_URL) {
  console.error('API_URL is undefined. Please check your environment variables.');
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// User related functions
export const registerUser = async (userData) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post('/users/login', credentials);
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

export const getUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

// Booking related functions
export const getUserBookings = async () => {
  const response = await api.get('/bookings/user');
  return response.data;
};

export const createBooking = async (bookingData) => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};

export const updateBooking = async (bookingId, bookingData) => {
  const response = await api.put(`/bookings/${bookingId}`, bookingData);
  return response.data;
};

export const deleteBooking = async (bookingId) => {
  const response = await api.delete(`/bookings/${bookingId}`);
  return response.data;
};

// Equipment related functions
export const addEquipment = async (equipmentData) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authentication token found');
  try {
    const response = await api.post('/equipment', equipmentData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in addEquipment:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getEquipment = async () => {
  const response = await api.get('/equipment/user');
  return response.data;
};

export const getAllEquipment = async () => {
  try {
    const response = await api.get('/equipment/all');
    console.log('All equipment data:', response.data);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error fetching all equipment:', error);
    throw error;
  }
};

export const updateEquipment = async (equipmentId, equipmentData) => {
  try {
    const response = await api.put(`/equipment/${equipmentId}`, equipmentData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in updateEquipment:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteEquipment = async (equipmentId) => {
  const response = await api.delete(`/equipment/${equipmentId}`);
  return response.data;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export default api;