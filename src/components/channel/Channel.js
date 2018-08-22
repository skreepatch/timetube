import React, { Component } from 'react';
import { connect } from 'react-redux';
import { id } from "../../store/id/id.selectors";
import { updatePlaying } from "../../store/player/player.actions";
import { playing } from "../../store/player/player.selectors";
import { getSelected } from "../../store/timetubes/timetubes.selectors";
import { query } from "../../store/query/query.selectors";
import { Gallery } from '../gallery/Gallery';
import './Channel.css';

const mapStateToProps = (state) => {
    return {
        id: id(state),
        timetube: getSelected(state),
        activeVideoId: playing(state),
        query: query(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
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