import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePlaying } from "../../store/player/player.actions";
import classNames from 'classnames';
import PlayerStatuses from './statuses';
import './Player.css';
import {getSelected} from "../../store/timetubes/timetubes.selectors";
import {getPlaying} from "../../store/player/player.selectors";
import {initializeYoutubeIframeApi, initYTApi} from "../../providers/youtube/youtube.provider";

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

class connectedPlayer extends Component {

    constructor() {
        super();

        this.YTPlayerRef = React.createRef();
        this.state = { open: false };
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

        this.setState({ open: this.props.playing, playing: this.props.playing }, initYTApi);
    }

    componentDidUpdate(props) {
        if (props.playing && this.player) {
            this.player.loadVideoById(props.playing);

            this.setState({ open: true });
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        return prevProps.playing;
    }

    onPlayerReady(event) {
        console.log('player ready');
    }

    onEnded(event) {
        this.setState({ playing: false });
        this.playNext();
    }

    playNext() {
        this.props.next();
    }

    previousNext() {
        this.props.previous();
    }

    onPlayerStateChange(event) {
        return () => {
            if (event) {
                const playerStatus = event.data;
                switch (playerStatus) {
                    case PlayerStatuses.UNSTARTED:
                        this.setState({ playing: false });
                        break;
                    case PlayerStatuses.ENDED:
                        this.onEnded();
                        break;
                    case PlayerStatuses.PLAYING:
                        this.setState({ playing: true });
                        break;
                    case PlayerStatuses.PAUSED:
                        this.setState({ playing: false });
                        break;
                    case PlayerStatuses.VIDEO_CUED:
                        this.setState({ playing: false });
                        break;
                    default:
                        break;
                }
                console.log("player status", playerStatus);
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
                <div className="Player-close" onClick={this.close()}>+</div>
                <div className="Player-video-title">{this.getVideoProperty("name")}</div>
                <div className="Player-wrapper">
                    <div id="tt-player" ref={this.YTPlayerRef}></div>
                </div>
                <div className="Player-video-message">{this.getVideoProperty("message")}</div>
                <div className="Player-video-description">{this.getVideoProperty("description")}</div>
            </div>
        )
    }
}

export const Player = connect(mapStateToProps, mapDispatchToProps)(connectedPlayer);