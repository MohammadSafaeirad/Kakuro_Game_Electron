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

import Grid from '../models/grids/grid.js';



const defaultPuzzle = 'basic1';
const presetPuzzles = [defaultPuzzle, 'basic2'];

class KakuroController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cells: props.cells,
            focusCell: {
                x: 0,
                y: 0,
                value: 0,
                columnData: { sum: 0, digits: [] },
                rowData: { sum: 0, digits: [] },
            },
            elapsedTime: 0,
            //interval: null,


        };

    }

    componentDidMount() {
        this.intervalRef = setInterval(() => {
            this.setState({ elapsedTime: this.state.elapsedTime + 1 });
        }, 1000);

    }

    componentWillUnmount() {
        clearInterval(this.intervalRef);
    }

    /**
     * @description Determine additional information regarding the given cell
     * @param {Number} x
     * @param {Number} y
     */
    setFocusCell(x, y) {
        const kakuro = new Kakuro(this.state.cells);
        const columnData = kakuro.retrieveColumnSumData(x, y);
        const rowData = kakuro.retrieveRowSumData(x, y);
        this.setState({
            focusCell: {
                x: x,
                y: y,
                value: this.state.cells[y][x],
                columnData: columnData,
                rowData: rowData
            }
        });
    }

    /**
     * @description Assign a value to a blank-cell
     * @param {Number} x
     * @param {Number} y
     * @param {Number} value
     */
    updateCellValue(x, y, value) {
        if (Grid.isFilledCell(this.state.cells[y][x])) {
            console.warn(`Cannot modify filled cell at x=${x}, y=${y}`);
            return;
        }
        this.state.cells[y][x] = value;
        this.setState({ cells: this.state.cells });
    }

    render() {
        return (
            <div className="kakuro">
                <div className="kakuro-controller">
                    <GridComponent
                        cells={this.state.cells}
                        setFocusCell={this.setFocusCell.bind(this)}
                        updateCellValue={this.updateCellValue.bind(this)}
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

        //this.state.interval && clearInterval(this.state.interval);

        if (this.intervalRef) {
            clearInterval(this.intervalRef);


        }

        const kakuro = new Kakuro(this.state.cells);
        const { invalidDownSums, invalidRightSums } = kakuro.validateSolution();
        if (invalidDownSums.length === 0 && invalidRightSums.length === 0) {
            // alert('The solution is valid');
            console.log('The solution is valid');
            toast.success('The solution is valid and you took ' + this.state.elapsedTime + ' seconds to solve it!');
        } else {
            // alert('The solution is invalid');
            console.log('The solution is invalid');
            toast.error('The solution is invalid and you took ' + this.state.elapsedTime + ' seconds to try to solve it!');
        }


    }

    render() {
        return (
            <div class="kakuro">
                <div class="kakuro-controller">
                    {this.state.elapsedTime}
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
                <input type="button" value="Check Solution" onClick={this.validateSolution.bind(this)} />
            </div>
        );
    }
}


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
