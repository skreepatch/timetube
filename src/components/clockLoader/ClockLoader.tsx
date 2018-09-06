import * as classNames from 'classnames';
import * as React from 'react';
import { Component } from 'react';
import './ClockLoader.css';

export interface IClockLoaderProps {
	show: boolean
}

export class ClockLoader extends Component<IClockLoaderProps> {
	constructor(props: IClockLoaderProps) {
		super(props)
	}

	public render() {
		const classes = classNames("Clock-loader-overlay", {
			show: this.props.show
		});
		return <div className={classes}>
			<div className="Clock-loader" />
		</div>
	}
}