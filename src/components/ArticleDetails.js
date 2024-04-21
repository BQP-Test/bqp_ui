import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticle, getAllArticles } from '../services/content';
import { getAuthorDetails, followAuthor, currentUser } from '../services/auth';
import CommentSection from './CommentSection';
import Navbar from './Navbar';
import { Typography, Paper, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import './ArticleDetails.css';

function ArticleDetails() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [user, setUser] = useState(null);
    const [author, setAuthor] = useState(null);
    const [articlesList, setArticlesList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);
            try {
                const articleData = await getArticle(id);
                setArticle(articleData);

                const userData = await currentUser(localStorage.getItem('token'));
                setUser(userData);

                if (articleData && articleData.user_id) {
                    const authorData = await getAuthorDetails(articleData.user_id);
                    setAuthor(authorData);
                    
                    const isAlreadyFollowing = authorData.followers?.some(follower => follower.id === userData.id);
                    setIsFollowing(isAlreadyFollowing);
                } else {
                    setAuthor(null);
                }

                const articlesListData = await getAllArticles();
                setArticlesList(articlesListData.slice(0, 10)); // Only load the latest 10 articles

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    const handleFollow = async () => {
        if (!user) {
            alert('You need to be logged in to follow authors');
            return;
        }
        try {
            await followAuthor(article.user_id, user.id);
            setAuthor({ ...author, followers: [...author.followers, user.id] });
            setIsFollowing(true);
        } catch (error) {
            console.error('Error following author:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data: {error.message}</p>;

    return (
        <div>
            <Navbar user={user} />
            <div style={{ display: 'flex' }}>
                <div style={{ flex: '2', padding: '20px' }}>
                    {article && (
                        <div>
                            <Typography variant="h2" component="h2" className="article-title">
                                {article.title}
                            </Typography>
                            <Typography variant="body1" paragraph className="article-content">
                                {article.content}
                            </Typography>
                            <Typography variant="body2" className="author-info">
                                <img src={author?.picture || 'default-avatar.png'} alt="Author" style={{ width: '25px', height: '25px', borderRadius: '50%', marginRight: '10px' }} />
                                Written by {author?.full_name || 'unknown'} | Followers: {author?.followers?.length || 0}
                            </Typography>
                            {isFollowing ? (
                                <Button variant="outlined" disabled>Following</Button>
                            ) : (
                                <Button variant="outlined" onClick={handleFollow}>Follow Author</Button>
                            )}
                            <CommentSection articleId={article.id} />
                        </div>
                    )}
                </div>
                <div style={{ flex: '1', padding: '20px' }} className='sidebarSection'>
                    <Paper elevation={3} className="sidebar">
                        <Typography variant="h6" component="h6" className="sidebar-title">
                          Latest Articles
                        </Typography>
                        <Divider />
                        <List>
                            {articlesList.map((otherArticle, index) => (
                                <Link to={`/articles/${otherArticle.id}`} key={index} >
                                    <ListItem button className="article-item">
                                        <ListItemText primary={otherArticle.title} />
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                        <Link to="/articles" style={{ textDecoration: 'none' }}>
                            <Button className="showMoreButton">Show More</Button>
                        </Link>
                    </Paper>
                </div>
            </div>
        </div>
    );
}

export default ArticleDetails;
