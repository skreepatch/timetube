import * as React from 'react';
import { Link } from 'react-router-dom';

export class Logo extends React.Component {
    public render() {
        return (
            <Link to="/">
                <div className="Logo" />
            </Link>
        )
    }
}