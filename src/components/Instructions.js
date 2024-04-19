// Instructions.js for children
import React from "react";
import "./Instructions.css"; // Make sure this CSS file includes styles that appeal to children

const Instructions = () => {
  return (
    <div className="instructions-container">
      <h2>Welcome to the Puzzle Adventure! 🌈</h2>
      <p>
        🚀 Get ready to embark on a thrilling journey through the world of
        Kakuro, a puzzle land filled with numbers, challenges, and tons of fun!
        Whether you're a puzzle wizard or just starting out, this adventure is
        perfect for you!
      </p>

      <h3>🔍 How to Play</h3>
      <ul>
        <li>
          <strong>Discover the Grid:</strong> Imagine a magical land where
          numbers fill the empty spaces of a puzzle. Your quest is to find the
          right numbers from 1 to 9 to complete the puzzle.
        </li>
        <li>
          <strong>Clues to Guide You:</strong> Look for treasure clues in small
          triangles. They tell you the sum of the numbers needed to complete
          each row or column.
        </li>
        <li>
          <strong>Exciting Rules:</strong>
        </li>
        <ul>
          <li>Rule 1: Numbers must add up to the treasure clue.</li>
          <li>
            Rule 2: No repeating numbers in any row or column. Be unique and
            shine!
          </li>
        </ul>
        <li>
          <strong>Begin Your Quest:</strong> Start with the easiest clues.
          They're your stepping stones to bigger adventures.
        </li>
        <li>
          <strong>Think Like a Wizard:</strong> Use your brain power to solve
          mysteries and unlock new paths.
        </li>
        <li>
          <strong>Enjoy the Journey:</strong> Take your time and enjoy every
          step of this magical journey.
        </li>
      </ul>

      <h3>🌟 Pro Tips</h3>
      <ul>
        <li>
          Patience is Your Shield: Take your time and think. The puzzle land
          doesn't like rushers!
        </li>
        <li>
          Practice Makes Perfect: The more puzzles you solve, the greater wizard
          you become.
        </li>
        <li>
          Magic Marks: Unsure about a number? Use magic marks to remember your
          guesses.
        </li>
        <li>
          Love the Adventure: Remember, it's all about having fun and enjoying
          the puzzles.
        </li>
      </ul>

      <p>
        🎉 Ready for the challenge? Jump into your first Kakuro puzzle and let
        the fun begin! With each puzzle you solve, you'll become the greatest
        Puzzle Wizard of all time! Happy puzzling! 🧩
      </p>
    </div>
  );
};

export default Instructions;
