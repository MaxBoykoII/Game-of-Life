"use strict";
var state_enum_1 = require('../constants/state-enum');
var Cell = (function () {
    function Cell(x, y) {
        this.x = x;
        this.y = y;
        this.state = state_enum_1.State.Dead;
        this.nextState = state_enum_1.State.Pending;
        this.neighbors = [];
        this.inchoate = false;
    }
    return Cell;
}());
exports.Cell = Cell;
