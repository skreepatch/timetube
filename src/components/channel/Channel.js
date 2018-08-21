import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePlaying } from '../../actions/index';
import { setSelectedTimetube } from "../../reducers/timetube/timetube.actions";
import { selected } from "../../reducers/timetube/timetube.selectors";
import { Gallery } from '../gallery/Gallery';
import './Channel.css';

const mapStateToProps = (state) => {
    return {
        timetubeId: state.selectedTimetube,
        timetube: selected(state),
        activeVideoId: state.playing,
        query: state.query
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setActive: (id) => dispatch(setSelectedTimetube(id)),
        updatePlaying: (videoId) => dispatch(updatePlaying(videoId))
    }
};

export const Channel = connect(mapStateToProps, mapDispatchToProps)(
class Channel extends Component {
    constructor(props) {
        super(props);

        this.state = { timetube: this.props.timetube, activeVideoId: "" };
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
        return (event) => {
            const videoId = event.currentTarget.dataset.videoid;
            this.props.updatePlaying(videoId);
        }
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
});