import {
    State
}
from '../constants/state-enum';

import {CellInterface} from '../interfaces/cell-interface';

export class Cell implements CellInterface {
    x: number;
    y: number;
    inchoate: boolean;
    state: State;
    neighbors: Array<any>;
    liveNeighbors: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.state = State.Dead;
        this.neighbors = [];
        this.inchoate = false;
        this.liveNeighbors = 0;
    }

}