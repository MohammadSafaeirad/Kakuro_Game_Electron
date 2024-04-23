import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CellDetails from './CellDetails';
import GridComponent from './grid/Grid.js';
import GeneratedGrid from '../models/grids/generatedGrid.js';
import PresetGrid from '../models/grids/presetGrid.js';
import './KakuroController.css';
import GridCache from '../models/gridCache.js';
import Kakuro from '../models/kakuro/kakuro.js';
import { toast } from 'react-toastify';


const defaultPuzzle = 'basic1';
const presetPuzzles = [defaultPuzzle, 'basic2'];

class KakuroController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cells: props.cells || [],
            focusCell: { columnData: null, rowData: null }, // Default value
        };
    }

    setFocusCell = (x, y) => {
        // Simplified focus cell logic. Adjust according to your actual implementation.
        this.setState({ focusCell: { x, y } });
    }

    updateCellValue = (x, y, value) => {
        // Simplified cell update logic. Adjust as needed.
        const newCells = this.state.cells.slice();
        console.log({ x, y, value, newCells, old: newCells?.[y]?.[x] })

        if (newCells[y] && typeof newCells?.[y]?.[x] === 'string') {
            // alert('Cell is already filled');
            newCells[y][x] = value;
            console.log({ newCells })
            this.setState({ cells: newCells });
        }
    }

    render() {
        return (
            <div className="kakuro">
                <div className="kakuro-controller">
                    <GridComponent
                        cells={this.state.cells}
                        setFocusCell={this.setFocusCell}
                        updateCellValue={this.updateCellValue}
                    />
                    {this.state.focusCell && <CellDetails focusCell={this.state.focusCell} />}
                </div>
                {this.props.goBack && <button onClick={this.props.goBack} className="go-back-button">Go Back</button>}
            </div>
        );
    }

    /**
     * @description Check that all sums in the grid are valid
     */
    validateSolution() {
        const kakuro = new Kakuro(this.state.cells);
        const { invalidDownSums, invalidRightSums } = kakuro.validateSolution();
        if (invalidDownSums.length === 0 && invalidRightSums.length === 0) {
            // alert('The solution is valid');
            console.log('The solution is valid');
            toast.success('The solution is valid');
        } else {
            // alert('The solution is invalid');
            console.log('The solution is invalid');
            toast.error('The solution is invalid');
        }
    }

    render() {
        return (
            <div class="kakuro">
                <div class="kakuro-controller">
                    <GridComponent
                        cells={this.state.cells}
                        setFocusCell={this.setFocusCell.bind(this)}
                        updateCellValue={this.updateCellValue.bind(this)}
                    />
                </div>
                <CellDetails
                    focusCell={this.state.focusCell}
                    updateCellValue={this.updateCellValue.bind(this)}
                />
                {<input type="button" value="Check Solution" onClick={this.validateSolution.bind(this)} />}
            </div>
        );
    }
}

// function fetchGridData(seed) {
//     if (presetPuzzles.includes(seed)) {
//         const presetGrid = new PresetGrid(seed); // Ensure PresetGrid handles this correctly
//         return presetGrid.getCells();
//     } else {
//         const generatedGrid = new GeneratedGrid(); // Adjust as necessary for your GeneratedGrid
//         return generatedGrid.getCells(seed); // Assuming it can handle dynamic seeds
//     }
// }

function fetchGridData(seed) {
    const cache = new GridCache(localStorage); // Create a new cache

    if (presetPuzzles.includes(seed)) {
        const presetGrid = new PresetGrid(seed); // Ensure PresetGrid handles this correctly
        return presetGrid.getCells();
    } else {
        const generatedGrid = new GeneratedGrid(cache); // Pass the cache to GeneratedGrid
        return generatedGrid.getCells(seed); // Assuming it can handle dynamic seeds
    }
}


function KakuroControllerWrapper() {
    const navigate = useNavigate();
    const { puzzleSeed } = useParams();
    const cells = fetchGridData(puzzleSeed || defaultPuzzle);

    return <KakuroController cells={cells} goBack={() => navigate(-1)} />;
}

export default KakuroControllerWrapper;
