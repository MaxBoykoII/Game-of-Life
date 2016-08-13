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
    nextState: State;
    neighbors: Array<any>;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.state = State.Dead;
        this.nextState = State.Pending;
        this.neighbors = [];
        this.inchoate = false;
    }

}