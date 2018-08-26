import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getId } from "../../store/id/id.selectors";
import { getSelected } from "../../store/timetubes/timetubes.selectors";
import { getQuery } from "../../store/query/query.selectors";
import { Gallery } from '../gallery/Gallery';
import './Channel.css';
import {getMe} from "../../store/me/me.selectors";
import { arrayFromObject } from "../../utils/array-from-object";
import {saveToLocalStorage} from "../../providers/localStorage.provider";

const mapStateToProps = (state) => {
    return {
        id: getId(state),
        me: getMe(state),
        timetube: getSelected(state) || {},
        query: getQuery(state)
    }
};
//TODO: fancy, we need to discus about decorators. They sometimes come at a cost of not knowing what is happening and harder build
@connect(mapStateToProps)
export class Channel extends Component {
    filterBySearch(videos, searchTerm) {
        return videos.filter((video) => {
            //TODO: think about extracting this to a function, to have better readability
            const searchString = (video.message + video.description + video.name).toLowerCase();
            return searchString ? searchString.indexOf(searchTerm) > -1 : false;
        })
    }
//TODO: You have a lot of contact points that you save things to local storage. We need to think if we want a middleware to do this. Since it will decouple the logic from the view
    saveToLocalStorage() {
        saveToLocalStorage(this.props.id, this.props.timetube);
    }

    videosCollection() {
        if (!this.props.timetube) {
            return [];
        }
        const videosCollection = arrayFromObject(this.props.timetube.videos, "values");
        const searchTerm = this.props.query.searchTerm;
        const videos = searchTerm ? this.filterBySearch(videosCollection, searchTerm) : videosCollection;
        if (!videos || videos.length === 0) {
            return [];
        }

        this.saveToLocalStorage();

        return videos;
    }

    render() {
        return <div className="Channel">
                <Gallery
                    videos={this.videosCollection()}
                    showLoader={this.props.timetube.fetching} />
            </div>
    }
}