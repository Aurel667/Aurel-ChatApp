import apiClient from '../config/api';

export async function register({ username, password }) {
  try {
    console.log(username, password);
    const response = await apiClient.post('/auth/register', { username, password });
    return response.data;
  } catch (error) {
    return {
      error: error.message
    };
  }
}

export async function login({ username, password }) {
  try {
    const response = await apiClient.post('/auth/login', { username, password });
    return response.data;
  } catch (error) {
    return {
      error: 'Erreur lors de la connexion'
    };
  }
}

export async function logout() {
  try {
    const response = await apiClient.get('/auth/logout');
    return response.data;
  } catch (error) {
    return {
      error: 'Erreur lors de la déconnexion'
    };
  }
}

export async function getMe() {
  try {
    const response = await apiClient.get('/auth/me');
    return response.data;
  } catch (error) {
    return {
      error: 'Erreur lors de la récupération de l\'utilisateur'
    };
  }
}