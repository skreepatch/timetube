import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Welcome.css';
import moment from 'moment';
import { fbLogin } from "../../providers/facebook/facebook.provider";
import {getMe} from "../../store/me/me.selectors";
import {getMyTimetube} from "../../store/timetubes/timetubes.selectors";

const mapStateToProps = (state) => ({
    me: getMe(state),
    timetube: getMyTimetube(state)
});

@connect(mapStateToProps)
export class Welcome extends Component {
    fbLogin() {
        fbLogin();
    }

    loginButton() {
        if (!this.props.me.isLoggedIn) {
            return <div className="LoginButton" onClick={this.fbLogin}>Login With Facebook</div>
        }
    }

    insightsPane() {
        if(this.props.me.id && this.props.timetube && this.props.timetube.videos) {
            const untilDate = new moment(this.props.timetube.discoveredUntil).format('ll');
            const videos = Object.keys(this.props.timetube.videos).length;
            const label = videos === 1 ? 'video' : 'videos';
            return <div className="Insights">
                <h3>Welcome back {this.props.me.name}</h3>
                <div>You have shared <b>{videos} {label}</b> directly on your timeline!</div>
                <div>You have discovered your timetube since <b>{untilDate}</b></div>
            </div>
        }
    }

    render() {
        return <div className="Welcome">
                <h2 className="Slogan">Discover all them YouTube videos you have ever shared</h2>
                {this.loginButton()}
                {this.insightsPane()}
            </div>
    }
}