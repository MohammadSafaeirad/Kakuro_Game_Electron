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
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import StartPage from './components/StartPage';
import Login from './components/Login';
import Register from './components/Register';
import KakuroController from './components/KakuroController';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="app-header">
            
          <Link className="nav-button" to="/">Home</Link>
          <Link className="nav-button" to="/login">Login</Link>
          <Link className="nav-button" to="/register">Register</Link>
          <Link className="nav-button" to="/game">Play as a Guest</Link>
        </header>
        <h1>Welcome to Kakuro Puzzle Game!</h1>
          <p>Play, learn, and challenge your mind!</p>
        <nav className="navbar">
          
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/game" element={<KakuroController />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

