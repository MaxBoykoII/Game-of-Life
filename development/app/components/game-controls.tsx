import * as React from 'react';

import {
    Speed
}
from '../constants/speed-enum';

export class SpeedControls extends React.Component < any, any > {
    updateSpeed(speed: Speed){
        this.props.speedCallback(speed);
        console.log(`I was called with speed: ${Speed[speed]}`);
    }
    testMethod(){
        console.log('yep, I work!');
    }
    render() {
        return (<div>
                <button className='btn btn-primary' onClick={this.updateSpeed.bind(this, Speed.Slow)}>Slow</button>
                <button className='btn btn-primary' onClick={this.updateSpeed.bind(this, Speed.Mild)}>Mild</button>
                <button className='btn btn-primary' onClick={this.updateSpeed.bind(this, Speed.Fast)}>Fast</button>
                </div>);
    }
}