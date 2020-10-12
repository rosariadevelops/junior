import React from "react";
//import IdeaConnection from "./ideaboard/ideaconnection";
//import IdeaVoting from "./ideaboard/ideavoting";

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
                    <div className="card-votes-up">
                        <div className="heart"></div>
                        <p className="body-2">{idea.vote_up}</p>
                    </div>
                    <div className="card-votes-down">
                        <div className="heart"></div>
                        <p className="body-2">{idea.vote_down}</p>
                    </div>
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
