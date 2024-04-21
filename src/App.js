// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import ArticleList from './components/ArticleList';
import ArticleDetails from './components/ArticleDetails';
import TokenHandler from './components/TokenHandler';
import ManageArticles from './components/ManageArticles';
import CreateArticle from './components/CreateArticle';
import { isUserSignedIn } from './services/auth';

const PrivateRoute = ({ children }) => {
  return isUserSignedIn() ? children : <Navigate to="/signin" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/token" element={<TokenHandler />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/articles/:id" element={<PrivateRoute><ArticleDetails /></PrivateRoute>} />
        <Route path="/articles" element={<PrivateRoute><ArticleList /></PrivateRoute>} />
        <Route path="/" element={<PrivateRoute><ArticleList /></PrivateRoute>} />
        <Route path="/articles/manage/:user_id" element={<PrivateRoute><ManageArticles /></PrivateRoute>} />
        <Route path="/create-article" element={<PrivateRoute><CreateArticle /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
