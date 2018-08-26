import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Welcome.css';
import moment from 'moment';
import { FBLogin } from "../../providers/facebook/facebook.provider";

const mapStateToProps = (state) => ({
    me: state.me,
    timetube: state.timetubes[state.me.id]
});

@connect(mapStateToProps)
export class Welcome extends Component {
    fbLogin() {
        return () => {
            FBLogin();
        }
    }

    loginButton() {
        if (!this.props.me.isLoggedIn) {
            return <div className="LoginButton" onClick={this.fbLogin()}>Login With Facebook</div>
        }
    }

    insightsPane() {
        if(this.props.me.id && this.props.timetube && this.props.timetube.videos) {
            const untilDate = new moment(this.props.timetube.discoveredUntil).format('ll');
            const videos = Object.keys(this.props.timetube.videos).length;
            const label = videos === 1 ? 'video' : 'videos';
            const amount = () => (<div>You have shared <b>{videos} {label}</b> directly on your timeline!</div>);
            const dicoveredUntil = () => (<div>You have discovered your timetube since <b>{untilDate}</b></div>);
            return <div className="Insights">
                <h3>Welcome back {this.props.me.name}</h3>
                {dicoveredUntil()}
                {amount()}
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