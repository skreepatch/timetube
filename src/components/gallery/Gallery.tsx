import * as React from 'react';
import { Component } from 'react';
import { ITimetubeVideo } from "../../utils/video";
import { ClockLoader } from '../clockLoader/ClockLoader';
import { Thumbnail } from '../thumbnail/Thumbnail';
import './Gallery.css';

export interface IGalleryProps {
	showLoader: boolean;
	videos: ITimetubeVideo[];
}

export class Gallery extends Component<IGalleryProps> {
	public render() {
		return <div className="Gallery-wrapper">
			<div className="Gallery">
				<ClockLoader show={this.props.showLoader}/>
				{
					this.props.videos.map((video) => (
						<Thumbnail video={video} key={video.id}/>
					))
				}
			</div>
		</div>
	}
}