import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <div className="nav-menu">
            <Link to="/">Idea Board</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/community">Community</Link>
            <Link to="/profile">Settings</Link>
            <a href="/logout">Logout</a>
        </div>
    );
}
