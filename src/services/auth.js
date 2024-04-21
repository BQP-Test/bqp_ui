import axios from 'axios';

const AUTH_SERVICE_URL = 'http://localhost:6001'; // Ensure your service URL is correct

// Assuming the backend correctly redirects to Google OAuth
export const signInWithGoogle = async () => {
  try {
    const response = await axios.get(`${AUTH_SERVICE_URL}/login/google`);
    if (response.data.url) {
      // Use window.location.replace for a harder redirect that does not allow going back
      window.location.replace(response.data.url);
    } else {
      throw new Error('Login URL not found');
    }
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};


export const currentUser = async token => {
  try {
    const response = await axios.get(`${AUTH_SERVICE_URL}/users/me?token=${token}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw new Error('Error fetching current user');
  }
};

export async function followAuthor(authorId, followerId) {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/users/append-follower`, {
      user_id: authorId,
      follower_user_id: followerId
    });
    return response.data;
  } catch (error) {
    console.error('Error following author:', error);
    throw error;
  }
};

export const getAuthorDetails = async user_id => {
  try {
    const response = await axios.get(`${AUTH_SERVICE_URL}/users/me/${user_id}/`);
    return response.data;
  } catch (error) {
    console.error('Error getting author details:', error);
    throw new Error('Error getting author details');
  }
};

export const isUserSignedIn = () => {
  return localStorage.getItem('token') !== null;
};
