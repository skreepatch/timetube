import * as React from 'react';
import { connect } from 'react-redux';
import { IMeState } from "../../../store/me/me.reducers";
import { getMe } from "../../../store/me/me.selectors";
import { IRootState } from "../../../store/rootReducer";
import { ITimetube } from "../../../store/timetubes/timetubes.reducers";
import { getMyTimetube } from "../../../store/timetubes/timetubes.selectors";
import { UserLink } from '../../userLink/User-link';
import './Me.css';

export interface IMeProps {
	me: IMeState;
	myTimetube: ITimetube;
}

const mapStateToProps = (state: IRootState) => {
	return {
		me: getMe(state),
		myTimetube: getMyTimetube(state)
	}
};

export class DisconnectedMe extends React.Component<IMeProps> {
	public render() {
		return (
			<div className="me-component">
				<div className="profile">
					{this.profile()}
				</div>
			</div>
		)
	}

	private profile(): any {
		if (this.props.me.error) {
			return <div className="error">Opps, something went wrong :(</div>
		}

		if (this.props.me.name) {
			return <UserLink
				userId={this.props.me.id}
				name={this.props.me.name}
				pictureUrl={this.props.me.picture.data.url}/>
		}
	}
}

export const Me = connect(mapStateToProps)(DisconnectedMe);