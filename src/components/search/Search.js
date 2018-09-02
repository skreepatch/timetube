import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateQuery } from "../../store/query/query.actions";
import classNames from 'classnames';
import './Search.css';
import { getSelected } from "../../store/timetubes/timetubes.selectors";
import { getUI } from "../../store/ui/ui.selectors";
import { getQuery } from "../../store/query/query.selectors";
import { Hashtags } from "../hashtags/Hashtags";

const mapDispatchToProps = (dispatch) => {
	return {
		updateQuery: partialState => dispatch(updateQuery(partialState)),
	};
};

const mapStateToProps = (state) => {
	return {
		query: getQuery(state),
		ui: getUI(state),
		timetube: getSelected(state)
	}
};

export class DisconnectedSearch extends Component {

	constructor(props) {
		super(props);

		this.state = { ...this.props.query };

		this.searchInput = React.createRef();
	}

	componentDidMount() {
		this.setState({ ...this.props.query });
		this.searchInput.current.focus();
	}

	handleChange() {
		return (event) => {
			this.props.updateQuery({ [event.target.id]: event.target.value.toLowerCase() });
		}
	}

	render() {
		const searchClass = classNames("Search", {
			open: this.props.ui.search.open
		});
		return (
			<div className={searchClass}>
				<form id="search">
					<input type="text" id="searchTerm"
						   onChange={this.handleChange()}
						   value={this.props.query.searchTerm}
						   placeholder="Search for something"
						   ref={this.searchInput}/>
				</form>
				<Hashtags/>
			</div>
		)
	}
}

export const Search = connect(mapStateToProps, mapDispatchToProps)(DisconnectedSearch);