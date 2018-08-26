import React, { Component } from 'react';
import { Thumbnail } from '../thumbnail/Thumbnail';
import { ClockLoader } from '../clockLoader/ClockLoader';
import './Gallery.css';

export class Gallery extends Component {
    render() {
        //TODO: do you need to create every render a new array?
        const videos = Array.from(this.props.videos.values());
        return <div className="Gallery-wrapper">
            <div className="Gallery">
                <ClockLoader show={this.props.showLoader} />
                {
                    videos.map((video) => (
                        <Thumbnail video={video} key={video.id} />
                    ))
                }
            </div>
        </div>
    }
}