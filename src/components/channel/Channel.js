import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setActive, updatePlaying } from '../../actions/index';
import Gallery from '../gallery/Gallery';
import './Channel.css';

const activeTimetube = (state) => {
    const timetube = state.timetubes[state.active] || {};
    return timetube;
}

const mapStateToProps = (state) => {
    return {
        timetubeId: state.active,
        timetube: activeTimetube(state),
        activeVideoId: state.playing,
        query: state.query
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setActive: (id) => dispatch(setActive(id)),
        updatePlaying: (videoId) => dispatch(updatePlaying(videoId))
    }
}

class connectedChannel extends Component {
    constructor(props) {
        super(props);

        this.state = { timetube: this.props.timetube, activeVideoId: "" };
        this.openTheater = this.openTheater.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({ timetube: this.props.timetube });
    }

    filterBySearch(videos, searchTerm) {
        return videos.filter((video) => {
            const searchString = (video.message + video.description + video.name).toLowerCase();
            return searchString ? searchString.indexOf(searchTerm) > -1 : false;
        })
    }

    openTheater(event) {
        const videoId = event.currentTarget.dataset.videoid;
        this.props.updatePlaying(videoId);
    }

    videosCollection() {
        if (!this.props.timetube) {
            return [];
        }
        const videos = this.arrayFromIterator(this.props.timetube.videos, "values");
        const searchTerm = this.props.query.searchTerm;
        if (videos && searchTerm) {
            return this.filterBySearch(videos, searchTerm);
        } else {
            return videos;
        }
    }

    arrayFromIterator(map, iteratorFn) {
        if (!map || !iteratorFn) {
            return [];
        }
        return Object[iteratorFn](map);
    }

    render() {
        return (
            <div className="Channel">
                <Gallery
                    videos={this.videosCollection()}
                    loadMore={this.props.loadMore}
                    fetching={this.props.timetube.fetching} />
            </div>)
    }
}

const Channel = connect(mapStateToProps, mapDispatchToProps)(connectedChannel);

export default Channel;