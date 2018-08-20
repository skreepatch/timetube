import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePlaying } from '../../actions/index';
import classNames from 'classnames';
import PlayerStatuses from './statuses';
import './Player.css';
const IFRAME_API_URL = "https://www.youtube.com/iframe_api";

const currentVideo = (state) => {
    const timetube = state.timetubes[state.active];
    if (timetube && state.player.playing) {
        return timetube.videos[state.player.playing];
    }
    return null;
}

const mapStateToProps = (state) => ({
    timetube: state.timetubes[state.active],
    currentVideo: currentVideo(state),
    playing: state.player.playing
});

const mapDispatchToProps = (dispatch) => ({
    updatePlaying: (id) => dispatch(updatePlaying(id))
});

class connectedPlayer extends Component {

    constructor() {
        super();
        this.ytPlayerEl = React.createRef();

        this.state = { open: false, playing: false };
    }

    componentDidMount() {
        window.onYouTubeIframeAPIReady = () => {
            this.player = this.initYoutubePlayer();
        };
        this.setState({ open: this.props.videoId, playing: this.props.playing }, this.initYTApi);
    }

    componentWillReceiveProps(props) {
        if (props.playing && this.player) {
            this.player.loadVideoById(props.videoId)
            this.setState({ open: true });
        }
    }

    initYTApi() {
        const firstScriptTag = document.getElementsByTagName('script')[0];
        const tag = document.createElement('script');
        tag.src = IFRAME_API_URL;

        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
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
        if (event) {
            const playerStatus = event.data;
            switch (playerStatus) {
                case PlayerStatuses.UNSTARTED:
                    this.setState({ playing: false })
                    break;
                case PlayerStatuses.ENDED:
                    this.onEnded()
                    break;
                case PlayerStatuses.PLAYING:
                    this.setState({ playing: true })
                    break;
                case PlayerStatuses.PAUSED:
                    this.setState({ playing: false })
                    break;
                case PlayerStatuses.VIDEO_CUED:
                    this.setState({ playing: false })
                    break;
                default:
                    break;
            }
            console.log("player status", playerStatus);
        }
    }

    initYoutubePlayer(selector, config) {
        return new window.YT.Player(this.ytPlayerEl.current || 'tt-player', {
            width: '100%',
            height: '100%',
            videoId: this.props.videoId || "",
            playerVars: {
                'autoplay': 1,
                'controls': 1,
                'iv_load_policy': 0,
                'showinfo': 0,
                'modestbranding': 1,
                'rel': 0
            },
            events: {
                'onReady': this.onPlayerReady.bind(this),
                'onStateChange': this.onPlayerStateChange.bind(this)
            }
        });
    }

    play() {
        this.player.playVideo();
    }

    pause() {
        this.player.pauseVideo();
    }

    close() {
        this.player.stopVideo();
        this.props.updatePlaying('');
        this.setState({ open: false });
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
            open: this.state.open
        });
        
        return (
            <div className={playerClassnames()}>
                <div className="Player-close" onClick={this.close.bind(this)}>+</div>
                <div className="Player-video-title">{this.getVideoProperty("name")}</div>
                <div className="Player-wrapper">
                    <div id="tt-player" ref={this.ytPlayerEl}></div>
                </div>
                <div className="Player-video-message">{this.getVideoProperty("message")}</div>
                <div className="Player-video-description">{this.getVideoProperty("description")}</div>
            </div>
        )
    }
}

const Player = connect(mapStateToProps, mapDispatchToProps)(connectedPlayer);

export default Player;