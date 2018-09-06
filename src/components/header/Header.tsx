import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IMeState } from "../../store/me/me.reducers";
import { getLoggedIn, getMe } from "../../store/me/me.selectors";
import { IRootState } from "../../store/rootReducer";
import './Header.css';
import { Logo } from './logo/Logo';
import { Me } from './me/Me';

export interface IHeaderProps {
	isLoggedIn: boolean;
	me: IMeState;
}

const mapStateToProps = (state: IRootState) => {
	return {
		isLoggedIn: getLoggedIn(state),
		me: getMe(state)
	}
};

export class DisconnectedHeader extends React.Component<IHeaderProps> {
	public render() {
		return (
			<div className="header-component">
				<Logo/>
				{this.me()}
			</div>
		);
	}

	private me(): any {
		if (this.props.me) {
			return <Me/>
		} else {
			return <Link to="/login">Login with Facebook</Link>
		}
	}
}

export const Header = connect(mapStateToProps)(DisconnectedHeader);