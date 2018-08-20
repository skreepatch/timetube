import React, { Component } from 'react';
import Thumbnail from '../thumbnail/Thumbnail';
import ClockLoader from '../clockLoader/ClockLoader';
import './Gallery.css';

class Gallery extends Component {
    render() {
        const videos = Array.from(this.props.videos.values());
        return <div className="Gallery-wrapper">
            <div className="Gallery">
                <ClockLoader show={this.props.fetching} />
                {
                    videos.map((video) => (
                        <Thumbnail video={video} key={video.id} />
                    ))
                }
            </div>
        </div>
    }
}

export default Gallery;