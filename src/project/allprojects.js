import React from "react";
import Project from "./project";
//import useModal from "./../useModal";

export default function AllProjects() {
    //const { isVisible, toggle } = useModal();
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
