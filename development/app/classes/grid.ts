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
            }
        }
    }
    _gameRules(cell, liveNeighbors) {
        /* Method for applying game rules to particular cell */
        if (cell.state === State.Alive) {
            if (liveNeighbors < 2 || liveNeighbors > 3) {
                cell.nextState = State.Dead;
            }
            else {
                cell.nextState = State.Alive;
            }
        }
        else {
            if (liveNeighbors === 3) {
                cell.nextState = State.Alive;
            }
            else {
                cell.nextState = State.Dead;
            }
        }
    }
    _getLiveNeighbors(cell) {
        /* Method for counting how many live neighbors a cell has */

        let liveNeighbors = 0;
        for (let [x, y] of cell.neighbors) {
            const neighboringCell = _.find(this.cells, (cell) => cell.x === x && cell.y === y);
            if (neighboringCell.state === State.Alive) {
                ++liveNeighbors;
            }
        }
        return liveNeighbors;
    }
    update() {
        /* Update the generations */
        ++this.generations;
        console.log(this.generations);

        /* Apply game logic to each cell */
        for (let cell of this.cells) {
            const liveNeighbors = this._getLiveNeighbors(cell);
            this._gameRules(cell, liveNeighbors);
        }
        for (let cell of this.cells) {
            cell.state = cell.nextState;
            cell.nextState = State.Pending;
        }
    }
}