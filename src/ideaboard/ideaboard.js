import React, { useState } from "react";
import IdeaCard from "./ideacard";
import CreateIdea from "./createidea";
import useModal from "./../useModal";

export default function IdeaBoard() {
    // const [isVisible, toggle] = useState(false);
    const { isVisible, toggle } = useModal();
    //const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);

    return (
        <React.Fragment>
            <div className="add-idea">
                <div className="plus" onClick={toggle}>
                    <div className="plus-h"></div>
                    <div className="plus-v"></div>
                </div>
            </div>
            <div className="grid-ctr">
                <IdeaCard />
            </div>

            <CreateIdea isVisible={isVisible} hide={toggle} />
        </React.Fragment>
    );
}
