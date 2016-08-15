"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var state_enum_1 = require('../constants/state-enum');
var GameCell = (function (_super) {
    __extends(GameCell, _super);
    function GameCell() {
        _super.apply(this, arguments);
    }
    GameCell.prototype.render = function () {
        var alive = this.props.cell.state;
        var inchoate = this.props.cell.inchoate;
        return (React.createElement("td", {className: (alive === state_enum_1.State.Alive) ? (inchoate ? 'newborn' : 'old') : ''}));
    };
    return GameCell;
}(React.Component));
exports.GameCell = GameCell;
