import React, { Component } from 'react';
import { store }from '../../store/index';
import { Channel } from '../channel/Channel';
import { updateUi, updatePlaying } from '../../actions/index';
import { setSelectedTimetube, fetchVideos } from "../../reducers/timetube/timetube.actions";
import { selected } from "../../reducers/timetube/timetube.selectors";
import { connect } from 'react-redux';
import { Search } from '../search/Search';
import { Player } from '../player/Player';
import './Timetube.css';
import { Toolbar } from '../toolbar/Toolbar';

const mapStateToProps = (state) => {
    return {
        selected: state.selectedTimetube,
        timetube: selected(state),
        me: state.me,
        activeVideoId: state.player.playing,
        query: state.query,
        ui: state.ui
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedTimetube: (status) => dispatch(setSelectedTimetube(status)),
        updateUi: (keyValue) => dispatch(updateUi(keyValue))
    }
};
export const Timetube = connect(mapStateToProps, mapDispatchToProps)(
class connectedTimetube extends Component {
    setSelectedTimetube(id) {
        this.props.setSelectedTimetube(id);
    }
    setLoading(value) {
        this.props.updateUi({ key: 'loading', value });
    }

    componentWillMount() {
        this.stopListeningToHistory = this.props.history.listen((location) => {
            const id = location.pathname.replace(/\/|channel/g, "");
            if (id && this.props.selected !== id) {
                this.setSelectedTimetube(id);
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

        this.setSelectedTimetube(id);
        this.scrapPosts(id);
    }

    scrapPosts(id = this.props.selected) {
        return (id) => {
            store.dispatch(fetchVideos(id, this.props.me.accessToken));
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
        store.dispatch(updatePlaying(this.nextVideo()));
    }

    playPrevious() {
        store.dispatch(updatePlaying(this.previousVideo()));
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