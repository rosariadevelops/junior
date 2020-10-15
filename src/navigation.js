import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <div className="nav-menu">
            <div className="nav-menu-top">
                <Link to="/">Ideaboard</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/community">Community</Link>
            </div>
            <div className="nav-menu-footer">
                <Link to="/profile">
                    <div className="prof-pic"></div>Settings
                </Link>
                <a href="/logout">Logout</a>
            </div>
        </div>
    );
}
