import * as classNames from "classnames";
import * as React from 'react';
import { connect } from 'react-redux';
import { IRootState } from "../../store/rootReducer";
import { getLoading } from "../../store/ui/ui.selectors";
import './MainLoader.css';

export interface IMainLoader {
	loading: boolean;
}

const mapStateToProps = (state: IRootState) => ({
	loading: getLoading(state)
});


export class DisconnectedMainLoader extends React.Component<IMainLoader> {
	public render() {
		const loaderClass = classNames('Loader', {
			loading: this.props.loading
		});

		return <div className={loaderClass}>
			<span className="spinner">Loading</span>
		</div>;
	}
}

export const MainLoader = connect(mapStateToProps)(DisconnectedMainLoader);