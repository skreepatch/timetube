import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLink from '../userLink/User-link';
import {getFriends} from "../../store/ui/ui.selectors";
import {getMe} from "../../store/me/me.selectors";

const mapStateToProps = (state) => {
    return {
        friends: getFriends,
        me: getMe
    }
};

@connect(mapStateToProps)
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

