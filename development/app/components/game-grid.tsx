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




const testGrid = new Grid(40, 40);
testGrid.initialize(0.60);
console.time('first time test');
testGrid.update();
console.timeEnd('first time test');

export class GameGrid extends React.Component < any, any > {
    constructor() {
        super();
        this.state = {
            grid: null,
            xLim: 40,
            yLim: 40,
            generations: 0,
            speed: 0,
            threshold: 0.50
        };
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
    componentWillMount() {
        const grid = new Grid(this.state.xLim, this.state.yLim);
        grid.initialize(this.state.threshold);
        this.setState({
            grid
        });
    }
    componentDidMount() {

        setInterval(() => {
            this.update()
        }, this.state.speed);
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