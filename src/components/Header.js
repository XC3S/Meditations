import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h3>Meditation</h3>
                <div className="nav">
                    <ul className="nav-list">
                        <li>
                            <Link to="/">Read</Link>
                        </li>
                        <li>
                            <Link to="/create">Create</Link>
                        </li>
                    </ul>
                </div>
            </React.Fragment>
        ) 
    }
}

export default Header;