import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Me } from './me/Me';
import { Logo } from './logo/Logo';
import './Header.css';
import { getLoggedIn, getMe } from "../../store/me/me.selectors";

const mapStateToProps = (state) => {
	return {
		isLoggedIn: getLoggedIn(state),
		me: getMe(state)
	}
};

export class DisconnectedHeader extends Component {
	me() {
		if (this.props.checking) {
			return <div className="Checking">checking...</div>
		} else if (this.props.me) {
			return <Me/>
		} else {
			return <Link to="/login">Login with Facebook</Link>
		}
	}

	render() {
		return (
			<div className="header-component">
				<Logo/>
				{this.me()}
			</div>
		);
	}
}

export const Header = connect(mapStateToProps)(DisconnectedHeader);