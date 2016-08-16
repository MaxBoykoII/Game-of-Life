"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var grid_1 = require('../classes/grid');
var state_enum_1 = require('../constants/state-enum');
var testGrid = new grid_1.Grid(40, 40);
testGrid.initialize(0.60);
console.time('first time test');
testGrid.update();
console.timeEnd('first time test');
var GameGrid = (function (_super) {
    __extends(GameGrid, _super);
    function GameGrid() {
        _super.call(this);
        this.state = {
            grid: null,
            xLim: 40,
            yLim: 40,
            generations: 0,
            speed: 0,
            threshold: 0.50
        };
    }
    GameGrid.prototype._buildTableRows = function () {
        var lis = [];
        for (var j = 1, yLim = this.state.yLim, grid = this.state.grid; j <= yLim; j++) {
            var rowData = [];
            var row = grid.rows[j - 1];
            for (var _i = 0, row_1 = row; _i < row_1.length; _i++) {
                var cell = row_1[_i];
                var color = (cell.state === state_enum_1.State.Alive) ? ((cell.inchoate) ? '#8aa1f9' : '#4166F5') : '';
                var style = {
                    backgroundColor: color
                };
                var index = grid.cells.indexOf(cell);
                rowData.push({
                    style: style,
                    index: index
                });
            }
            lis.push(rowData.map(function (_a) {
                var style = _a.style, index = _a.index;
                return React.createElement("td", {key: index, style: style});
            }));
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
    GameGrid.prototype.componentWillMount = function () {
        var grid = new grid_1.Grid(this.state.xLim, this.state.yLim);
        grid.initialize(this.state.threshold);
        this.setState({
            grid: grid
        });
    };
    GameGrid.prototype.componentDidMount = function () {
        var _this = this;
        setInterval(function () {
            _this.update();
        }, this.state.speed);
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
