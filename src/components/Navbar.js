import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { currentUser } from '../services/auth';

function Navbar({ user }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    // Clear token from localStorage
    localStorage.removeItem('token');
    // Force page reload to reflect logout state
    window.location.reload();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            My App
          </Link>
        </Typography>
        {user ? (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              {user.picture ? (
                <Avatar alt={user.name} src={user.picture} />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem>{user.name}</MenuItem>
              <MenuItem>{user.email}</MenuItem>
              <MenuItem>{user.verified_email ? "Verified" : "Not Verified"}</MenuItem>
              <MenuItem>{user.given_name} {user.family_name}</MenuItem>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              <MenuItem>
                <Link
                  to={{ 
                    pathname: "/articles/manage/" + user.id,
                    // search: `?user_id=${user.id}` // Pass user id as query parameter
                  }}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Manage Articles
                </Link>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Link to="/signin" style={{ color: 'inherit', textDecoration: 'none' }}>
            <Typography variant="h6">Sign In</Typography>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
