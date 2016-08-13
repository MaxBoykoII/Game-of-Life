"use strict";
var ReactDOM = require('react-dom');
var React = require('react');
var game_grid_1 = require('./components/game-grid');
console.log(game_grid_1.GameGrid);
ReactDOM.render(React.createElement(game_grid_1.GameGrid, null), document.getElementById('grid-container'));
