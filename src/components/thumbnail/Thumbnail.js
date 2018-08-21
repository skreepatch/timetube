import React, {Component} from 'react';
import { store } from '../../store/index';
import { updatePlaying } from '../../actions/index';
import './Thumbnail.css';

export class Thumbnail extends Component {
    setPlaying() {
        return () => {
            store.dispatch(updatePlaying(this.props.video.videoId));
        }
    }
    render() {
        const video = this.props.video;
        const style = {
            backgroundImage: `url(${video.thumbnail})`
        }
        return <div className="Thumbnail" 
        style={style}
        key={video.id} 
        onClick={this.setPlaying()}
        >
            <div className="Thumbnail-title">{video.name}</div>
        </div>
    }
}
