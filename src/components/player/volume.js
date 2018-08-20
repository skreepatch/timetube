import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateVolume } from '../../actions/index';

const mapStateToProps = (state) => {
    return {
        volume: state.volume
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateVolume: (value) => dispatch(updateVolume(value))
    }
}

class connectedVolume extends Component {

    volumeStyle() {
        return {
            width: `${this.props.volume}%`
        }
    }

    updateVolume(e) {
        const eventX = e.clientX;
        const box = e.currentTarget.getBoundingClientRect();
        const percent = eventX / box.width;
        this.props.updateVolume(percent);
    }

    render() {
        return <div className="volume-component">
            <div className="volume-wrapper">
                <div className="volume-meter" style={this.volumeStyle()} onClick={this.updateVolume}></div>
            </div>
        </div>
    }
}

const Volume = connect(mapStateToProps, mapDispatchToProps)(connectedVolume);

export default Volume;