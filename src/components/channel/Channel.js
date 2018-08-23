import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getId } from "../../store/id/id.selectors";
import { updatePlaying } from "../../store/player/player.actions";
import { getSelected } from "../../store/timetubes/timetubes.selectors";
import { query } from "../../store/query/query.selectors";
import { Gallery } from '../gallery/Gallery';
import './Channel.css';
import {getMe} from "../../store/me/me.selectors";
import { arrayFromObject } from "../../utils/array-from-object";

const mapStateToProps = (state) => {
    return {
        id: getId(state),
        me: getMe(state),
        timetube: getSelected(state) || {},
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
    filterBySearch(videos, searchTerm) {
        return videos.filter((video) => {
            const searchString = (video.message + video.description + video.name).toLowerCase();
            return searchString ? searchString.indexOf(searchTerm) > -1 : false;
        })
    }

    videosCollection() {
        if (!this.props.timetube) {
            return [];
        }
        const videos = arrayFromObject(this.props.timetube.videos, "values");
        const searchTerm = this.props.query.searchTerm;

        if (!videos || videos.length === 0) {
            return [];
        }

        if (searchTerm) {
            return this.filterBySearch(videos, searchTerm);
        } else {
            return videos;
        }
    }

    render() {
        return <div className="Channel">
                <Gallery
                    videos={this.videosCollection()}
                    showLoader={this.props.timetube.fetching} />
            </div>
    }
});