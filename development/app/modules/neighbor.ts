import {
    directions,
    test_limits,
    test_center,
    threshold
}
from '../constants/game-constants';



function displace(x, y, center = test_center, limits = test_limits) {
    let xcord = x + center[0],
        ycord = y + center[1];
    if (xcord === 0) {
        xcord = limits[0];
    }
    else if (xcord === limits[0] + 1) {
        xcord = 1;
    }
    if (ycord === 0) {
        ycord = limits[1];
    }
    else if (ycord === limits[1] + 1) {
        ycord = 1;
    }
    return [xcord, ycord];
}

function getNeighbors(center, limits = test_limits) {
    let neighbors = [];
    for (let dir of directions) {
        neighbors.push(displace(dir[0], dir[1], center, limits));
    }
    return neighbors;
}



export {
    getNeighbors,
};
