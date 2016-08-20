import * as React from 'react';

import * as _ from 'lodash';

import {
    Cell
}
from '../classes/cell';

import {
    Grid
}
from '../classes/grid';

import {
    CellInterface
}
from '../interfaces/cell-interface';

import {
    State
}
from '../constants/state-enum';

import {
    Speed
}
from '../constants/speed-enum';

import {
    SpeedControls
}
from './game-controls';



const testGrid = new Grid(70, 50);
testGrid.initialize(0.60);
console.time('first time test');
testGrid.update();
console.timeEnd('first time test');

export class GameGrid extends React.Component < any, any > {
    private _timer;
    constructor() {
        super();
        this.state = {
            grid: null,
            xLim: 50,
            yLim: 30,
            generations: 0,
            speed: 100,
            threshold: 0.50
        };
    }
    newCellState(index) {
        /* Update state of a cell */

        const grid: Grid = this.state.grid;
        const cells: Cell[] = _.flatten(grid.rows);
        const cell: Cell = cells[index];

        if (cell.state === State.Dead) {
            cell.state = State.Alive;
            cell.inchoate = true;
        }
        else {
            cell.state = State.Dead;
            cell.inchoate = false;
        }
        this.setState({
            grid
        });
    }
    _buildTableRows() {
        /* Helper to build table rows from the cells of this.state.grid */

        let lis = [];

        for (let j = 1, yLim = this.state.yLim, grid = this.state.grid; j <= yLim; j++) {
            let rowData = [];
            const row = grid.rows[j - 1];
            for (let cell of row) {
                const color = (cell.state === State.Alive) ? ((cell.inchoate) ? '#8aa1f9' : '#4166F5') : '';
                const style = {
                    backgroundColor: color
                };
                const index = grid.cells.indexOf(cell);
                rowData.push({
                    style,
                    index
                });
            }
            lis.push(rowData.map(({
                style,
                index
            }) => <td key={index} style={style} onClick={this.newCellState.bind(this, index)} ></td>));
        }
        return lis;
    }

    updateGrid() {
        const grid = this.state.grid.update();
        this.setState({
            grid,
            generations: grid.generations
        });
    }
    updateSpeed(speed: Speed) {
        let newSpeed;
        switch (speed) {
            case Speed.Slow:
                newSpeed = 200;
                break;
            case Speed.Mild:
                newSpeed = 100;
                break;
            case Speed.Fast:
                newSpeed = 40;
                break;
        }
        
        this.setState({
            speed: newSpeed
        });
        clearInterval(this._timer);
           this._timer = setInterval(() => {
            this.updateGrid()
        }, newSpeed);
    }
    componentWillMount() {
        const grid = new Grid(this.state.xLim, this.state.yLim);
        grid.initialize(this.state.threshold);
        this.setState({
            grid
        });
    }
    componentDidMount() {
        this._timer = setInterval(() => {
            this.updateGrid()
        }, this.state.speed);
    }
    render() {
        return (<div><table>
            <caption>{this.state.generations}</caption>
            <tbody>
                {this._buildTableRows().map((row, i) => { const id = `row${i}`;
                return <tr key={id}>{row}</tr>
                })}
            </tbody>
        </table>
        <SpeedControls speedCallback = {this.updateSpeed.bind(this)}/>
        </div>);
    }
}