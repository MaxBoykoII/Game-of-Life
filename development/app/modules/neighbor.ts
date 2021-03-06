const directions = [
        [-1, -1],
        [0, -1],
        [1, -1],
        [1, 0],
        [1, 1],
        [0, 1],
        [-1, 1],
        [-1, 0],
    ]



function displace(x, y, center, limits) {
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

function neighborhood(center, limits) {
    let neighbors = [];
    for (let dir of directions) {
        neighbors.push(displace(dir[0], dir[1], center, limits));
    }
    return neighbors;
}



export {
    neighborhood,
};
