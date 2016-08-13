import {
    State
}
from '../constants/state-enum';

export class Cell {
    x: number;
    y: number;
    state: State;
    nextState: State;
    neighbors = [];
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.state = State.Dead;
        this.nextState = State.Pending;
        this.neighbors = [];
    }

}