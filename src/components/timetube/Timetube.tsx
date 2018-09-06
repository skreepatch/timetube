import * as React from 'react';
import { Component } from "react";
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { setId } from "../../store/id/id.actions";
import { UserId } from "../../store/id/id.reducers";
import { getId } from "../../store/id/id.selectors";
import { getAccessToken, getLoggedIn } from "../../store/me/me.selectors";
import { updatePlaying } from "../../store/player/player.actions";
import { getPlaying } from "../../store/player/player.selectors";
import { IQueryState } from "../../store/query/query.reducers";
import { getQuery } from "../../store/query/query.selectors";
import { IRootState } from "../../store/rootReducer";
import { fetchVideos } from "../../store/timetubes/timetubes.actions";
import { ITimetube } from "../../store/timetubes/timetubes.reducers";
import { getSelected } from "../../store/timetubes/timetubes.selectors";
import { IUiPlayloadType, updateUi } from "../../store/ui/ui.actions";
import { IUiState } from "../../store/ui/ui.reducers";
import { getUI } from "../../store/ui/ui.selectors";
import { arrayFromObject } from "../../utils/array-from-object";
import { Channel } from '../channel/Channel';
import { Player } from '../player/Player';
import { Search } from '../search/Search';
import { Toolbar } from '../toolbar/Toolbar';
import './Timetube.css';

export interface ITimetubeProps {
	accessToken: string,
	activeVideoId: string;
	id: UserId;
	isLoggedIn: boolean;
	query: IQueryState;
	timetube: ITimetube;
	ui: IUiState;
	setId: any;
	updatePlaying: any;
	updateUi: any;
	fetchVideos: any;
	history?: any;
	match: any;
}

const mapStateToProps = (state: IRootState) => {
	return {
		accessToken: getAccessToken(state),
		activeVideoId: getPlaying(state),
		id: getId(state),
		isLoggedIn: getLoggedIn(state),
		query: getQuery(state),
		timetube: getSelected(state),
		ui: getUI(state)
	}
};

const mapDispatchToProps = (dispatch: Dispatch | any) => {
	return {
		fetchVideos: (id: UserId, accessToken: string) => dispatch(fetchVideos(id, accessToken)),
		setId: (id: UserId) => dispatch(setId(id)),
		updatePlaying: (videoId: string) => dispatch(updatePlaying(videoId)),
		updateUi: (keyValue: IUiPlayloadType) => dispatch(updateUi(keyValue))
	}
};

export class DisconnectedTimetube extends Component<ITimetubeProps> {
	protected subscriptions: any[] = [];

	public componentDidMount() {
		this.subscriptions.push(this.props.history.listen( this.onRouteChange() ));
		this.update(this.getIdFromRoute());
	}

	public componentWillUnmount() {
		if (this.subscriptions.length) {
			this.subscriptions.forEach( (subscription) => subscription());
		}
	}

	public render() {
		return <div className="Timetube">
			{ this.youTubePlayer() }
			<Search />
			<Channel />
			<Toolbar />
		</div>
	}

	private youTubePlayer() {
		if (this.props.id && this.props.isLoggedIn) {
			return <Player videoId={this.props.activeVideoId} next={this.playNext()} previous={this.playPrevious()}/>
		} else {
			return null;
		}
	}

	private update(id: UserId) {
		if(this.checkLoginStatus()) {
			if (this.shouldFetch(id)) {
				this.fetchVideos(id);
				this.setId(id);
			}
		}
	}

	/**
	 *
	 * @param props
	 * @param id
	 * @returns {*|boolean}
	 */
	private shouldFetch(id: UserId) {
		return id && id !== this.props.id;
	}

	private fetchVideos(id = this.getIdFromRoute()): void {
		this.props.fetchVideos(id, this.props.accessToken, {});
	}

	private getVideoIds() {
		return arrayFromObject(this.props.timetube.videos, 'keys');
	}

	private currentVideoIndex() {
		return this.getVideoIds().indexOf(this.props.activeVideoId);
	}

	private nextVideo() {
		return this.getVideoIds()[ this.currentVideoIndex() + 1 ] || this.getVideoIds()[ 0 ];
	}

	private previousVideo() {
		const currentIndex = this.currentVideoIndex();
		const ids = this.getVideoIds();
		return currentIndex === 0 ? ids[ ids.length - 1 ] : ids[ currentIndex - 1 ];
	}

	private playNext() {
		return () => {
			this.props.updatePlaying(this.nextVideo());
		}
	}

	private playPrevious() {
		return () => {
			this.props.updatePlaying(this.previousVideo());
		}
	}

	private checkLoginStatus() {
		if (!this.props.isLoggedIn) {
			return this.props.history.push('/');
		}
		return true;
	}

	private getIdFromRoute(): UserId {
		return this.props.match.params.timetubeId;
	}

	private setId(id = this.getIdFromRoute()) {
		if (id) {
			this.props.setId(id);
		}
	}

	private onRouteChange() {
		return (route: any) => {
			const timetubeId = route.pathname.split('/').pop();
			this.update(timetubeId);
		}
	}
}

export const Timetube = connect(mapStateToProps, mapDispatchToProps)(DisconnectedTimetube);