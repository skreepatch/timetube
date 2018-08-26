import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Me from './me/Me';
import Logo from './logo/Logo';
import './Header.css';
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
        me: state.me
    }
};

@connect(mapStateToProps)
export class Header extends Component {

    render() {
        //TODO: Please extract to a function
        const me = () => {
            if (this.props.checking) {
                return <div className="Checking">checking...</div>
            } else if (this.props.me) {
                return <Me />
            } else {
                return <Link to="/login">Login with Facebook</Link>
            }
        };
        return (
            <div className="header-component">
                <Logo />
                {me()}
            </div>
        );
    }
}