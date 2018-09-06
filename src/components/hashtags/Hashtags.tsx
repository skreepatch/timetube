import * as classNames from 'classnames';
import * as React from 'react';
import { Component, MouseEvent } from 'react';
import { connect } from "react-redux";
import { updateQuery } from "../../store/query/query.actions";
import { IQueryState } from "../../store/query/query.reducers";
import { getHashtags, getSearchterm } from "../../store/query/query.selectors";
import { IRootState } from "../../store/rootReducer";
import { ITimetube } from "../../store/timetubes/timetubes.reducers";
import { getSelected } from "../../store/timetubes/timetubes.selectors";
import { arrayFromObject } from "../../utils/array-from-object";
import { ITimetubeVideo } from "../../utils/video";
import './Hashtags.css';


export interface IHashtagsProps {
	hashtags: string[];
	searchTerm: string;
	timetube: ITimetube;
	updateQuery: any;
}

const mapStateToProps = (state: IRootState) => ({
	hashtags: getHashtags(state),
	searchTerm: getSearchterm(state),
	timetube: getSelected(state)
});

const mapDispatchToProps = (dispatch: any) => ({
	updateQuery: (query: IQueryState) => dispatch(updateQuery(query))
});

export class DisconnectedHashtags extends Component<IHashtagsProps> {
	public render() {
		const tagClassNames = (tag: string) => classNames('hashtag', {
			active: this.props.searchTerm === tag
		});

		return <div className="Hashtags">
			{
				arrayFromObject(this.tagsCollection, 'keys').map((tag: string) => {
					return <div className={tagClassNames(tag)} key={tag} onClick={this.searchTag()} data-tag={tag}>{tag}
						<span className="tagCount">{this.tagsCollection[tag]}</span></div>;
				})
			}
		</div>
	}

	private get tagsCollection() {
		if (this.props.timetube && this.props.timetube.videos) {
			return arrayFromObject(this.props.timetube.videos,'values')
				.reduce((tags: {}, video: ITimetubeVideo) => {
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
		}
		return {};
	}

	private searchTag() {
		return (event: MouseEvent) => {
			const currentTarget = event.currentTarget as HTMLElement;
			const tag = currentTarget.dataset.tag &&
			currentTarget.dataset.tag !== this.props.searchTerm ? currentTarget.dataset.tag : "";
			this.props.updateQuery({ searchTerm: tag });
		}
	}
}

export const Hashtags = connect(mapStateToProps, mapDispatchToProps)(DisconnectedHashtags);