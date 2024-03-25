import React from 'react';
import { Link } from 'react-router-dom';

const StartPage = () => {
  return (

    <div>
      <Link to="/login" className="btn-link">Login</Link>
      <Link to="/register" className="btn-link">Register</Link>
      <Link to="/game" className="btn-link">Play as Guest</Link>
    </div>
  );
}

export default StartPage;
