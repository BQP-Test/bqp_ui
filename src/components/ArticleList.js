import React, { useState, useEffect } from 'react';
import { getAllArticles } from '../services/content';
import Navbar from './Navbar';
import { currentUser } from '../services/auth';
import { Card, CardContent, Typography, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from 'react-router-dom';
import './ArticleList.css';

function ArticleList() {
    const [articles, setArticles] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const articlesData = await getAllArticles();
                if (articlesData) {
                    setArticles(articlesData.reverse()); // Reverse the articles to display the most recent first
                }

                const userData = await currentUser(localStorage.getItem('token'));
                localStorage.setItem("user", userData.id);
                setUser(userData);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        }

        fetchArticles();
    }, []);

    return (
        <div>
            <Navbar user={user} />
            <h2>Articles</h2>
            <div className="articleListContainer">
                <Card className="createCard">
                    <CardContent className="createCardContent">
                        <AddCircleOutlineIcon style={{ fontSize: 60, color: 'white' }} />
                        <Typography variant="h6" style={{ color: 'white', margin: '20px 0' }}>
                            Create New Article
                        </Typography>
                        <Link to="/create-article" className="linkButton">
                            <Button variant="contained" color="primary" className="createButton">
                                Create
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
                {articles.map(article => (
                    <Card className="card" key={article.id}>
                        <CardContent className="cardContent">
                            <Typography variant="h5" gutterBottom className="title">
                                {article.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" className="content">
                                {article.content.slice(0, 100)}...
                            </Typography>
                            <Link to={`/articles/${article.id}`} className="linkButton">
                                <Button variant="contained" color="primary" className="button">
                                    Read More
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default ArticleList;
