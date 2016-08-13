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
var testGrid = new grid_1.Grid(30, 40);
testGrid.initialize(0.92);
var GameGrid = (function (_super) {
    __extends(GameGrid, _super);
    function GameGrid() {
        _super.call(this);
        this.state = {
            grid: testGrid,
            xLim: 30,
            yLim: 40
        };
    }
    GameGrid.prototype.buildTableRows = function () {
        console.log('tyring to build rows!');
        var lis = [];
        var _loop_1 = function(i) {
            var row = [];
            var _loop_2 = function(j) {
                var cell = _.find(this_1.state.grid.cells, function (cell) { return cell.x === i && cell.y === j; });
                var color = (cell.state === state_enum_1.State.Alive) ? ((cell.inchoate) ? '#8aa1f9' : '#4166F5') : 'black';
                var style = {
                    backgroundColor: color
                };
                row.push(React.createElement("td", {style: style}));
            };
            for (var j = 1; j <= this_1.state.yLim; j++) {
                _loop_2(j);
            }
            lis.push(React.createElement("tr", null, row));
        };
        var this_1 = this;
        for (var i = 1; i <= this.state.xLim; i++) {
            _loop_1(i);
        }
        return lis;
    };
    GameGrid.prototype.update = function () {
        var grid = this.state.grid.update();
        this.setState({ grid: grid });
    };
    GameGrid.prototype.componentDidMount = function () {
        var _this = this;
        setInterval(function () { _this.update(); }, 2000);
    };
    GameGrid.prototype.render = function () {
        return (React.createElement("table", null, this.buildTableRows()));
    };
    return GameGrid;
}(React.Component));
exports.GameGrid = GameGrid;