import React, { Component } from 'react';
import { updateUi } from "../../store/ui/ui.actions";
import classNames from 'class-names';
import { connect } from 'react-redux';
import moment from 'moment';
import './Toolbar.css';

const mapStateToProps = (state) => ({
    me: state.me,
    ui: state.ui,
    timetube: state.timetubes[state.active]
});

const mapDispatchToProps = (dispatch) => ({
    updateUi: (update) => dispatch(updateUi(update))
});

export const Toolbar = connect(mapStateToProps, mapDispatchToProps)(
class Toolbar extends Component {
    discoverMore() {
        return () => {
            this.props.discoverMore();
        }
    }
    toggleSearch() {
        return () => {
            this.props.updateUi({ key: "search", value: { open: !this.props.ui.search.open } });
        }
    }
    toggleFriends() {
        return () => {
            this.props.updateUi({ key: "friendsReducers", value: { open: !this.props.ui.friends.open } });
        }
    }
    discoveredDate() {
        if (this.props.timetube && this.props.timetube.discoveredUntil) {
            const discoveredDate = new moment(this.props.timetube.discoveredUntil).format('ll');

            return <div className="Discovered-date">{discoveredDate}</div>
        }
        return "";
    }
    render() {
        const classes = {
            search: classNames("icon-search", {
                active: this.props.ui.search.open
            }),
            fetch: classNames("icon-history", {
                hidden: this.props.timetube && (this.props.timetube.fetching || this.props.timetube.drained),
                discoverable: this.props.timetube && this.props.timetube.paging && this.props.timetube.paging.next
            }),
            friends: classNames("icon-users", {
                active: this.props.ui.friends.open
            })
        }

        return <div className="Toolbar">
            <div className={classes.search} alt="Toggle Search" onClick={this.toggleSearch()}></div>
            <div className="Timemachine">
                {this.discoveredDate()}
                <div className={classes.fetch} alt="Go Back in TimeTube" onClick={this.discoverMore()}></div>
            </div>
            <div className={classes.friends} alt="Toggle Friends" onClick={this.toggleFriends()}></div>
        </div>
    }
});
