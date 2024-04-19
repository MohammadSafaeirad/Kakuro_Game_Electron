// MainGame.js
import React, { useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';

import GeneratedGrid from './models/grids/generatedGrid.js';
import GridCache from './models/gridCache.js';
import Home from './components/Home.js';
import KakuroController from './components/KakuroController.js';

const sizes = [4, 8, 16];
const PRESEED_COUNT = 3;

function MainGame() {
    const navigate = useNavigate();
    const cache = new GridCache(localStorage);

    // Map grids by size, then prepopulate seeds in case there isn't enough seeds
    const generatedGrids = GridCache.mapGridsBySize(localStorage);
    for (const size of sizes) {
        const seeds = generatedGrids[size] || [];
        while (seeds.length < PRESEED_COUNT) {
            const grid = new GeneratedGrid(cache, size);
            grid.generateGrid();
            const seed = grid.getSeed();
            seeds.push(seed);
        }
    }

    const [grids, setGrids] = useState(generatedGrids);
    const [seedListSizes, setSeedListSizes] = useState([]);

    // Generate a new seed on the spot & navigate
    const generatePuzzle = (size = 4) => {
        const grid = new GeneratedGrid(cache, size);
        grid.generateGrid();
        const seed = grid.getSeed();
        navigate(`/puzzle/${seed}`);
    };

    // Toggle function to show/omit seeds by size
    const toggleSeedListSize = (size) => {
        const list = seedListSizes.slice();
        const index = list.indexOf(size);
        if (index === -1) {
            list.push(size);
        } else {
            list.splice(index, 1);
        }
        setSeedListSizes(list);
    };

    return (
        <div className="main-game-container">
            <div className="directory">
                <div id="basic1"><Link to="/puzzle/basic1">Beginner</Link></div>
                <div id="basic2"><Link to="/puzzle/basic2">Intermediate</Link></div>
                {sizes.map((size) => (
                    <div key={`random${size}`} id={`random${size}`}>
                        <button onClick={() => generatePuzzle(size)}>Random {size}x{size} Puzzle</button>
                    </div>
                ))}
            </div>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/puzzle/:puzzleSeed" element={<KakuroController key={window.location.pathname} cache={cache} />} />
            </Routes>

            <div className="generated-grids">
                <span className="title">Grids</span>
                {Object.entries(grids).map(([size, seedList]) => {
                    const showSeeds = seedListSizes.includes(size);
                    return (
                        <div key={size} className="subgroup">
                            <div className="subtitle" onClick={() => toggleSeedListSize(size)}>
                                <span>{size} x {size}</span>
                                <div className="subtitle-arrow">
                                    <i className={showSeeds ? "arrow down" : "arrow right"} />
                                </div>
                            </div>
                            {showSeeds && seedList.map((seed) => (
                                <div key={seed} className="seed"><Link to={`/puzzle/${seed}`}>{seed}</Link></div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MainGame;
