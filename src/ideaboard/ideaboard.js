import React from "react";
import IdeaCard from "./ideacard";
import CreateIdea from "./createidea";
import useModal from "./../useModal";

export default function IdeaBoard() {
    const { isVisible, toggle } = useModal();

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
            {isVisible && (
                <CreateIdea
                    isVisible={isVisible}
                    hide={toggle}
                    backdrop={true}
                />
            )}
        </React.Fragment>
    );
}
