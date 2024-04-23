// // // CellDetails.js - main.js - App.js - KakuroController.js
// // import './App.css';

// // import React, { useState } from 'react';
// // import { BrowserRouter, Link, Routes, Route, HashRouter } from 'react-router-dom';

// // import GeneratedGrid from './models/grids/generatedGrid.js';
// // import GridCache from './models/gridCache.js';
// // import Home from './components/Home.js'
// // import KakuroController from './components/KakuroController.js';

// // const sizes = [4, 8, 16];
// // const PRESEED_COUNT = 3;

// // function App() {
// //     const cache = new GridCache(localStorage);

// //     // Map grids by size, then prepopulate seeds in case there isn't enough seeds
// //     const generatedGrids = GridCache.mapGridsBySize(localStorage);
// //     for (const size of sizes) {
// //         const seeds = generatedGrids[size] || [];
// //         while (seeds.length < PRESEED_COUNT) {
// //             const grid = new GeneratedGrid(cache, size);
// //             grid.generateGrid();
// //             const seed = grid.getSeed();
// //             seeds.push(seed);
// //         }
// //     }

// //     const [grids, setGrids] = useState(generatedGrids);
// //     const [seedListSizes, setSeedListSizes] = useState([]);

// //     // Generate a new seed on the spot & redirect
// //     const generatePuzzle = (size = 4) => {
// //         const grid = new GeneratedGrid(cache, size);
// //         grid.generateGrid();
// //         const seed = grid.getSeed();
// //         window.location.href = `/puzzle/${seed}`;
// //     };

// //     // Toggle function to show/omit seeds by size
// //     const toggleSeedListSize = (size) => {
// //         const list = seedListSizes.slice();
// //         const index = list.indexOf(size);
// //         if (index === -1) {
// //             // If entry does not exist, insert it
// //             list.push(size);
// //         } else {
// //             // If entry exists, remove it
// //             list.splice(index, 1);
// //         }
// //         setSeedListSizes(list);
// //     };

// //     return (
// //         //use hash Router
// //         <BrowserRouter>
// //             <div className="directory">
// //                 <div id="home"><Link to="/">Home</Link></div>
// //                 <div id="basic1"><Link to="/puzzle/basic1">Introductory Puzzle</Link></div>
// //                 <div id="basic2"><Link to="/puzzle/basic2">Easy 4x4 Puzzle</Link></div>
// //                 {/* {
// //                     sizes.map((size) => {
// //                         return (
// //                             <div id={`random${size}`}><a onClick={() => generatePuzzle(size)}>Random {size}x{size} Puzzle</a></div>
// //                         )
// //                     })
// //                 } */}
// //             </div>
// //             <Routes>
// //                 <Route path="/" element={<Home />} />
// //                 <Route path="/puzzle/:puzzleSeed" element={<KakuroController key={window.location.pathname} cache={cache} />} />
// //             </Routes>
// //             {/* <div className="generated-grids">
// //                 <span className="title">Grids</span>
// //                 {
// //                     Object.entries(grids).map(([size, seedList]) => {
// //                         const showSeeds = seedListSizes.includes(size);
// //                         return (
// //                             <div className="subgroup">
// //                                 <div className="subtitle" onClick={() => toggleSeedListSize(size)}>
// //                                     <span>{size} x {size}</span>
// //                                     <div className="subtitle-arrow"><i className={showSeeds ? "arrow down" : "arrow right"} /> </div>
// //                                 </div>
// //                                 {
// //                                     showSeeds && seedList.map((seed) => {
// //                                         const seedRoute = `/puzzle/${seed}`;
// //                                         return <div className="seed"><Link to={seedRoute}>{seed}</Link></div>
// //                                     })
// //                                 }
// //                             </div>
// //                         );
// //                     })
// //                 }
// //             </div> */}
// //         </BrowserRouter>
// //     );
// // }

// // export default App;


// // App.js
// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './App.css';

