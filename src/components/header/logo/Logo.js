
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Logo extends Component {
    render() {
        return (
            <Link to="/">
                <div className="Logo"></div>      
            </Link>
        )
    }
}