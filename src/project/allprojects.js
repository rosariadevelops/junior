import React from "react";
import Project from "./project";
//import useModal from "./../useModal";

export default function AllProjects() {
    //const { isVisible, toggle } = useModal();

    return (
        <React.Fragment>
            <div className="horizontal-ctr">
                <h4>Active Projects</h4>
                <Project />
                <h4>Completed Projects</h4>
            </div>
        </React.Fragment>
    );
}
