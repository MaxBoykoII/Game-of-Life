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
    generations: number;
    constructor(xLim: number, yLim: number) {
        this.xLim = xLim;
        this.yLim = yLim;
        this.cells = [];
        this.generations = 0;
    }
    getNeighbors(cell) {
        /* Helper function that computes the neighbors of a cell */
        const center = [cell.x, cell.y];
        const limits = [this.xLim, this.yLim];

        return neighborhood(center, limits).map(([x,y]) => _.find(this.cells, cell => cell.x === x && cell.y === y));
    }
    initialize(threshold: number) {
        /*Build Grid*/
        for (let i = 1, xLim = this.xLim; i <= xLim; i++) {
            for (let j = 1, yLim = this.yLim; j <= yLim; j++) {
                let cell = new Cell(i, j);
                this.cells.push(cell);
            }
        }
        console.log(this.cells.length);
        /*Build Start seed*/
        for (let cell of this.cells) {
            if (Math.random() > threshold) {
                cell.state = State.Alive;
                cell.inchoate = true;
            }
            cell.neighbors = this.getNeighbors(cell);
        }
        console.log(this.cells.filter(cell => cell.neighbors.length < 8));
    }
    _gameRules(cell) {
        /* Method for applying game rules to particular cell */
        if (cell.state === State.Alive) {
            /* A cell alive for the last turn is no longer new */
            cell.inchoate = false;

            let liveNeighbors = 0;
            for (let neighbor of cell.neighbors) {
                if (neighbor.state === State.Alive) {
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
            for (let neighbor of cell.neighbors) {
                if (neighbor.state === State.Alive) {
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