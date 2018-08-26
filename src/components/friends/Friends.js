import React, { Component } from 'react';
import { connect } from 'react-redux';
//TODO: please remove unused imports
import { api } from '../../providers/facebook/api';
import { updateFriends } from "../../store/friends/friends.actions";
import UserLink from '../userLink/User-link';

const mapStateToProps = (state) => {
    return {
        //TODO: user a selector, and think about having a specific selector for state.friends.data since you only use this property and it means that you expose the internal structure though you do not need to.
        friends: state.friends,
        me: state.me
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        //TODO: Do you use this props?
        updateFriends: (friends) => dispatch(updateFriends(friends))
    }
};

@connect(mapStateToProps, mapDispatchToProps)
export class Friends extends Component {
    render() {
        return (
            <div className="friends-component">
                {
                    this.props.friends.data.map((friend) => (
                        <UserLink user={friend} key={friend.id} />
                    ))
                }
            </div>
        )
    }
}

