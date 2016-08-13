import {
    Grid
}
from './classes/grid';

const testGrid = new Grid(30, 40);
testGrid.initialize(0.75);
testGrid.update();
