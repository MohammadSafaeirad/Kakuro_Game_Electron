import { BLANK_CELL, NUM_DIGITS } from '../../common/constants.js';
import Grid from './grid.js';
import { v4 as uuid } from 'uuid';

function deepCopy(input) {
    return JSON.parse(JSON.stringify(input));
}

class GeneratedGrid extends Grid {
    /**
     * @param {Number} size [4, 8, 16]
     */
    constructor(cache, size = 4) {
        super();
        this._cache = cache;
        this._size = size;
        this.cells = [];
        this.solution = [];
    }

    /**
     * @description Generate blank 2-D array
     * @param {Number} size
     * @returns {Array<Array>}
     */
    generateBlankGrid(size) {
        const cells = [];
        for (let y = 0; y <= size; y += 1) {
            const row = [];
            for (let x = 0; x <= size; x += 1) {
                if (y === 0 || x === 0) {
                    row.push(super.generateBlankCell());
                    continue;
                }
                row.push('');
            }
            cells.push(row);
        }
        return cells;
    }

    /**
     * @description Retrieve cells from locally-stored grid data, or generate a new one
     * @returns {Array<Array>}
     */
    getCells(seed) {
        if (this._cache.contains(seed)) {
            const gridData = this._cache.get(seed);
            this.cells = super.parseGridData(gridData);
            return this.cells;
        }
        console.warn(`Seed, ${seed}, was not found; generating a random 4x4`);
        return this.generateGrid();
    }

    /**
     * @description Create 2-D array, with randomly generated down/right sum numbers
     * @returns {Array<Array>}
     */
    generateGrid() {
        this.generateSolution();
        this.generateHints();
        this.solution = deepCopy(this.cells);
        console.log(this.solution);

        this.emptyBlankCells();
        return this.cells;
    }

    /**
     * @description Fill 2-D array with combinations & blank-cells (represent borders between sets)
     *              Output goes to internal 'cells' class variable
     */
    generateSolution() {
        this.cells = this.generateBlankGrid(this._size);
        for (let y = 1; y <= this._size; y += 1) {
            let x = 0;
            while (x < this._size) {
                const step = this.computeStep(x);
                x += 1;

                const digits = this.generateCombination(x, y, step);
                if (step === 1 || digits.length === 1) {
                    this.cells[y][x] = super.generateBlankCell();
                } else {
                    for (const value of digits) {
                        this.cells[y][x] = value;
                        x += 1;
                    }
                    if (x <= this._size) {
                        this.cells[y][x] = super.generateBlankCell();
                    }
                }
            }
        }

    }

    /**
     * @description Determine a random number, the max value is the number of digits (9)
     *              or the difference between the grid-size & offset
     * @param {Number} offset
     * @returns {Number}
     */
    computeStep(offset = 0) {
        const maxStep = Math.min(NUM_DIGITS, this._size - offset);
        return Math.max(1, Math.ceil(Math.random() * maxStep));
    }

    /**
     * @description Generate a combination of random digits to fill a grid row
     *              digits selected are dependent on existing ones in a given column
     * @param {Number} x
     * @param {Number} y
     * @param {Number} size
     * @returns {Array<Number>}
     */
    generateCombination(x = 1, y = 1, size = 2) {
        const digits = [];
        const pool = Array.from({ length: NUM_DIGITS }, (_, i) => i + 1);
        for (let i = 0; i < size; i += 1) {
            // Reduce pool of digits to use based on vertical digits
            const columnDigits = this.getColumnDigits(x + i, y - 1);
            for (const digit of columnDigits) {
                const idx = pool.indexOf(digit);
                if (idx > -1) {
                    pool.splice(idx, 1);
                }
            }

            // If no more digits can be assigned, terminate generation
            if (pool.length === 0) {
                break;
            }

            // Pick a random digit from the pool & add to combination
            const digitIdx = Math.min(pool.length - 1, Math.floor(Math.random() * pool.length - 1));
            const digit = pool.splice(digitIdx, 1)[0];
            digits.push(digit);
        }
        return digits;
    }

