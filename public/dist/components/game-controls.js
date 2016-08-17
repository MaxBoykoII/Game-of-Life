"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var SpeedControls = (function (_super) {
    __extends(SpeedControls, _super);
    function SpeedControls() {
        _super.apply(this, arguments);
    }
    SpeedControls.prototype.render = function () {
        return (React.createElement("div", null, React.createElement("button", {className: 'btn btn-primary'}, "Slow"), React.createElement("button", {className: 'btn btn-primary'}, "Mild"), React.createElement("button", {className: 'btn btn-primary'}, "Fast")));
    };
    return SpeedControls;
}(React.Component));
exports.SpeedControls = SpeedControls;
