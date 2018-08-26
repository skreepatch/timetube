import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './User-link.css';

//TODO: please use more props that object since it will be more declarative
class UserLink extends Component {
    render() {
        return <Link to={`/channel/${this.props.user.id}`} className="user-link">
            <div className="picture">
                <img src={this.props.user.picture.data.url} alt="" />
            </div>
            <span className="username">{this.props.user.name}</span>
        </Link>
    }
}

export default UserLink;