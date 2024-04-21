import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createArticle } from '../services/content';
import { TextField, Button, Typography } from '@mui/material';
import './CreateArticle.css';  // Ensure this is correctly linked
import Navbar from './Navbar';

function CreateArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async () => {
    try {
      await createArticle({ title, content });
      navigate('/'); // Redirect to the article list after creation
    } catch (error) {
      console.error('Failed to create article:', error);
    }
  };

  return (
    <div className="createArticleContainer">
      <Typography variant="h4" className="createArticleHeader">Create New Article</Typography>
      <div className="createArticleForm">
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          className="createArticleInput"
        />
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          multiline
          rows={10}  // Increased rows for better content visibility
          margin="normal"
          className="createArticleInput"
        />
        <Button onClick={handleSubmit} variant="contained" color="primary" className="createArticleButton">
          Create Article
        </Button>
      </div>
    </div>
  );
}

export default CreateArticle;
