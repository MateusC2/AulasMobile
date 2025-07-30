// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  headers: {
    accept: 'application/json',
  },
});

const sheets = {
  posts: () => api.get('posts'),
  postsByUser: (userId) => api.get(`posts?userId=${userId}`),
  users: () => api.get('users'),
  userById: (userId) => api.get(`users/${userId}`),
  todos: () => api.get('todos'),
  todosByUser: (userId) => api.get(`todos?userId=${userId}`),
};

export default sheets;