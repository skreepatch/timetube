import React, { Component } from 'react';
import { connect } from 'react-redux';
import api from '../../utils/api';
import { updateFriends } from '../../actions/index';
import UserLink from '../userLink/User-link';

const mapStateToProps = (state) => {
    return {
        friends: state.friends,
        me: state.me
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateFriends: (friends) => dispatch(updateFriends(friends))
    }
}

class connectedFriends extends Component {

    componentWillReceiveProps(props) {
        if (props.me && props.me.id !== this.props.me.id) {
            const edgeType = 'friends';
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
}

const Friends = connect(mapStateToProps, mapDispatchToProps)(connectedFriends);

export default Friends;