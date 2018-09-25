import * as React from 'react';
import { Component } from "react";
import { connect } from 'react-redux';
import { saveToLocalStorage } from "../../providers/localStorage/localStorage.provider";
import { getId } from "../../store/id/id.selectors";
import { getMe } from "../../store/me/me.selectors";
import { getSearchterm } from "../../store/query/query.selectors";
import { getSelected } from "../../store/timetubes/timetubes.selectors";
import { arrayFromObject } from "../../utils/array-from-object";
import { sortByDate } from "../../utils/video";
import { Gallery } from '../gallery/Gallery';
import './Channel.css';


export interface IChannelProps {
	id: string;
	me: any;
	searchTerm: string;
	timetube: any
}

const mapStateToProps = (state: any): IChannelProps => {
	return {
		id: getId(state),
		me: getMe(state),
        searchTerm: getSearchterm(state),
		timetube: getSelected(state) || {}
	}
};

export class DisconnectedChannel extends Component<IChannelProps> {

    public render() {
        return <div className="Channel">
            <Gallery
                videos={this.videosCollection()}
                showLoader={this.props.timetube.fetching}/>
        </div>
    }

	private filterBySearch(videos: any[]) {
		return videos.filter(this.filterVideo.bind(this));
	}

	private filterVideo(video: any) {
		const searchString = (video.message + video.description + video.name).toLowerCase();
		return searchString ? searchString.indexOf(this.props.searchTerm) > -1 : false;
	}


	private saveToLocalStorage() {
		saveToLocalStorage(this.props.id, this.props.timetube);
	}

	private videosCollection() {
		if (!this.props.timetube) {
			return [];
		}
		const videosCollection = arrayFromObject(this.props.timetube.videos, "values");
		const videos = this.props.searchTerm ? this.filterBySearch(videosCollection) : videosCollection;
		if (!videos || videos.length === 0) {
			return [];
		}

		this.saveToLocalStorage();

		return sortByDate(videos, 'created_time');
	}
}

export const Channel = connect(mapStateToProps)(DisconnectedChannel);