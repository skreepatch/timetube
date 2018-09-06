import * as classNames from 'classnames';
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { IFbUser } from "../../providers/facebook/facebook.interfaces";
import { fetchFriends } from "../../store/friends/friends.actions";
import { getFriendsFetching, getFriendsList } from "../../store/friends/friends.selectors";
import { UserId } from "../../store/id/id.reducers";
import { getId } from "../../store/id/id.selectors";
import { IMeState } from "../../store/me/me.reducers";
import { getMe } from "../../store/me/me.selectors";
import { IRootState } from "../../store/rootReducer";
import { getFriendsOpen } from "../../store/ui/ui.selectors";
import { UserLink } from '../userLink/User-link';
import './Friends.css';

export interface IFriendsProps {
	id: UserId;
	fetching: boolean;
	friendsList: IFbUser[],
	me: Partial<IMeState>,
	open: boolean,
	fetchFriends: any
}

const mapStateToProps = (state: IRootState): Partial<IFriendsProps> => ({
	fetching: getFriendsFetching(state),
	friendsList: getFriendsList(state),
	id: getId(state),
	me: getMe(state),
	open: getFriendsOpen(state)
});

const mapDispatchToProps = (dispatch: Dispatch | any) => ({
	fetchFriends: (id: UserId) => dispatch(fetchFriends(id))
});

export class DisconnectedFriends extends Component {
	public props: any;

	public render() {
		const friendsClassNames = classNames('Friends', {
			open: this.props.open
		});


		return <div className={friendsClassNames}>
			{
				this.props.friendsList.map((friend: IFbUser) => (
					<UserLink
						id={this.props.id}
						userId={friend.id}
						pictureUrl={this.pictureUrl(friend)}
						name={friend.name}
						key={friend.id}/>
				))
			}
		</div>
	}

	public componentDidUpdate(prevProps: IFriendsProps, prevState: any, snapshot: boolean) {
		if (this.shouldFetch()) {
			this.fetchFriends(this.props.me.id);
		}
	}

	public getSnapshotBeforeUpdate(props: IFriendsProps): boolean {
		return props.open;
	}

	/**
	 *
	 * @param props
	 * @returns {*|boolean}
	 */
	private shouldFetch() {
		const { fetching, friendsList } = this.props;

		return open && !fetching && (!friendsList || friendsList.length === 0);
	}

	/**
	 *
	 * @param id
	 */
	private fetchFriends(id: UserId) {
		this.props.fetchFriends(id);
	}

	private pictureUrl(friend: IFbUser) {
		return friend.picture.data.url;
	}
}

export const Friends = connect(mapStateToProps, mapDispatchToProps)(DisconnectedFriends);

