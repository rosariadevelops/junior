import React from "react";
import IdeaVoting from "./ideavoting";

export default function IdeaCard({ idea }) {
    console.log("working INSIDE?", idea);
    //const { isVisible, toggle } = useModal();
    //const ideasList = ideas.ideas;
    return (
        <div className="idea-card" /* onClick={toggle} */>
            <div className="card-top">
                <div className="card-creator">
                    <p className="body-2">@rosariadevelops</p>
                </div>
                <div className="card-votes">
                    <IdeaVoting />
                </div>
            </div>
            <div className="card-bottom">
                <div className="card-title">
                    <h5>{idea.idea_title}</h5>
                </div>
                <div className="card-stack">
                    <p className="caption">{idea.idea_stack}</p>
                </div>
            </div>
        </div>
    );
}
