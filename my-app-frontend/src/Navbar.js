import React from "react";
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item"><NavLink to="/" className="nav-link">Home</NavLink></li>
                    <li className="nav-item"><NavLink to='/game-reviews' className="nav-link">Game Reviews</NavLink></li>
                    <li className="nav-item"><NavLink to='/new-game' className="nav-link">Add New Game</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;