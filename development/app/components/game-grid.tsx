import * as React from 'react';

import * as _ from 'lodash';

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


const testGrid = new Grid(30, 40);
testGrid.initialize(0.57);

export class GameGrid extends React.Component < any, any > {
    constructor() {
        super();
        this.state = {
            grid: testGrid,
            xLim: 30,
            yLim: 40,
            generations: 0
        };
    }
    _buildTableRows() {
        /* Helper to build table rows from the cells of this.state.grid */

        let lis = [];

        for (let i = 1, xLim= this.state.xLim; i <= xLim; i++) {
            let row = [];
            for (let j = 1, yLim = this.state.yLim, grid = this.state.grid; j <= yLim; j++) {
                const cell = _.find(grid.cells, (cell: CellInterface) => cell.x === i && cell.y === j);
                const color = (cell.state === State.Alive) ? ((cell.inchoate) ? '#8aa1f9' : '#4166F5') : 'black';
                const style = {
                    backgroundColor: color
                };
                const index = grid.cells.indexOf(cell);
                row.push({
                    style,
                    index
                });
            }
            lis.push(row.map(({
                style,
                index
            }) => <td key={index} style={style}></td>));
        }
        return lis;
    }
    update() {
        const grid = this.state.grid.update();
        this.setState({
            grid,
            generations: grid.generations
        });
    }
    componentDidMount() {
        setInterval(() => {
            this.update()
        }, 125);
    }
    render() {
        return (<table>
            <caption>{this.state.generations}</caption>
            <tbody>
                {this._buildTableRows().map((row, i) => { const id = `row${i}`;
                return <tr key={id}>{row}</tr>
                })}
            </tbody>
        </table>);
    }
}