import React, { useState, useEffect } from 'react';
import { getComments, addComment } from '../services/comments';
import { Box, Typography, TextField, Button, Avatar, Grid } from '@mui/material';
import './CommentSection.css'

function CommentSection({ articleId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        async function fetchComments() {
            try {
                const commentsData = await getComments(articleId);
                setComments(commentsData);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        }

        fetchComments();
    }, [articleId]);

    const handleAddComment = async () => {
        try {
            const user = localStorage.getItem('user');
            await addComment(articleId, newComment, user);
            const updatedComments = await getComments(articleId);
            setComments(updatedComments);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const displayedComments = showAll ? comments : comments.slice(0, 3);

    return (
        <Box mt={3} className="comments-container">
            <Typography variant="h6">Comments</Typography>
            <TextField
                multiline
                rows={3}
                fullWidth
                variant="outlined"
                label="Add a comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="comment-input"
            />
            {newComment && (
                <Button variant="contained" color="primary" onClick={handleAddComment} sx={{ mt: 1 }}>
                    Add Comment
                </Button>
            )}
            <Box mt={3} className="comment-list">
                {displayedComments.map((comment) => (
                    <Grid container spacing={2} key={comment.id}>
                        <Grid item>
                            <Avatar alt={comment.user_name} src={comment.picture} />
                        </Grid>
                        <Grid item xs>
                            <Typography variant="subtitle1">@{comment.user_name}</Typography>
                            <Typography variant="body1">{comment.content}</Typography>
                        </Grid>
                    </Grid>
                ))}
                {comments.length > 3 && !showAll && (
                    <Button variant="contained" onClick={() => setShowAll(true)} className="show-more-button">
                        Show More
                    </Button>
                )}
            </Box>
        </Box>
    );
}

export default CommentSection;
