"use strict";
var state_enum_1 = require('../constants/state-enum');
var Cell = (function () {
    function Cell(x, y) {
        this.neighbors = [];
        this.x = x;
        this.y = y;
        this.state = state_enum_1.State.Dead;
        this.nextState = state_enum_1.State.Pending;
        this.neighbors = [];
    }
    return Cell;
}());
exports.Cell = Cell;
