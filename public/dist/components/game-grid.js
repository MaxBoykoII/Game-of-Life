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
var speed_enum_1 = require('../constants/speed-enum');
var game_controls_1 = require('./game-controls');
var testGrid = new grid_1.Grid(70, 50);
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
            xLim: 50,
            yLim: 30,
            generations: 0,
            speed: 100,
            threshold: 0.50
        };
    }
    GameGrid.prototype.newCellState = function (index) {
        var grid = this.state.grid;
        var cells = _.flatten(grid.rows);
        var cell = cells[index];
        if (cell.state === state_enum_1.State.Dead) {
            cell.state = state_enum_1.State.Alive;
            cell.inchoate = true;
        }
        else {
            cell.state = state_enum_1.State.Dead;
            cell.inchoate = false;
        }
        this.setState({
            grid: grid
        });
    };
    GameGrid.prototype._buildTableRows = function () {
        var _this = this;
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
                return React.createElement("td", {key: index, style: style, onClick: _this.newCellState.bind(_this, index)});
            }));
        }
        return lis;
    };
    GameGrid.prototype.updateGrid = function () {
        var grid = this.state.grid.update();
        this.setState({
            grid: grid,
            generations: grid.generations
        });
    };
    GameGrid.prototype.updateSpeed = function (speed) {
        var _this = this;
        var newSpeed;
        switch (speed) {
            case speed_enum_1.Speed.Slow:
                newSpeed = 200;
                break;
            case speed_enum_1.Speed.Mild:
                newSpeed = 100;
                break;
            case speed_enum_1.Speed.Fast:
                newSpeed = 40;
                break;
        }
        this.setState({
            speed: newSpeed
        });
        clearInterval(this._timer);
        this._timer = setInterval(function () {
            _this.updateGrid();
        }, newSpeed);
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
        this._timer = setInterval(function () {
            _this.updateGrid();
        }, this.state.speed);
    };
    GameGrid.prototype.render = function () {
        return (React.createElement("div", null, React.createElement("table", null, React.createElement("caption", null, this.state.generations), React.createElement("tbody", null, this._buildTableRows().map(function (row, i) {
            var id = "row" + i;
            return React.createElement("tr", {key: id}, row);
        }))), React.createElement(game_controls_1.SpeedControls, {speedCallback: this.updateSpeed.bind(this)})));
    };
    return GameGrid;
}(React.Component));
exports.GameGrid = GameGrid;