// import StartPage from './components/StartPage';
// import Login from './components/Login';
// import Register from './components/Register';
// import KakuroController from './components/KakuroController';

// function App() {
//   return (
//     <BrowserRouter>
//       <div className="app-container">
//         <header className="app-header">
//           <h1>Welcome to Kakuro Puzzle Game!</h1>
//           <p>Play, learn, and challenge your mind!</p>
//         </header>

//         <div className="content">
//           <Routes>
//             <Route path="/" element={<StartPage />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/game" element={<KakuroController />} />
//           </Routes>
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;
// App.js


//*************************************************************************************** */
// import React from 'react';
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './App.css';

// // Import your components
// import StartPage from './components/StartPage';
// import Login from './components/Login';
// import Register from './components/Register';
// import KakuroController from './components/KakuroController';
// import Instructions from './components/Instructions';
// import GamePlay from './components/GamePlay'; // Ensure this component is implemented
// import MainGame from './MainGame'; // Ensure this component is implemented

// function App() {
//   return (
//     <BrowserRouter>
//       <ToastContainer />
//       <div className="app-container">
//         <header className="app-header">
//           <Link id='home-nav' className="nav-button" to="/">Home</Link>
//           <div className='account'>
//             <Link className="nav-button" to="/login">Login</Link>
//             <Link className="nav-button" to="/register">Register</Link>
//             <Link className="nav-button" to="/game">Play as Guest</Link>
//             <Link className="nav-button" to="/instructions">Instructions</Link>
//           </div>
//         </header>
//         <h1>Kakuro Puzzle Game!</h1>
//         <p>Play, learn, and challenge your mind!</p>
//         <div className="content">
//           <Routes>
//             <Route path="/" element={<StartPage />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/game" element={<MainGame />} />
//             <Route path="/instructions" element={<Instructions />} />
//             <Route path="/gameplay" element={<GamePlay />} />
//             {/* Specific route for handling puzzles by seed */}
//             <Route path="/puzzle/:puzzleSeed" element={<KakuroController />} />
//           </Routes>
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Import your components
import StartPage from './components/StartPage';
import Login from './components/Login';
import Register from './components/Register';
import KakuroController from './components/KakuroController';
import Instructions from './components/Instructions';
import GamePlay from './components/GamePlay'; // Ensure this component is implemented
import MainGame from './MainGame'; // Ensure this component is implemented

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State variable for login status
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Check if user is already logged in on component mount
    const userEmailFromStorage = localStorage.getItem('userEmail');
    if (userEmailFromStorage) {
      setIsLoggedIn(true);
      setUserEmail(userEmailFromStorage);
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleLogin = (email) => {
    // Update state and local storage after successful login
    setIsLoggedIn(true);
    setUserEmail(email);
    localStorage.setItem('userEmail', email);
  };

  const handleLogout = () => {
    // Clear state and local storage on logout
    setIsLoggedIn(false);
    setUserEmail('');
    localStorage.removeItem('userEmail');
  };

  return (
    <BrowserRouter>
      <ToastContainer />
      <div className="app-container">
        <header className="app-header">
          <Link id='home-nav' className="nav-button" to="/">Home</Link>
          <div className='account'>
            {isLoggedIn ? (
              <>
                <span>Welcome, {userEmail}!</span>
                <button className="nav-button" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link className="nav-button" to="/login">Login</Link>
                <Link className="nav-button" to="/register">Register</Link>
              </>
            )}
            <Link className="nav-button" to="/game">Play as Guest</Link>
            <Link className="nav-button" to="/instructions">Instructions</Link>
          </div>
        </header>
        <h1>Kakuro Puzzle Game!</h1>
        <p>Play, learn, and challenge your mind!</p>
        <div className="content">
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/game" element={<MainGame />} />
            <Route path="/instructions" element={<Instructions />} />
            <Route path="/gameplay" element={<GamePlay />} />
            {/* Specific route for handling puzzles by seed */}
            <Route path="/puzzle/:puzzleSeed" element={<KakuroController />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;


