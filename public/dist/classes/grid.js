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
                cell.inchoate = true;
            }
        }
    };
    Grid.prototype._gameRules = function (cell) {
        if (cell.state === state_enum_1.State.Alive) {
            cell.inchoate = false;
            var liveNeighbors = 0;
            var _loop_1 = function(x, y) {
                var neighboringCell = _.find(this_1.cells, function (cell) { return cell.x === x && cell.y === y; });
                if (neighboringCell.state === state_enum_1.State.Alive) {
                    ++liveNeighbors;
                    if (liveNeighbors > 3) {
                        cell.nextState = state_enum_1.State.Dead;
                        return { value: void 0 };
                    }
                }
            };
            var this_1 = this;
            for (var _i = 0, _a = cell.neighbors; _i < _a.length; _i++) {
                var _b = _a[_i], x = _b[0], y = _b[1];
                var state_1 = _loop_1(x, y);
                if (typeof state_1 === "object") return state_1.value;
            }
            cell.nextState = (liveNeighbors < 2) ? state_enum_1.State.Dead : state_enum_1.State.Alive;
        }
        else {
            var liveNeighbors = 0;
            var _loop_2 = function(x, y) {
                var neighboringCell = _.find(this_2.cells, function (cell) { return cell.x === x && cell.y === y; });
                if (neighboringCell.state === state_enum_1.State.Alive) {
                    ++liveNeighbors;
                    if (liveNeighbors > 3) {
                        cell.nextState = state_enum_1.State.Dead;
                        return { value: void 0 };
                    }
                }
            };
            var this_2 = this;
            for (var _c = 0, _d = cell.neighbors; _c < _d.length; _c++) {
                var _e = _d[_c], x = _e[0], y = _e[1];
                var state_2 = _loop_2(x, y);
                if (typeof state_2 === "object") return state_2.value;
            }
            cell.nextState = (liveNeighbors < 3) ? state_enum_1.State.Dead : state_enum_1.State.Alive;
            cell.inchoate = (liveNeighbors < 3) ? false : true;
        }
    };
    Grid.prototype.update = function () {
        ++this.generations;
        for (var _i = 0, _a = this.cells; _i < _a.length; _i++) {
            var cell = _a[_i];
            this._gameRules(cell);
        }
        for (var _b = 0, _c = this.cells; _b < _c.length; _b++) {
            var cell = _c[_b];
            cell.state = cell.nextState;
            cell.nextState = state_enum_1.State.Pending;
        }
        return this;
    };
    return Grid;
}());
exports.Grid = Grid;
