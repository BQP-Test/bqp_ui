// comments.js
import axios from 'axios';

const COMMENT_SERVICE_URL = 'http://localhost:6003';

export const getComments = async articleId => {
  try {
    const response = await axios.get(`${COMMENT_SERVICE_URL}/comments/${articleId}/`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching comments');
  }
};

export const addComment = async (articleId, content, user_id) => {
  try {
    const response = await axios.post(`${COMMENT_SERVICE_URL}/comments/?user_id=${user_id}`, { article_id: articleId, content });
    return response.data;
  } catch (error) {
    throw new Error('Error adding comment');
  }
};