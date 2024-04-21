// SignIn.js
import React from 'react';
import { Button, Typography, Box, Card, CardContent, CardMedia } from '@mui/material';
import { signInWithGoogle } from '../services/auth';
import { Google } from '@mui/icons-material';
import './SignIn.css'; // Ensure this path is correct and the CSS is well-defined

function SignIn() {
  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <Box className="signInContainer" display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ maxWidth: 600, width: "100%", boxShadow: 3 }}>
        <CardMedia
          component="img"
          height="240"
          image="BQP-Logo.png" // Use an engaging, high-quality image relevant to assignments
          alt="Efficient Assignment"
          sx={{ objectFit: 'contain' }} // Ensures the image is scaled to fit without cropping
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            Welcome to BQP Assignment Check
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Revolutionize your educational experience with our cutting-edge platform designed to simplify and enhance the assignment review and feedback process. Sign in now to streamline your workflow and boost productivity!
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Google sx={{ fontSize: 40, marginRight: 2 }} />
            <Button variant="contained" color="primary" onClick={handleSignIn}>
              Sign in with Google
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default SignIn;
