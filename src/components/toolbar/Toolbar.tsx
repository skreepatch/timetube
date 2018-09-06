import * as classNames from 'classnames';
import * as moment from 'moment';
import * as React from 'react';
import { Component } from "react";
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { IFriendsState } from "../../store/friends/friends.reducers";
import { UserId } from "../../store/id/id.reducers";
import { getId } from "../../store/id/id.selectors";
import { store } from "../../store/index";
import { IMeState } from "../../store/me/me.reducers";
import { getMe } from "../../store/me/me.selectors";
import { IRootState } from "../../store/rootReducer";
import { fetchVideos } from "../../store/timetubes/timetubes.actions";
import { ITimetube } from "../../store/timetubes/timetubes.reducers";
import { getSelected } from "../../store/timetubes/timetubes.selectors";
import { updateUi } from "../../store/ui/ui.actions";
import { getFriendsOpen, getSearchOpen } from "../../store/ui/ui.selectors";
import { Friends } from "../friends/Friends";
import './Toolbar.css';


export interface IToolbarProps {
	friendsOpen: IFriendsState;
	id: UserId;
	me: IMeState;
	searchOpen: boolean;
	timetube: Partial<ITimetube>;
	fetchVideos: any;
	updateUi: any;
}

const mapStateToProps = (state: IRootState) => ({
	friendsOpen: getFriendsOpen(state),
	id: getId(state),
	me: getMe(state),
	searchOpen: getSearchOpen(state),
	timetube: getSelected(state)
});

const mapDispatchToProps = (dispatch: Dispatch | any) => ({
	fetchVideos: (id: UserId, accessToken: string) => dispatch(fetchVideos(id, accessToken))
});

export class DisconnectedToolbar extends Component<Partial<IToolbarProps>> {
	public render() {
		const classes = {
			fetch: classNames("icon-history", {
				discoverable: this.props.timetube && this.props.timetube.paging && this.props.timetube.paging.next,
				hidden: this.props.timetube && (this.props.timetube.fetching || this.props.timetube.drained)
			}),
			friends: classNames("icon-users", {
				active: this.props.friendsOpen
			}),
			search: classNames("icon-search", {
				active: this.props.searchOpen
			})
		};

		return <div className="Toolbar">
			<div className={classes.search} data-alt="Toggle Search" onClick={this.toggleSearch()} />
			<div className="Timemachine">
				{this.discoveredDate()}
				<div className={classes.fetch} data-alt="Go Back in TimeTube" onClick={this.discoverMore()} />
			</div>
			<div className={classes.friends} data-alt="Friends - coming soon" onClick={this.toggleFriends()} />
			<Friends />
		</div>

		/* tslint:enable */
	}

	private discoverMore() {
		return () => {
			if (this.props.me) {
				this.props.fetchVideos(this.props.id, this.props.me.accessToken);
			}
		}
	}

	private toggleSearch() {
		return () => {
			store.dispatch(
				updateUi({
					key: "search",
					value: { open: !this.props.searchOpen }
				})
			);
		}
	}

	private toggleFriends() {
		return () => {
			store.dispatch(
				updateUi({
					key: "friends",
					value: { open: !this.props.friendsOpen }
				})
			);
		}
	}

	private discoveredDate() {
		if (this.props.timetube && this.props.timetube.discoveredUntil) {
			const momentDate = moment(this.props.timetube.discoveredUntil);
			const discoveredDate = momentDate.format('ll');

			return <div className="Discovered-date">{discoveredDate}</div>
		}
		return "";
	}
}

export const Toolbar = connect(mapStateToProps, mapDispatchToProps)(DisconnectedToolbar);
