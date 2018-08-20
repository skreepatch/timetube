import React, {Component} from 'react';
import Store from '../../store/index';
import { updatePlaying } from '../../actions/index';
import './Thumbnail.css';

class Thumbnail extends Component {
    setPlaying() {
        Store.dispatch(updatePlaying(this.props.video.videoId));
    }
    render() {
        const video = this.props.video;
        const style = {
            backgroundImage: `url(${video.thumbnail})`
        }
        return <div className="Thumbnail" 
        style={style}
        key={video.id} 
        onClick={this.setPlaying.bind(this)} 
        >
            <div className="Thumbnail-title">{video.name}</div>
        </div>
    }
}

export default Thumbnail;