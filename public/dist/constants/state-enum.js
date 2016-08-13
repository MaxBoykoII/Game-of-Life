"use strict";
var State;
(function (State) {
    State[State["Alive"] = 0] = "Alive";
    State[State["Dead"] = 1] = "Dead";
    State[State["Pending"] = 2] = "Pending";
})(State || (State = {}));
exports.State = State;
;