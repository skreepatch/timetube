import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserLink } from '../userLink/User-link';
import { getMe } from "../../store/me/me.selectors";
import { fetchFriends } from "../../store/friends/friends.actions";
import { getFriendsFetching, getFriendsList } from "../../store/friends/friends.selectors";
import { getFriendsOpen } from "../../store/ui/ui.selectors";

const mapStateToProps = (state) => {
	return {
		open: getFriendsOpen(state),
		friendsList: getFriendsList(state),
		fetching: getFriendsFetching(state),
		me: getMe(state)
	}
};

const mapDispatchToProps = (dispatch) => ({
	fetchFriends: (id) => dispatch(fetchFriends(id))
});

export class DisconnectedFriends extends Component {
	/**
	 *
	 * @param props
	 * @returns {*|boolean}
	 */
	shouldFetch(props, open) {
		const { fetching, friendsList } = props;

		return open && !fetching &&
			(!friendsList || friendsList.length === 0);
	}

	/**
	 *
	 * @param id
	 */
	fetchFriends(id) {
		this.props.fetchFriends(id);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.shouldFetch(prevProps, snapshot)) {
			debugger;
			this.fetchFriends(this.props.me.id);
		}
	}


	getSnapshotBeforeUpdate(props) {
		return props.open;
	}

	pictureUrl(friend) {
		return friend.picture.data.url;
	}

	render() {
		return <div className="friends-component">
			{
				this.props.friendsList.map((friend) => (
					<UserLink
						id={friend.id}
						pictureUrl={this.pictureUrl(friend)}
						name={friend.name}
						key={friend.id} />
				))
			}
		</div>
	}
}

export const Friends = connect(mapStateToProps, mapDispatchToProps)(DisconnectedFriends);

