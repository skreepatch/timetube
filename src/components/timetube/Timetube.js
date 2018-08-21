import React, { Component } from 'react';
import { store }from '../../store/index';
import { Channel } from '../channel/Channel';
import { updateUi, setSelectedTimetube, updatePlaying, fetchVideos } from '../../actions/index';
import { connect } from 'react-redux';
import { Search } from '../search/Search';
import { Player } from '../player/Player';
import './Timetube.css';
import { Toolbar } from '../toolbar/Toolbar';

const active = (state) => {
    return state.timetubes[state.selectedTimetube];
};

const mapStateToProps = (state) => {
    return {
        active: state.selectedTimetube,
        timetube: active(state),
        me: state.me,
        activeVideoId: state.player.playing,
        query: state.query,
        ui: state.ui
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setActive: (status) => dispatch(setSelectedTimetube(status)),
        updateUi: (keyValue) => dispatch(updateUi(keyValue))
    }
};
export const Timetube = connect(mapStateToProps, mapDispatchToProps)(
class connectedTimetube extends Component {
    
    setActive(id) {
        this.props.setActive(id);
    }
    setLoading(value) {
        this.props.updateUi({ key: 'loading', value });
    }

    componentWillMount() {
        this.unlisten = this.props.history.listen((location) => {
            const id = location.pathname.replace(/\/|channel/g, "");

            if (id && this.props.active !== id) {
                this.setActive(id);
                this.scrapPosts(id);
            }
        });
    }
    componentWillUnmount() {
        if (this.unlisten) {
            this.unlisten();
        }

    }
    componentDidMount() {
        if (!this.props.me.isLoggedIn) {
            this.props.history.push('/');
            return;
        }
        const id = this.props.match.params.timetubeId || this.props.active;

        this.setActive(id);
        this.scrapPosts(id);
    }

    scrapPosts(id = this.props.active) {
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