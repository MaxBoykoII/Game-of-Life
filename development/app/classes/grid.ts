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
    getNeighbors
}
from '../modules/neighbor';

export class Grid {
    xLim: number;
    yLim: number;
    cells: Cell[];
    generations: number;
    constructor(xLim: number, yLim: number) {
        this.xLim = xLim;
        this.yLim = yLim;
        this.cells = [];
        this.generations = 0;
    }
    getNeighbors(x, y) {
        /* Helper function that computes the neighbors of a cell */
        const center = [x, y];
        const limits = [this.xLim, this.yLim];

        return getNeighbors(center, limits);
    }
    initialize(threshold: number) {
        /*Build Grid*/
        for (let i = 1; i <= this.xLim; i++) {
            for (let j = 1; j <= this.yLim; j++) {
                const x = i;
                const y = j;
                let cell = new Cell(x, y);
                cell.neighbors = this.getNeighbors(x, y);
                this.cells.push(cell);
            }
        }

        /*Build Start seed*/
        for (let cell of this.cells) {
            if (Math.random() > threshold) {
                cell.state = State.Alive;
                cell.inchoate = true;
            }
        }
    }
    _gameRules(cell) {
        /* Method for applying game rules to particular cell */
        if (cell.state === State.Alive) {
            /* A cell alive for the last turn is no longer new */
            cell.inchoate = false;

            let liveNeighbors = 0;
            for (let [x, y] of cell.neighbors) {
                const neighboringCell = _.find(this.cells, (cell) => cell.x === x && cell.y === y);
                if (neighboringCell.state === State.Alive) {
                    ++liveNeighbors;
                    if (liveNeighbors > 3) {
                        cell.nextState = State.Dead;
                        return;
                    }
                }
            }
            cell.nextState = (liveNeighbors < 2) ? State.Dead : State.Alive;
        }
        else {
            let liveNeighbors = 0;
            for (let [x, y] of cell.neighbors) {
                const neighboringCell = _.find(this.cells, (cell) => cell.x === x && cell.y === y);
                if (neighboringCell.state === State.Alive) {
                    ++liveNeighbors;
                    if (liveNeighbors > 3) {
                        cell.nextState = State.Dead;
                        return;
                    }
                }
            }
            cell.nextState = (liveNeighbors < 3) ? State.Dead : State.Alive;
            cell.inchoate = (liveNeighbors < 3) ? false : true;
        }

    }
    update() {
        /* Update the generations */
        ++this.generations;

        /* Apply game logic to each cell */
        for (let cell of this.cells) {
            this._gameRules(cell);
        }
        for (let cell of this.cells) {
            cell.state = cell.nextState;
            cell.nextState = State.Pending;
        }
        return this;
    }
}