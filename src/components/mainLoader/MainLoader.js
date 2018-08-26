import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from "class-names";
import {getLoading} from "../../store/ui/ui.selectors";
import './MainLoader.css';

const mapStateToProps = (state) => ({
    loading: getLoading(state)
});

@connect(mapStateToProps)
export class MainLoader extends Component {
    render() {
        const loaderClass = classNames('Loader', {
            loading: this.props.loading
        });

        return <div className={loaderClass}>
            <span className="spinner">Loading</span>
        </div>;
    }
}