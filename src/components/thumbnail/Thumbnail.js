import React, { Component } from 'react';
import { store } from '../../store/index';
import { updatePlaying } from "../../store/player/player.actions";
import './Thumbnail.css';

export class Thumbnail extends Component {

	constructor() {
		super();

		this.state = {ready: false};
		this.imageRef = React.createRef();
	}

	componentDidMount() {
		this.preloadImage();
	}

	setPlaying() {
		return () => {
			store.dispatch(updatePlaying(this.props.video.videoId));
		}
	}

	preloadImage() {
		this.imageRef.current.onload = () => {
			this.setState({ ready: true });
		};
		this.imageRef.current.src = this.props.video.thumbnail;
	}

	render() {
		const video = this.props.video;
		const imageClass = this.state.ready ? 'ready' : 'loading';

		return <div className="Thumbnail"
					key={video.id}
					onClick={this.setPlaying()}>
			<img className={imageClass} ref={this.imageRef} alt={video.message}/>
			<div className="Thumbnail-title">{video.name}</div>
		</div>
	}
}
