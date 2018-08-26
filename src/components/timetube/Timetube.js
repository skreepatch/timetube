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
import { getMe } from "../../store/me/me.selectors";
import { getPlaying } from "../../store/player/player.selectors";
import { getQuery } from "../../store/query/query.selectors";
import { getUI } from "../../store/ui/ui.selectors";
import { fetchVideos } from "../../store/timetubes/timetubes.actions";
import { updatePlaying } from "../../store/player/player.actions";
import {store} from "../../store";

const mapStateToProps = (state) => {
    return {
        id: getId(state),
        timetube: getSelected(state),
        me: getMe(state),
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
@connect(mapStateToProps, mapDispatchToProps)
export class Timetube extends Component {
    setId(id) {
        this.props.setId(id);
    }

    setLoading(value) {
        this.props.updateUi({ key: 'getLoading', value });
    }

    componentDidMount() {
        //TODO: Please extract to a function to have better readability
        if (!this.props.me.isLoggedIn) {
            this.props.history.push('/');
            return;
        }
        //TODO: Please extract to a function to have better readability
        const id = this.props.match.params.timetubeId || this.props.id;
        this.setId(id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //TODO: Please extract to a function to have better readability
        if (snapshot !== prevProps.id) {
            this.setId(snapshot);
            this.scrapPosts(snapshot);
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        return prevProps.match.params.timetubeId;
    }

    scrapPosts(id = this.props.id) {
        store.dispatch(fetchVideos(id, this.props.me.accessToken));
    }

    get getVideoIds() {
        return Object.keys(this.props.timetube.videos);
    }

    get currentVideoIndex() {
        return this.getVideoIds.indexOf(this.props.activeVideoId);
    }

    nextVideo() {
        return this.getVideoIds[this.currentVideoIndex + 1] || this.getVideoIds[0];
    }
    
    previousVideo() {
        return this.currentVideoIndex === 0 ? this.getVideoIds[this.getVideoIds.length - 1] : this.getVideoIds[this.currentVideoIndex - 1];
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

    render() {
        const player = () => {
            return this.props.id ? <Player videoId={this.props.activeVideoId} next={this.playNext()} previous={this.playPrevious()}/> : "";
        };
        return <div className="Timetube">
            { player() }
            <Search />
            <Channel />
            <Toolbar />
        </div>
    }
}