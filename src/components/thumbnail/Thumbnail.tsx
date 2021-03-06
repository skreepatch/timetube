import * as React from 'react';
import { Component, RefObject } from 'react';
import { store } from '../../store/index';
import { updatePlaying } from "../../store/player/player.actions";
import { ITimetubeVideo } from "../../utils/video";
import './Thumbnail.css';

export interface IThumbnailProps {
	video: ITimetubeVideo;
}

export interface IThumbnailState {
	ready: boolean;
}

export class Thumbnail extends Component<IThumbnailProps, IThumbnailState> {
	protected imageRef: RefObject<HTMLImageElement>;

	constructor(props: IThumbnailProps) {
		super(props);

		this.state = {ready: false};
		this.imageRef = React.createRef();
	}

	public componentDidMount() {
		this.preloadImage();
	}

	public render() {
		const video = this.props.video;
		const imageClass = this.state.ready ? 'ready' : 'loading';

		return <div className="Thumbnail"
					key={video.id}
					onClick={this.setPlaying()}>
			<img className={imageClass} ref={this.imageRef} alt={video.message}/>
			<div className="Thumbnail-title">{video.name}</div>
		</div>
	}

	private preloadImage() {
		if (this.imageRef.current){
			const current = this.imageRef.current;
			current.onload = () => {
				this.setState({ ready: true });
			};
			current.src = this.props.video.thumbnail;
		}
	}

	private setPlaying() {
		return () => {
			store.dispatch(updatePlaying(this.props.video.videoId));
		}
	}
}
