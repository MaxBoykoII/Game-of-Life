import * as React from 'react';

import * as _ from 'lodash';

import {
    Grid
}
from '../classes/grid';

import {
    CellInterface
}
from '../interfaces/cell-interface';

import {
    State
}
from '../constants/state-enum';


const testGrid = new Grid(30, 40);
testGrid.initialize(0.92);

export class GameGrid extends React.Component < any, any > {
    constructor() {
        super();
        this.state ={
            grid: testGrid,
            xLim: 30,
            yLim: 40
        };
    }
    buildTableRows() {
        /* Helper to build table rows from the cells of this.state.grid */
        console.log('tyring to build rows!');
        
        let lis = [];

        for (let i = 1; i <= this.state.xLim; i++) {
            let row = [];
            for (let j = 1; j <= this.state.yLim; j++) {
                const cell = _.find(this.state.grid.cells, (cell: CellInterface) => cell.x === i && cell.y === j);
                const color = (cell.state === State.Alive) ? ((cell.inchoate) ? '#8aa1f9' : '#4166F5') : 'black';
                const style = {
                    backgroundColor: color
                };
                row.push(<td style={style}></td>);
            }
            lis.push(<tr>{row}</tr>);
        }
        return lis;
    }
    update(){
        const grid = this.state.grid.update();
        this.setState({grid});
    }
    componentDidMount() {
        setInterval(()=>{ this.update()}, 500);
    }
    render() {
        return (<table>{this.buildTableRows()}</table>);
    }
}