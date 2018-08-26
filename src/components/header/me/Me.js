import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLink from '../../userLink/User-link';
import './Me.css';
import {getMe} from "../../../store/me/me.selectors";
import {getFriends} from "../../../store/ui/ui.selectors";
import {getMyTimetube} from "../../../store/timetubes/timetubes.selectors";

const mapStateToProps = (state) => {
    return {
        me: getMe(state),
        friends: getFriends(state),
        myTimetube: getMyTimetube(state)
    }
};

@connect(mapStateToProps)
export class Me extends Component {

    profile() {
        if (this.props.me.error) {
         return (
             <div className="error">Opps, something went wrong :(</div>
         )   
        }

        if (this.props.me.name) {
            return <UserLink
                id={this.props.me.id}
                name={this.props.me.name}
                pictureUrl={this.props.me.picture.data.url} />
        }
    }

    render() {
        return (
            <div className="me-component">
                <div className="profile">
                    {this.profile()}
                </div>
            </div>
        )
    }
}