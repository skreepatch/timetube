import React, { Component } from 'react';
import { Thumbnail } from '../thumbnail/Thumbnail';
import { ClockLoader } from '../clockLoader/ClockLoader';
import './Gallery.css';

export class Gallery extends Component {
    render() {
        return <div className="Gallery-wrapper">
            <div className="Gallery">
                <ClockLoader show={this.props.showLoader} />
                {
                    this.props.videos.map((video) => (
                        <Thumbnail video={video} key={video.id} />
                    ))
                }
            </div>
        </div>
    }
}