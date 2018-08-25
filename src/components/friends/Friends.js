import React, { Component } from 'react';
import { connect } from 'react-redux';
import { api } from '../../providers/facebook/api';
import { updateFriends } from "../../store/friends/friends.actions";
import UserLink from '../userLink/User-link';

const mapStateToProps = (state) => {
    return {
        friends: state.friends,
        me: state.me
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
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

