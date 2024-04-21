import axios from 'axios';

const CONTENT_SERVICE_URL = 'http://localhost:6002';

export const getAllArticles = async () => {
  try {
    const response = await axios.get(`${CONTENT_SERVICE_URL}/articles/`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching articles');
  }
};

export const getArticle = async id => {
    try {
      const response = await axios.get(`${CONTENT_SERVICE_URL}/articles/${id}/`);
      console.log("Author ID", response.data.user_id)
      return response.data;
    } catch (error) {
      throw new Error('Error fetching article');
    }
  };


export const createArticle = async (articleData) => {
  try{

    console.log("articleData", articleData)
    const response = await axios.post(`${CONTENT_SERVICE_URL}/articles/?user_id=${localStorage.getItem('user')}`,articleData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error in Fetching my Articles');
  }
}

export const getUserArticles = async user_id => {
  try{
    const response = await axios.get(`${CONTENT_SERVICE_URL}/articles/manage/${user_id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error in Fetching my Articles');
  }
}

export const deleteArticle = async id => {
  try{
    const response = await axios.delete(`${CONTENT_SERVICE_URL}/articles/${id}/`)
    return response.data;
  } catch (error){
    throw new Error('Error in Deleting the Article');
  }
}
  