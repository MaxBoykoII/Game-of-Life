import * as React from 'react';

import {
    Speed
}
from '../constants/speed-enum';

export class SpeedControls extends React.Component < any, any > {
    render() {
        return (<div>
                <button className='btn btn-primary'>Slow</button>
                <button className='btn btn-primary'>Mild</button>
                <button className='btn btn-primary'>Fast</button>
                </div>);
    }
}