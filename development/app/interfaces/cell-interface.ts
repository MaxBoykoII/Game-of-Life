import {State} from '../constants/state-enum';

interface CellInterface {
    x: number;
    y: number;
    inchoate: boolean;
    state: State;
    nextState: State;
    neighbors: any[];
}

/* TODO add a more precise type for neighbors */

export {CellInterface};