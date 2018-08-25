import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePlaying } from "../../store/player/player.actions";
import classNames from 'classnames';
import { PLAYER_STATUSES } from '../../constants/statuses';
import './Player.css';
import {getSelected} from "../../store/timetubes/timetubes.selectors";
import {getPlaying} from "../../store/player/player.selectors";
import {initializeYoutubeIframeApi} from "../../providers/youtube/youtube.provider";

const currentVideo = (state) => {
    const timetube = getSelected(state);
    const playing = getPlaying(state);
    if (timetube && playing) {
        return timetube.videos[playing];
    }
    return null;
};

const mapStateToProps = (state) => ({
    timetube: getSelected(state),
    currentVideo: currentVideo(state),
    playing: getPlaying(state)
});

const mapDispatchToProps = (dispatch) => ({
    updatePlaying: (id) => dispatch(updatePlaying(id))
});

@connect(mapStateToProps, mapDispatchToProps)
export class Player extends Component {

    constructor(props) {
        super(props);

        this.YTPlayerRef = React.createRef();
    }

    componentDidMount() {
        this.initPlayer();
    }

    initPlayer() {
        initializeYoutubeIframeApi(this.YTPlayerRef.current || 'tt_player', {
            videoId: this.props.playing || "",
            events: {
                'onReady': this.onPlayerReady(),
                'onStateChange': this.onPlayerStateChange()
            }
        }).then( (youtubePlayerRef) => {
            this.player = youtubePlayerRef;
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.playing !== prevProps.playing && this.player) {
            this.player.loadVideoById(this.props.playing);
        }
    }

    getSnapshotBeforeUpdate(props) {
        return props.playing;
    }

    onPlayerReady(event) {
        // player ready
    }

    onEnded(event) {
        this.playNext();
    }

    playNext() {
        this.props.next();
    }

    previousNext() {
        this.props.previous();
    }

    onPlayerStateChange(event) {
        return (event) => {
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

    play() {
        this.player.playVideo();
    }

    pause() {
        this.player.pauseVideo();
    }

    close() {
        return () => {
            this.player.stopVideo();
            this.props.updatePlaying('');
            this.setState({ open: false });
        }
    }

    open() {
        this.setState({ open: true });
    }

    getVideoProperty(key) {
        return this.props.currentVideo ? this.props.currentVideo[key] : "";
    }

    render() {
        const playerClassnames = () => classNames("Player", {
            playing: this.props.playing,
            open: this.props.playing
        });
        
        return (
            <div className={playerClassnames()}>
                <div className="Player-close" onClick={this.close()}><i className="icon-cross"></i></div>
                <div className="Player-video-title">{this.getVideoProperty("name")}</div>
                <div className="Player-wrapper">
                    <div className="Player-previous playlist-controls" onClick={this.props.previous}><i className="icon-previous2"></i></div>
                    <div id="tt-player" className="Player-iframe" ref={this.YTPlayerRef}></div>
                    <div className="Player-previous playlist-controls" onClick={this.props.next}><i className="icon-next2"></i></div>
                </div>
                <div className="Player-video-message">{this.getVideoProperty("message")}</div>
                <div className="Player-video-description">{this.getVideoProperty("description")}</div>
            </div>
        )
    }
}