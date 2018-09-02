import React, { Component } from 'react';
import { store } from "../../store";
import { updateUi } from "../../store/ui/ui.actions";
import classNames from 'class-names';
import { connect } from 'react-redux';
import moment from 'moment';
import './Toolbar.css';
import { getMe } from "../../store/me/me.selectors";
import { getFriendsOpen, getSearchOpen } from "../../store/ui/ui.selectors";
import { getSelected } from "../../store/timetubes/timetubes.selectors";
import { getId } from "../../store/id/id.selectors";
import { fetchVideos } from "../../store/timetubes/timetubes.actions";

const mapStateToProps = (state) => ({
	id: getId(state),
	me: getMe(state),
	searchOpen: getSearchOpen(state),
	friendsOpen: getFriendsOpen(state),
	timetube: getSelected(state)
});

export class DisconnectedToolbar extends Component {
	discoverMore() {
		return () => {
			store.dispatch(fetchVideos(this.props.id, this.props.me.accessToken))
		}
	}

	toggleSearch() {
		return () => {
			store.dispatch(
				updateUi({
					key: "search",
					value: { open: !this.props.searchOpen }
				})
			);
		}
	}

	toggleFriends() {
		return () => {
			store.dispatch(
				updateUi({
					key: "friends",
					value: { open: !this.props.friendsOpen }
				})
			);
		}
	}

	discoveredDate() {
		if (this.props.timetube && this.props.timetube.discoveredUntil) {
			const discoveredDate = new moment(this.props.timetube.discoveredUntil).format('ll');

			return <div className="Discovered-date">{discoveredDate}</div>
		}
		return "";
	}

	render() {
		const classes = {
			search: classNames("icon-search", {
				active: this.props.searchOpen
			}),
			fetch: classNames("icon-history", {
				hidden: this.props.timetube && (this.props.timetube.fetching || this.props.timetube.drained),
				discoverable: this.props.timetube && this.props.timetube.paging && this.props.timetube.paging.next
			}),
			friends: classNames("icon-users", {
				active: this.props.friendsOpen
			})
		};

		return <div className="Toolbar">
			<div className={classes.search} alt="Toggle Search" onClick={this.toggleSearch()}></div>
			<div className="Timemachine">
				{this.discoveredDate()}
				<div className={classes.fetch} alt="Go Back in TimeTube" onClick={this.discoverMore()}></div>
			</div>
			<div className={classes.friends} alt="Friends - coming soon" onClick={this.toggleFriends()}></div>
		</div>
	}
}

export const Toolbar = connect(mapStateToProps)(DisconnectedToolbar);