    /**
     * @description Fetch digits in a vertical orientation
     * @param {Number} x
     * @param {Number} y
     * @returns {Array<Number>}
     */
    getColumnDigits(x = 1, y = 1) {
        const digits = [];
        const column = this.cells.map((r) => r[x]);
        for (let i = y; i > 0; i -= 1) {
            const cell = column[i];
            if (Grid.isFilledCell(cell)) {
                break;
            }
            digits.push(cell);
        }
        for (let i = y + 1; i <= this._size; i += 1) {
            const cell = column[i];
            if (Grid.isFilledCell(cell)) {
                break;
            }
            if (cell) {
                digits.push(cell);
            }
        }
        return digits;
    }

    /**
     * @description Fetch digits in a horizontal orientation
     * @param {Number} x
     * @param {Number} y
     * @returns {Array<Number>}
     */
    getRowDigits(x = 1, y = 1) {
        const digits = [];
        const row = this.cells[y];
        for (let i = x; i > 0; i -= 1) {
            const cell = row[i];
            if (Grid.isFilledCell(cell)) {
                break;
            }
            digits.push(cell);
        }
        for (let i = x + 1; i <= this._size; i += 1) {
            const cell = row[i];
            if (Grid.isFilledCell(cell)) {
                break;
            }
            if (cell) {
                digits.push(cell);
            }
        }
        return digits;
    }

    /**
     * @description Compute vertical/horizontal hints for the grid
     *              Note: If a row/column consists of only one digit; no hint is generated
     *              Updates the 'cells' variable that is internal
     */
    generateHints() {
        for (let y = 0; y <= this._size; y += 1) {
            for (let x = 0; x <= this._size; x += 1) {
                if (!Grid.isFilledCell(this.cells[y][x])) {
                    continue;
                }
                if (y < this._size && !Grid.isFilledCell(this.cells[y + 1][x])) {
                    const digits = this.getColumnDigits(x, y + 1);
                    if (digits.length > 1) {
                        const sum = digits.reduce((sum, d) => sum + d, 0);
                        this.cells[y][x][0] = sum;
                    }

                }
                if (x < this._size && !Grid.isFilledCell(this.cells[y][x + 1])) {
                    const digits = this.getRowDigits(x + 1, y);
                    if (digits.length > 1) {
                        const sum = digits.reduce((sum, d) => sum + d, 0);
                        this.cells[y][x][1] = sum;
                    }
                }
            }
        }
    }

    /**
     * @description Short all cell values after the hints are generated
     *              Updates the 'cells' variable that is internal
     */
    emptyBlankCells() {
        for (let y = 1; y <= this._size; y += 1) {
            for (let x = 1; x <= this._size; x += 1) {
                if (Grid.isFilledCell(this.cells[y][x])) {
                    continue;
                }
                this.cells[y][x] = '';
            }
        }
    }

    /**
     * @description Convert 2-D array into string representation
     * @returns {String}
     */
    stringify() {
        return this.cells
            .map((row) => {
                return row
                    .map((cell) => {
                        if (Grid.isFilledCell(cell)) {
                            if (cell[0] && cell[1]) {
                                return cell.join('/');
                            } else if (cell[0] && !cell[1]) {
                                return `${cell[0]}/`;
                            } else if (!cell[0] && cell[1]) {
                                return `/${cell[1]}`;
                            }
                            return BLANK_CELL;
                        }
                        return cell;
                    })
                    .join(',');
            })
            .join('\n');
    }

    /**
     * @description Check if the grid is stored in local-storage (check for existing key)
     *              before generating a new key to store it under
     * @param {String} gridData
     * @returns {String}
     */
    generateKey(gridData) {
        // Check local storage if the grid was already saved
        const existingKey = this._cache.findKey(gridData);
        if (existingKey) {
            return this._cache.get(existingKey);
        }

        // Assign an id for a new grid & store locally
        const newKey = uuid().split('-')[0];
        this._cache.set(newKey, gridData);
        return newKey;
    }

    /**
     * @description Generate a unique ID to regenerate a given arrangement
     * @returns {String}
     */
    getSeed() {
        const gridData = this.stringify();
        const seed = this.generateKey(gridData);
        return seed;
    }
}

export default GeneratedGrid;
