import {State} from '../constants/state-enum';

interface CellInterface {
    x: number;
    y: number;
    inchoate: boolean;
    state: State;
    neighbors: any[];
    liveNeighbors: number;
}

/* TODO add a more precise type for neighbors */

export {CellInterface};