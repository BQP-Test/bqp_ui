// ManageArticles.js
import React, { useState, useEffect } from 'react';
import { getUserArticles, deleteArticle } from '../services/content';
import Navbar from './Navbar';
import { currentUser } from '../services/auth';

function ManageArticles() {
  const [articles, setArticles] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const userArticles = await getUserArticles(); // Implement this function to fetch user's articles
        setArticles(userArticles);

        const userData = await currentUser(localStorage.getItem('token'));
        localStorage.setItem("user",userData.id)
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user articles:', error);
      }
    }

    fetchArticles();
  }, []);

  const handleDeleteArticle = async (articleId) => {
    try {
      await deleteArticle(articleId); // Implement this function to delete an article
      // After deletion, update the articles list
      const updatedArticles = articles.filter(article => article.id !== articleId);
      setArticles(updatedArticles);
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  return (
    <div>
        <Navbar user={user} />
      <h2>Manage Your Articles</h2>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <span>{article.title}</span>
            <button onClick={() => handleDeleteArticle(article.id)}>Delete</button>
            {/* Add edit functionality if needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageArticles;
