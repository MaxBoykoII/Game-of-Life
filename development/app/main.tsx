import {
    Grid
}
from './classes/grid';

import * as ReactDOM from 'react-dom';
import * as React from 'react';


import {
    GameGrid
}
from './components/game-grid';

//const testGrid = new Grid(30, 40);
//testGrid.initialize(0.75);
console.log(GameGrid);
ReactDOM.render(<GameGrid/>, document.getElementById('grid-container'));
