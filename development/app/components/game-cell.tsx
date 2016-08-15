import * as React from 'react';
import {State } from '../constants/state-enum';

export class GameCell extends React.Component <any, any> {
    render() {
        const alive = this.props.cell.state;
        const inchoate = this.props.cell.inchoate;
        return (<td className = {(alive === State.Alive) ? (inchoate ? 'newborn' : 'old') : ''}></td>);
    }
}