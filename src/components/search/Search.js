import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateQuery } from "../../store/query/query.actions";
import classNames from 'classnames';
import './Search.css';
import {getSelected} from "../../store/timetubes/timetubes.selectors";
import {getUI} from "../../store/ui/ui.selectors";
import {getQuery} from "../../store/query/query.selectors";

const mapDispatchToProps = (dispatch) => {
    return {
        updateQuery: partialState => dispatch(updateQuery(partialState)),
    };
}

const mapStateToProps = (state) => {
    return { 
        query: getQuery(state),
        ui: getUI(state),
        timetube: getSelected(state)
    }
}

class ConnectedSearch extends Component {

    constructor(props) {
        super(props);

        this.state = { ...this.props.query };

        this.searchInput = React.createRef();
    }

    componentDidMount() {
        this.setState({ ...this.props.query });
        this.searchInput.current.focus();
    }

    handleChange(event) {
        return (event) => {
            this.props.updateQuery({ [event.target.id]: event.target.value.toLowerCase() });
        }
    }

    searchTag(event) {
        return (event) => {
            const tag = event.currentTarget.dataset.tag &&
            event.currentTarget.dataset.tag !== this.props.query.searchTerm ? event.currentTarget.dataset.tag : "";
            this.props.updateQuery({ searchTerm: tag });
        }
    }

    isDisabled() {
        return this.state.searchTerm === this.props.query.searchTerm && this.state.hashtags === this.props.query.hashtags;
    }

    hashTags() {
        const tagClassNames = (tag) => classNames('hashtag', {
            active: this.props.query.searchTerm === tag
        });
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
            const tags = Object.keys(hashtags) || [];

            return (
                tags.map((tag) => {
                    return <div className={tagClassNames(tag)} key={tag} onClick={this.searchTag()} data-tag={tag}>{tag} <span className="tagCount">{hashtags[tag]}</span></div>;
                })
            );
        }
    }

    render() {
        const searchClass = classNames("Search", {
            open: this.props.ui.search.open
        });
        return (
            <div className={searchClass}>
                <form id="search">
                    <input type="text" id="searchTerm"
                        onChange={this.handleChange()}
                        value={this.props.query.searchTerm}
                        placeholder="Search for something"
                        ref={this.searchInput} />
                </form>
                <div className="tags-component">
                    {this.hashTags()}
                </div>
            </div>
        )
    }
}

export const Search = connect(mapStateToProps, mapDispatchToProps)(ConnectedSearch);