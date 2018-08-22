import React, { Component } from 'react';
import { Channel } from '../channel/Channel';
import { connect } from 'react-redux';
import { Search } from '../search/Search';
import { Player } from '../player/Player';
import './Timetube.css';
import { Toolbar } from '../toolbar/Toolbar';
import { setId } from "../../store/id/id.actions";
import { updateUi } from "../../store/ui/ui.actions";
import { id } from "../../store/id/id.selectors";
import { selected } from "../../store/timetubes/timetubes.selectors";
import { me } from "../../store/me/me.selectors";
import { playing } from "../../store/player/player.selectors";
import { query } from "../../store/query/query.selectors";
import { ui } from "../../store/ui/ui.selectors";
import { fetchVideos } from "../../store/timetubes/timetubes.actions";
import { updatePlaying } from "../../store/player/player.actions";

const mapStateToProps = (state) => {
    return {
        id: id(state),
        timetube: selected(state),
        me: me(state),
        activeVideoId: playing(state),
        query: query(state),
        ui: ui(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setId: (id) => dispatch(setId(id)),
        updateUi: (keyValue) => dispatch(updateUi(keyValue)),
        fetchVideos: (userId) => dispatch(fetchVideos(userId)),
        updatePlaying: (videoId) => dispatch(updatePlaying(videoId))
    }
};
export const Timetube = connect(mapStateToProps, mapDispatchToProps)(
class connectedTimetube extends Component {
    setId(id) {
        this.props.setId(id);
    }
    setLoading(value) {
        this.props.updateUi({ key: 'loading', value });
    }

    componentWillMount() {
        this.stopListeningToHistory = this.props.history.listen((location) => {
            const id = location.pathname.replace(/\/|channel/g, "");
            if (id && this.props.selected !== id) {
                this.setId(id);
                this.scrapPosts(id)(id);
            }
        });
    }
    componentWillUnmount() {
        if (this.stopListeningToHistory) {
            this.stopListeningToHistory();
        }

    }
    componentDidMount() {
        if (!this.props.me.isLoggedIn) {
            this.props.history.push('/');
            return;
        }
        const id = this.props.match.params.timetubeId || this.props.selected;

        this.setId(id);
        this.scrapPosts(id);
    }

    scrapPosts(id = this.props.selected) {
        return (id) => {
            this.props.fetchVideos(id, this.props.me.accessToken);
        }
    }

    nextVideo() {
        const ids = Object.keys(this.props.timetube.videos);
        const index = ids.indexOf(this.props.activeVideoId);
        return ids[index + 1] || ids[0];
    }
    
    previousVideo() {
        const ids = Object.keys(this.props.timetube.videos);
        const index = ids.indexOf(this.props.activeVideoId);
        return ids[index - 1] || ids[ids.length - 1];
    }

    playNext() {
        this.props.updatePlaying(this.nextVideo());
    }

    playPrevious() {
        this.props.updatePlaying(this.previousVideo());
    }

    render() {
        return <div className="Timetube">
            <Player videoId={this.props.activeVideoId} next={this.playNext} previous={this.previousVideo}/>
            <Search />
            <Channel loadMore={this.scrapPosts()} />
            <Toolbar discoverMore={this.scrapPosts()}/>
        </div>
    }
});