import React, { Component } from 'react';
import classNames from 'class-names';
import './ClockLoader.css';

class ClockLoader extends Component {
    render() {
        const classes = classNames("Clock-loader-overlay", {
            show: this.props.show
        });
        return <div className={classes}>
            <div className="Clock-loader"></div>
            </div>
    }
}

export default ClockLoader;