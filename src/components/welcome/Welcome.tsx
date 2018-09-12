import * as React from 'react';
import { connect } from 'react-redux';
import { fbLogin } from "../../providers/facebook/facebook.provider";
import { IMeState } from "../../store/me/me.reducers";
import { getMe } from "../../store/me/me.selectors";
import { IRootState } from "../../store/rootReducer";
import { ITimetube } from "../../store/timetubes/timetubes.reducers";
import { getMyTimetube } from "../../store/timetubes/timetubes.selectors";
import { getMomentDate } from "../../utils/date";
import './Welcome.css';


export interface IWelcomeProps {
	me: IMeState,
	timetube: Partial<ITimetube>
}

const mapStateToProps = (state: IRootState) => ({
	me: getMe(state),
	timetube: getMyTimetube(state)
});

export class DisconnectedWelcome extends React.Component<IWelcomeProps> {

	public render() {
		return <div className="Welcome">
			<h2 className="Slogan">Discover all them YouTube videos you have ever shared</h2>
			{this.loginButton()}
			{this.insightsPane()}
		</div>
	}

	private fbLogin() {
		fbLogin();
	}

	private loginButton(): JSX.Element | null {
		if (!this.props.me.isLoggedIn) {
			return <div className="LoginButton" onClick={this.fbLogin}>Login With Facebook</div>
		}

		return null;
	}

	private insightsPane(): JSX.Element | null {
		if (this.props.me.id && this.props.timetube && this.props.timetube.videos) {
			const untilDate = getMomentDate(this.props.timetube.discoveredUntil as string);
			const videos = Object.keys(this.props.timetube.videos).length;
			const label = videos === 1 ? 'video' : 'videos';
			return <div className="Insights">
				<h3>Welcome back {this.props.me.name}</h3>
				<div>You have shared <b>{videos} {label}</b> directly on your timeline!</div>
				<div>You have discovered your timetube since <b>{untilDate}</b></div>
			</div>
		}

		return null;
	}
}

export const Welcome = connect(mapStateToProps)(DisconnectedWelcome);