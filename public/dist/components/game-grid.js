"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var _ = require('lodash');
var grid_1 = require('../classes/grid');
var state_enum_1 = require('../constants/state-enum');
var testGrid = new grid_1.Grid(50, 70);
testGrid.initialize(0.60);
console.time('first time test');
testGrid.update();
console.timeEnd('first time test');
var GameGrid = (function (_super) {
    __extends(GameGrid, _super);
    function GameGrid() {
        _super.call(this);
        this.state = {
            grid: testGrid,
            xLim: 50,
            yLim: 70,
            generations: 0
        };
    }
    GameGrid.prototype._buildTableRows = function () {
        var lis = [];
        var _loop_1 = function(j, yLim, grid) {
            var row = [];
            var _loop_2 = function(i, xLim) {
                var cell = _.find(grid.cells, function (cell) { return cell.x === i && cell.y === j; });
                var color = (cell.state === state_enum_1.State.Alive) ? ((cell.inchoate) ? '#8aa1f9' : '#4166F5') : 'black';
                var style = {
                    backgroundColor: color
                };
                var index = grid.cells.indexOf(cell);
                row.push({
                    style: style,
                    index: index
                });
            };
            for (var i = 1, xLim = this_1.state.xLim; i <= xLim; i++) {
                _loop_2(i, xLim);
            }
            lis.push(row.map(function (_a) {
                var style = _a.style, index = _a.index;
                return React.createElement("td", {key: index, style: style});
            }));
        };
        var this_1 = this;
        for (var j = 1, yLim = this.state.yLim, grid = this.state.grid; j <= yLim; j++) {
            _loop_1(j, yLim, grid);
        }
        return lis;
    };
    GameGrid.prototype.update = function () {
        var grid = this.state.grid.update();
        this.setState({
            grid: grid,
            generations: grid.generations
        });
    };
    GameGrid.prototype.componentDidMount = function () {
        var _this = this;
        setInterval(function () {
            _this.update();
        }, 40);
    };
    GameGrid.prototype.render = function () {
        return (React.createElement("table", null, React.createElement("caption", null, this.state.generations), React.createElement("tbody", null, this._buildTableRows().map(function (row, i) {
            var id = "row" + i;
            return React.createElement("tr", {key: id}, row);
        }))));
    };
    return GameGrid;
}(React.Component));
exports.GameGrid = GameGrid;
