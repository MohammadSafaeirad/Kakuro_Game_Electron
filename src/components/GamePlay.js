import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GamePlay.css'; // Assuming you have or will create a CSS file for styling

const GamePlay = () => {
  const navigate = useNavigate();

  const handlePuzzleSelection = (level) => {
    
    navigate(`/game/${level}`);
  };

  return (
    <div className="gameplay-container">
      
      <p>Choose your difficulty level to get started:</p>
      <div className="levels-container">
        <button onClick={() => handlePuzzleSelection('beginner')}>Beginner</button>
        <button onClick={() => handlePuzzleSelection('intermediate')}>Intermediate</button>
        <button onClick={() => handlePuzzleSelection('expert')}>Expert</button>
      </div>
    </div>
  );
};

export default GamePlay;
