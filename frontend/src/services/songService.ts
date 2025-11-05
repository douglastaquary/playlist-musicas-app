import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const songService = {
  async getAll() {
    const response = await axios.get(`${API_URL}/songs`);
    return response.data;
  },

  async create(name: string, artist?: string) {
    const response = await axios.post(`${API_URL}/songs`, { name, artist });
    return response.data;
  },

  async update(id: string, data: { name?: string; artist?: string; position?: number }) {
    const response = await axios.put(`${API_URL}/songs/${id}`, data, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },

  async delete(id: string) {
    const response = await axios.delete(`${API_URL}/songs/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },

  async move(fromPosition: number, toPosition: number) {
    const response = await axios.post(
      `${API_URL}/songs/move`,
      { fromPosition, toPosition },
      { headers: getAuthHeaders() }
    );
    return response.data;
  },
};

