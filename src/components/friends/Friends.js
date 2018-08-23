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

export const Friends = connect(mapStateToProps, mapDispatchToProps)(
class Friends extends Component {

    componentWillReceiveProps(props) {
        if (props.me && props.me.id !== this.props.me.id) {
            const edgeType = 'friendsReducers';
            api.edge(props.me.id, edgeType)
                .then((friends) => this.props.updateFriends(friends));
        }

    }

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
});

