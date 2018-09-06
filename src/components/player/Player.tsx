import * as classNames from 'classnames';
import * as React from 'react';
import { Component, RefObject } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { initYouTubePlayer, PLAYER_STATUSES } from "../../providers/youtube/youtube.provider";
import { updatePlaying } from "../../store/player/player.actions";
import { getPlaying } from "../../store/player/player.selectors";
import { IRootState } from "../../store/rootReducer";
import { ITimetube } from "../../store/timetubes/timetubes.reducers";
import { getSelected } from "../../store/timetubes/timetubes.selectors";
import { IUiPlayloadType, updateUi } from "../../store/ui/ui.actions";
import { getPlayerReady } from "../../store/ui/ui.selectors";
import { ITimetubeVideo } from "../../utils/video";
import './Player.css';

export interface IPlayerProps {
	currentVideo: ITimetubeVideo;
	playing: string;
	ready: boolean;
	timetube: ITimetube;
	updatePlaying: any;
	updateUi: any;
	previous: any;
	next: any;
	videoId: string;
}

const currentVideo = (state: IRootState) => {
	const timetube = getSelected(state);
	const playing = getPlaying(state);
	if (timetube && playing) {
		return timetube.videos[playing];
	}
	return null;
};

const mapStateToProps = (state: IRootState) => ({
	currentVideo: currentVideo(state),
	playing: getPlaying(state),
	ready: getPlayerReady(state),
	timetube: getSelected(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	updatePlaying: (id: string) => dispatch(updatePlaying(id)),
	updateUi: (update: IUiPlayloadType) => dispatch(updateUi(update))
});

export class DisconnectedPlayer extends Component<IPlayerProps> {

	public player: any;

	protected YTPlayerRef: RefObject<HTMLDivElement>;

	constructor(props: IPlayerProps) {
		super(props);

		this.YTPlayerRef = React.createRef();
	}

	public render() {
		const playerClassnames = classNames("Player", {
			open: this.props.playing,
			playing: this.props.playing
		});

		return <div className={playerClassnames}>
				<div className="Player-close" onClick={this.close()}><i className="icon-cross" /></div>
				<div className="Player-video-title">{this.getVideoProperty("name")}</div>
				<div className="Player-wrapper">
					<div className="Player-previous playlist-controls" onClick={this.props.previous}>
						<i className="icon-previous2" />
					</div>
					<div id="tt-player" className="Player-iframe" ref={this.YTPlayerRef} />
					<div className="Player-previous playlist-controls" onClick={this.props.next}>
						<i className="icon-next2" />
					</div>
				</div>
				<div className="Player-video-message">{this.getVideoProperty("message")}</div>
				<div className="Player-video-description">{this.getVideoProperty("description")}</div>
			</div>
	}

 	public componentDidMount() {
		this.initPlayer();
	}

	public componentDidUpdate(prevProps: IPlayerProps) {
		if (this.props.playing !== prevProps.playing && this.player) {
			this.loadVideo();
		}
	}

	public loadVideo(id = this.props.playing) {
		this.player.loadVideoById(id);
	}

	public play() {
		this.player.playVideo();
	}

	public pause() {
		this.player.pauseVideo();
	}

	public close() {
		return () => {
			this.player.stopVideo();
			this.props.updatePlaying('');
		}
	}

	private initPlayer() {
		this.player = initYouTubePlayer(this.YTPlayerRef.current || 'tt_player', {
			events: {
				'onReady': this.onPlayerReady(),
				'onStateChange': this.onPlayerStateChange()
			},
			videoId: this.props.playing || ""
		});
	}

	private	onPlayerReady() {
		return () => {
			this.props.updateUi({
				key: 'player',
				value: {
					ready: true
				}
			});
		};
	}

	private onEnded() {
		this.playNext();
	}

	private playNext() {
		this.props.next();
	}

	private onPlayerStateChange() {
		return (event: any) => {
			if (event) {
				const playerStatus = event.data;
				switch (playerStatus) {
					case PLAYER_STATUSES.UNSTARTED:
						break;
					case PLAYER_STATUSES.ENDED:
						this.onEnded();
						break;
					case PLAYER_STATUSES.PLAYING:
						break;
					case PLAYER_STATUSES.PAUSED:
						break;
					case PLAYER_STATUSES.VIDEO_CUED:
						break;
					default:
						break;
				}
			}
		}
	}

	private getVideoProperty(key: string) {
		return this.props.currentVideo ? this.props.currentVideo[key] : "";
	}
}

export const Player = connect(mapStateToProps, mapDispatchToProps)(DisconnectedPlayer);