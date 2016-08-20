"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var speed_enum_1 = require('../constants/speed-enum');
var SpeedControls = (function (_super) {
    __extends(SpeedControls, _super);
    function SpeedControls() {
        _super.apply(this, arguments);
    }
    SpeedControls.prototype.updateSpeed = function (speed) {
        this.props.speedCallback(speed);
        console.log("I was called with speed: " + speed_enum_1.Speed[speed]);
    };
    SpeedControls.prototype.testMethod = function () {
        console.log('yep, I work!');
    };
    SpeedControls.prototype.render = function () {
        return (React.createElement("div", null, React.createElement("button", {className: 'btn btn-primary', onClick: this.updateSpeed.bind(this, speed_enum_1.Speed.Slow)}, "Slow"), React.createElement("button", {className: 'btn btn-primary', onClick: this.updateSpeed.bind(this, speed_enum_1.Speed.Mild)}, "Mild"), React.createElement("button", {className: 'btn btn-primary', onClick: this.updateSpeed.bind(this, speed_enum_1.Speed.Fast)}, "Fast")));
    };
    return SpeedControls;
}(React.Component));
exports.SpeedControls = SpeedControls;
