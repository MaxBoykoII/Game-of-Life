"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var GameGrid = (function (_super) {
    __extends(GameGrid, _super);
    function GameGrid() {
        _super.apply(this, arguments);
    }
    GameGrid.prototype.render = function () {
        return (React.createElement("p", null, " React is working!"));
    };
    return GameGrid;
}(React.Component));
exports.GameGrid = GameGrid;
