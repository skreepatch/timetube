import * as classNames from 'classnames';
import * as React from 'react';
import { ChangeEvent, Component, RefObject } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { updateQuery } from "../../store/query/query.actions";
import { IQueryState } from "../../store/query/query.reducers";
import { getQuery } from "../../store/query/query.selectors";
import { IRootState } from "../../store/rootReducer";
import { ITimetube } from "../../store/timetubes/timetubes.reducers";
import { getSelected } from "../../store/timetubes/timetubes.selectors";
import { IUiState } from "../../store/ui/ui.reducers";
import { getUI } from "../../store/ui/ui.selectors";
import { Hashtags } from "../hashtags/Hashtags";
import './Search.css';


export interface ISearchProps {
	query: IQueryState;
	timetube: ITimetube;
	ui: IUiState,
	updateQuery: any;
}

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		updateQuery: (partialState: Partial<IQueryState>) => dispatch(updateQuery(partialState)),
	};
};

const mapStateToProps = (state: IRootState) => {
	return {
		query: getQuery(state),
		timetube: getSelected(state),
		ui: getUI(state)
	}
};

export class DisconnectedSearch extends Component<ISearchProps> {

	protected searchInput: RefObject<HTMLInputElement>;

	constructor(props: ISearchProps) {
		super(props);

		this.state = { ...this.props.query };

		this.searchInput = React.createRef();
	}

	public componentDidMount(): void {
		this.setState({ ...this.props.query });
		if (this.searchInput.current) {
			this.searchInput.current.focus();
		}
	}

	public render() {
		const searchClass = classNames("Search", {
			open: this.props.ui.search.open
		});
		return <div className={searchClass}>
			<form id="search">
				<input type="text" id="searchTerm"
					   onChange={this.handleChange()}
					   value={this.props.query.searchTerm}
					   placeholder="Search for something"
					   ref={this.searchInput} />
			</form>
			<Hashtags/>
		</div>
	}

	private handleChange() {
		return (event: ChangeEvent) => {
			this.props.updateQuery({ [event.target.id]: (event.target as HTMLInputElement).value.toLowerCase() });
		}
	}
}

export const Search = connect(mapStateToProps, mapDispatchToProps)(DisconnectedSearch);