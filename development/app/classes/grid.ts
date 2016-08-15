import * as _ from 'lodash';

import {
    Cell
}
from './cell';

import {
    State
}
from '../constants/state-enum';

import {
    neighborhood
}
from '../modules/neighbor';

export class Grid {
    xLim: number;
    yLim: number;
    cells: Cell[];
    rows: Array < any > ;
    generations: number;
    constructor(xLim: number, yLim: number) {
        this.xLim = xLim;
        this.yLim = yLim;
        this.cells = [];
        this.rows = [];
        this.generations = 0;
    }
    getNeighbors(cell) {
        /* Helper function that computes the neighbors of a cell */
        const center = [cell.x, cell.y];
        const limits = [this.xLim, this.yLim];

        return neighborhood(center, limits).map(([x, y]) => _.find(this.cells, cell => cell.x === x && cell.y === y));
    }
    initialize(threshold: number) {
        /*Build Grid*/

        for (let j = 1, yLim = this.yLim; j <= yLim; j++) {
            for (let i = 1, xLim = this.xLim; i <= xLim; i++) {
                let cell = new Cell(i, j);
                this.cells.push(cell);
            }
        }

        /*Build Start seed*/
        for (let cell of this.cells) {
            cell.neighbors = this.getNeighbors(cell);

            if (Math.random() > threshold) {
                cell.state = State.Alive;
                cell.inchoate = true;
                _.each(cell.neighbors, neighbor => ++neighbor.liveNeighbors);
            }
        }
        this.rows = _.chunk(this.cells, this.xLim);
        console.log(this.rows);
    }
    _gameRules(cell) {
        /* Method for applying game rules to particular cell */
        if (cell.state === State.Alive) {
            cell.inchoate = false;
            if(cell.liveNeighbors < 2 || cell.liveNeighbors > 3){
                cell.state = State.Dead;
            }
        }
        else if (cell.liveNeighbors === 3) {
            cell.state = State.Alive;
            cell.inchoate = true;
        }
        /* Reset liveNeighbors to 0 */
        cell.liveNeighbors = 0;

    }
    update() {
        /* Update the generations */
        ++this.generations;

        /* Apply game logic to each cell in each row */
        for (let row of this.rows) {
            _.each(row, cell => this._gameRules(cell));
        }
        for (let row of this.rows) {
            for (let cell of row) {
                /* Each live cell updates its neighbors' live cell counts */
                if (cell.state === State.Alive) {
                    _.each(cell.neighbors, (neighbor) => ++neighbor.liveNeighbors)
                }
            }
        }
        return this;
    }
}