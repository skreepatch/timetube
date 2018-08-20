import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSearch } from '../../actions/index';
import classNames from 'classnames';
import './Search.css';

const activeTimetube = (state) => {
    return state.timetubes[state.active]
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateSearch: partialState => dispatch(updateSearch(partialState)),
    };
}

const mapStateToProps = (state) => {
    return { 
        query: state.query, 
        ui: state.ui,
        activeTimetube: activeTimetube(state) 
    }
}

class ConnectedSearch extends Component {

    constructor(props) {
        super(props);

        this.state = { ...this.props.query };

        this.searchInput = React.createRef();

        this.handleChange = this.handleChange.bind(this);
        this.searchTag = this.searchTag.bind(this);
    }

    componentDidMount() {
        this.setState({ ...this.props.query });
        this.searchInput.current.focus();
    }

    handleChange(event) {
        this.props.updateSearch({ [event.target.id]: event.target.value.toLowerCase() });
    }

    searchTag(event) {
        const tag = event.currentTarget.dataset.tag &&
            event.currentTarget.dataset.tag !== this.props.query.searchTerm ? event.currentTarget.dataset.tag : "";
        this.props.updateSearch({ searchTerm: tag });
    }

    isDisabled() {
        return this.state.searchTerm === this.props.query.searchTerm && this.state.hashtags === this.props.query.hashtags;
    }

    hashTags() {
        const tagClassNames = (tag) => classNames('hashtag', {
            active: this.props.query.searchTerm === tag
        });
        if (this.props.activeTimetube && this.props.activeTimetube.videos) {
            const hashtags = Object.values(this.props.activeTimetube.videos).reduce((tags, video) => {
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
                    return <div className={tagClassNames(tag)} key={tag} onClick={this.searchTag} data-tag={tag}>{tag} <span className="tagCount">{hashtags[tag]}</span></div>;
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
                        onChange={this.handleChange}
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

const Search = connect(mapStateToProps, mapDispatchToProps)(ConnectedSearch);

export default Search;
