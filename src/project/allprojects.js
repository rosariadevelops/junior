import React from "react";
import Project from "./project";

export default function AllProjects() {
    return (
        <React.Fragment>
            <div className="coming-soon-overlay">
                <h4 className="coming-soon">Coming soon!</h4>
            </div>
            <div className="horizontal-ctr">
                <div className="title">
                    <h2>Active Projects</h2>
                </div>
                <Project />
            </div>
        </React.Fragment>
    );
}
