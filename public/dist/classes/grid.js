"use strict";
var _ = require('lodash');
var cell_1 = require('./cell');
var state_enum_1 = require('../constants/state-enum');
var neighbor_1 = require('../modules/neighbor');
var Grid = (function () {
    function Grid(xLim, yLim) {
        this.xLim = xLim;
        this.yLim = yLim;
        this.cells = [];
        this.generations = 0;
    }
    Grid.prototype.getNeighbors = function (x, y) {
        var center = [x, y];
        var limits = [this.xLim, this.yLim];
        return neighbor_1.getNeighbors(center, limits);
    };
    Grid.prototype.initialize = function (threshold) {
        for (var i = 1; i <= this.xLim; i++) {
            for (var j = 1; j <= this.yLim; j++) {
                var x = i;
                var y = j;
                var cell = new cell_1.Cell(x, y);
                cell.neighbors = this.getNeighbors(x, y);
                this.cells.push(cell);
            }
        }
        for (var _i = 0, _a = this.cells; _i < _a.length; _i++) {
            var cell = _a[_i];
            if (Math.random() > threshold) {
                cell.state = state_enum_1.State.Alive;
            }
        }
    };
    Grid.prototype._gameRules = function (cell, liveNeighbors) {
        if (cell.state === state_enum_1.State.Alive) {
            if (liveNeighbors < 2 || liveNeighbors > 3) {
                cell.nextState = state_enum_1.State.Dead;
            }
            else {
                cell.nextState = state_enum_1.State.Alive;
            }
        }
        else {
            if (liveNeighbors === 3) {
                cell.nextState = state_enum_1.State.Alive;
            }
            else {
                cell.nextState = state_enum_1.State.Dead;
            }
        }
    };
    Grid.prototype._getLiveNeighbors = function (cell) {
        var liveNeighbors = 0;
        var _loop_1 = function(x, y) {
            var neighboringCell = _.find(this_1.cells, function (cell) { return cell.x === x && cell.y === y; });
            if (neighboringCell.state === state_enum_1.State.Alive) {
                ++liveNeighbors;
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = cell.neighbors; _i < _a.length; _i++) {
            var _b = _a[_i], x = _b[0], y = _b[1];
            _loop_1(x, y);
        }
        return liveNeighbors;
    };
    Grid.prototype.update = function () {
        ++this.generations;
        console.log(this.generations);
        for (var _i = 0, _a = this.cells; _i < _a.length; _i++) {
            var cell = _a[_i];
            var liveNeighbors = this._getLiveNeighbors(cell);
            this._gameRules(cell, liveNeighbors);
        }
        for (var _b = 0, _c = this.cells; _b < _c.length; _b++) {
            var cell = _c[_b];
            cell.state = cell.nextState;
            cell.nextState = state_enum_1.State.Pending;
        }
        console.log(this.cells);
    };
    return Grid;
}());
exports.Grid = Grid;
