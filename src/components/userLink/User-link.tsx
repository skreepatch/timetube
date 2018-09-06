import * as classNames from "classnames";
import * as React from 'react';
import { Link } from 'react-router-dom';
import { UserId } from "../../store/id/id.reducers";
import './User-link.css';

export interface IUserLinkProps {
	id: UserId;
	userId: UserId
	pictureUrl: string;
	name: string;
}

export class UserLink extends React.Component<Partial<IUserLinkProps>> {
	public render() {
		const activeFriendClass = classNames('User-link', {
			active: this.props.userId === this.props.id
		});

		return <Link to={`/channel/${this.props.userId}`} className={activeFriendClass}>
			<div className="picture">
				<img src={this.props.pictureUrl} alt=""/>
			</div>
			<span className="username">{this.props.name}</span>
		</Link>
	}
}