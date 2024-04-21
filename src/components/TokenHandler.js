import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TokenHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // A function to ensure the token is handled correctly
    const handleToken = async () => {
      const urlParams = new URLSearchParams(location.search);
      const token = urlParams.get('token');
      if (token) {
        localStorage.setItem('token', token);
        // Use a timeout or another method to delay redirection
        // until after local storage is confirmed to be set
        await new Promise(resolve => setTimeout(resolve, 100)); // Delay to ensure storage is set
        navigate('/'); // Navigate to the home page or dashboard
      }
    };

    handleToken();
  }, [location, navigate]);

  return null;
};

export default TokenHandler;
