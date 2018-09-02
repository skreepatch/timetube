import React, {Component} from 'react';
import './Hashtags.css';
import classNames from 'class-names';
import {connect} from "react-redux";
import {getHashtags, getSearchterm} from "../../store/query/query.selectors";
import {getSelected} from "../../store/timetubes/timetubes.selectors";
import {updateQuery} from "../../store/query/query.actions";

const mapStateToProps = (state) => ({
    hashtags: getHashtags(state),
    timetube: getSelected(state),
    searchTerm: getSearchterm(state)
});

const mapDispatchToProps = (dispatch) => ({
    updateQuery: (query) => dispatch(updateQuery(query))
});

export class DisconnectedHashtags extends Component {
    searchTag() {
        return (event) => {
            const tag = event.currentTarget.dataset.tag &&
            event.currentTarget.dataset.tag !== this.props.searchTerm ? event.currentTarget.dataset.tag : "";
            this.props.updateQuery({searchTerm: tag});
        }
    }
    get tagsCollection() {
        if (this.props.timetube && this.props.timetube.videos) {
            const hashtags = Object.values(this.props.timetube.videos).reduce((tags, video) => {
                const searchIn = video.message + video.description + video.name;
                const videoTags = searchIn.match(/(?:^|\s)(?:#)\w+/gim);
                if (videoTags) {
                    videoTags.forEach((tag) => {
                        const key = tag.toLowerCase().trim();
                        if (tags[key]) {
                            tags[key]++;
                        } else {
                            tags[key] = 1;
                        }
                    });
                }

                return tags;
            }, {});
            return hashtags || {};
        }
        return {};
    }

    render() {
        const tagClassNames = (tag) => classNames('hashtag', {
            active: this.props.searchTerm === tag
        });

        return <div className="Hashtags">
            {
                Object.keys(this.tagsCollection).map((tag) => {
                    return <div className={tagClassNames(tag)} key={tag} onClick={this.searchTag()} data-tag={tag}>{tag}
                        <span className="tagCount">{this.tagsCollection[tag]}</span></div>;
                })
            }
        </div>
    }
}

export const Hashtags = connect(mapStateToProps, mapDispatchToProps)(DisconnectedHashtags);