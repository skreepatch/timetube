import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getId } from "../../store/id/id.selectors";
import { getSelected } from "../../store/timetubes/timetubes.selectors";
import { getSearchterm } from "../../store/query/query.selectors";
import { Gallery } from '../gallery/Gallery';
import './Channel.css';
import { getMe } from "../../store/me/me.selectors";
import { arrayFromObject } from "../../utils/array-from-object";
import { saveToLocalStorage } from "../../providers/localStorage/localStorage.provider";
import { sortByKey } from "../../utils/video";

const mapStateToProps = (state) => {
	return {
		id: getId(state),
		me: getMe(state),
		timetube: getSelected(state) || {},
		searchTerm: getSearchterm(state)
	}
};

//TODO: fancy, we need to discus about decorators. They sometimes come at a cost of not knowing what is happening and harder build

export class DisconnectedChannel extends Component {
	filterBySearch(videos) {
		return videos.filter(this.filterVideo.bind(this));
	}

	filterVideo(video) {
		const searchString = (video.message + video.description + video.name).toLowerCase();
		return searchString ? searchString.indexOf(this.props.searchTerm) > -1 : false;
	}

	//TODO: You have a lot of contact points that you save things to local storage. We need to think if we want a middleware to do this. Since it will decouple the logic from the view
	saveToLocalStorage() {
		saveToLocalStorage(this.props.id, this.props.timetube);
	}

	videosCollection() {
		if (!this.props.timetube) {
			return [];
		}
		const videosCollection = arrayFromObject(this.props.timetube.videos, "values");
		const videos = this.props.searchTerm ? this.filterBySearch(videosCollection) : videosCollection;
		if (!videos || videos.length === 0) {
			return [];
		}

		this.saveToLocalStorage();

		return sortByKey(videos, 'created_time');
	}

	render() {
		return <div className="Channel">
			<Gallery
				videos={this.videosCollection()}
				showLoader={this.props.timetube.fetching}/>
		</div>
	}
}

export const Channel = connect(mapStateToProps)(DisconnectedChannel);