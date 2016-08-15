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
        this.rows = [];
        this.generations = 0;
    }
    Grid.prototype.getNeighbors = function (cell) {
        var _this = this;
        var center = [cell.x, cell.y];
        var limits = [this.xLim, this.yLim];
        return neighbor_1.neighborhood(center, limits).map(function (_a) {
            var x = _a[0], y = _a[1];
            return _.find(_this.cells, function (cell) { return cell.x === x && cell.y === y; });
        });
    };
    Grid.prototype.initialize = function (threshold) {
        for (var j = 1, yLim = this.yLim; j <= yLim; j++) {
            for (var i = 1, xLim = this.xLim; i <= xLim; i++) {
                var cell = new cell_1.Cell(i, j);
                this.cells.push(cell);
            }
        }
        for (var _i = 0, _a = this.cells; _i < _a.length; _i++) {
            var cell = _a[_i];
            cell.neighbors = this.getNeighbors(cell);
            if (Math.random() > threshold) {
                cell.state = state_enum_1.State.Alive;
                cell.inchoate = true;
                _.each(cell.neighbors, function (neighbor) { return ++neighbor.liveNeighbors; });
            }
        }
        this.rows = _.chunk(this.cells, this.xLim);
        console.log(this.rows);
    };
    Grid.prototype._gameRules = function (cell) {
        if (cell.state === state_enum_1.State.Alive) {
            cell.inchoate = false;
            cell.state = (cell.liveNeighbors === 2 || cell.liveNeighbors === 3) ? state_enum_1.State.Alive : state_enum_1.State.Dead;
        }
        else if (cell.liveNeighbors === 3) {
            cell.state = state_enum_1.State.Alive;
            cell.inchoate = true;
        }
        cell.liveNeighbors = 0;
    };
    Grid.prototype.update = function () {
        var _this = this;
        ++this.generations;
        for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            _.each(row, function (cell) { return _this._gameRules(cell); });
        }
        for (var _b = 0, _c = this.rows; _b < _c.length; _b++) {
            var row = _c[_b];
            for (var _d = 0, row_1 = row; _d < row_1.length; _d++) {
                var cell = row_1[_d];
                if (cell.state === state_enum_1.State.Alive) {
                    _.each(cell.neighbors, function (neighbor) { return ++neighbor.liveNeighbors; });
                }
            }
        }
        return this;
    };
    return Grid;
}());
exports.Grid = Grid;
