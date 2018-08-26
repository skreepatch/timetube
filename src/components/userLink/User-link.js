import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './User-link.css';

class UserLink extends Component {
    render() {
        return <Link to={`/channel/${this.props.id}`} className="user-link">
            <div className="picture">
                <img src={this.props.pictureUrl} alt="" />
            </div>
            <span className="username">{this.props.name}</span>
        </Link>
    }
}

export default UserLink;