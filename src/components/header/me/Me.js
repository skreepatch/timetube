import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLink from '../../userLink/User-link';
import './Me.css';

const myTimetube = (state) => {
    return state.timetubes[state.me.userID];
}

const mapStateToProps = (state) => {
    return {
        me: state.me,
        friends: state.friends,
        myTimetube: myTimetube(state)
    }
};

class Me extends Component {


    profile() {
        if (this.props.me.error) {
         return (
             <div className="error">Opps, something went wrong :(</div>
         )   
        }

        if (this.props.me.name) {
            return <UserLink user={this.props.me}/>
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

export default connect(mapStateToProps)(Me);