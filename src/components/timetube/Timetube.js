import React, { Component } from 'react';
import { Channel } from '../channel/Channel';
import { connect } from 'react-redux';
import { Search } from '../search/Search';
import { Player } from '../player/Player';
import './Timetube.css';
import { Toolbar } from '../toolbar/Toolbar';
import { setId } from "../../store/id/id.actions";
import { updateUi } from "../../store/ui/ui.actions";
import { getId } from "../../store/id/id.selectors";
import { getSelected } from "../../store/timetubes/timetubes.selectors";
import { getAccessToken, getLoggedIn } from "../../store/me/me.selectors";
import { getPlaying } from "../../store/player/player.selectors";
import { getQuery } from "../../store/query/query.selectors";
import { getUI } from "../../store/ui/ui.selectors";
import { fetchVideos } from "../../store/timetubes/timetubes.actions";
import { updatePlaying } from "../../store/player/player.actions";
import { store } from "../../store";
import { Friends } from "../friends/Friends";
import { arrayFromObject } from "../../utils/array-from-object";

const mapStateToProps = (state) => {
	return {
		id: getId(state),
		timetube: getSelected(state),
		isLoggedIn: getLoggedIn(state),
		accessToken: getAccessToken(state),
		activeVideoId: getPlaying(state),
		query: getQuery(state),
		ui: getUI(state)
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		setId: (id) => dispatch(setId(id)),
		updateUi: (keyValue) => dispatch(updateUi(keyValue)),
		updatePlaying: (videoId) => dispatch(updatePlaying(videoId))
	}
};

export class DisconnectedTimetube extends Component {
	setId(id = this.getTimetubeId()) {
		if (id) {
			this.props.setId(id);
		}
	}

	checkLoginStatus() {
		if (!this.props.isLoggedIn) {
			return this.props.history.push('/');
		}
		return true;
	}

	getTimetubeId() {
		return this.props.id || this.props.match.params.timetubeId;
	}

	componentDidMount() {
		console.log('timetube did mount', this.getTimetubeId());
		this.update();
	}

	update(id) {
		if(this.checkLoginStatus()) {
			this.setId(id);
			this.fetchVideos(id);
		}
	}

	/**
	 *
	 * @param props
	 * @param id
	 * @returns {*|boolean}
	 */
	shouldFetch(id) {
		return id && id !== this.getTimetubeId();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		this.update(snapshot);
	}

	getSnapshotBeforeUpdate(props, state) {
		return this.props.match.params.timetubeId;
	}

	fetchVideos(id = this.getTimetubeId()) {
		if (this.shouldFetch(id)) {
			store.dispatch(fetchVideos(id, this.props.accessToken));
		}

	}

	getVideoIds() {
		return arrayFromObject(this.props.timetube.videos, 'keys');
	}

	currentVideoIndex() {
		return this.getVideoIds().indexOf(this.props.activeVideoId);
	}

	nextVideo() {
		return this.getVideoIds()[ this.currentVideoIndex() + 1 ] || this.getVideoIds()[ 0 ];
	}

	previousVideo() {
		const currentIndex = this.currentVideoIndex();
		const ids = this.getVideoIds();
		return currentIndex === 0 ? ids[ ids.length - 1 ] : ids[ currentIndex - 1 ];
	}

	playNext() {
		return () => {
			this.props.updatePlaying(this.nextVideo());
		}
	}

	playPrevious() {
		return () => {
			this.props.updatePlaying(this.previousVideo());
		}
	}

	youtubePlayer() {
		if (this.props.isLoggedIn) {
			return <Player videoId={this.props.activeVideoId} next={this.playNext()} previous={this.playPrevious()}/>;
		}
	}

	render() {
		return <div className="Timetube">
			{this.youtubePlayer()}
			<Search />
			<Channel />
			<Toolbar />
			<Friends />
		</div>
	}
}

export const Timetube = connect(mapStateToProps, mapDispatchToProps)(DisconnectedTimetube);