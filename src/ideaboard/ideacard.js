import React from "react";
import IdeaVoting from "./ideavoting";
import { Link } from "react-router-dom";

export default function IdeaCard({ idea }) {
    console.log("Idea ID", idea.id);
    //const { isVisible, toggle } = useModal();
    //const ideasList = ideas.ideas;
    return (
        <div className="idea-card">
            <Link to={"/idea/" + idea.id}>
                <div className="card-top">
                    <div className="card-creator">
                        <p className="body-2">@rosariadevelops</p>
                    </div>
                    <div className="card-votes">
                        <IdeaVoting
                            voteUp={idea.vote_up}
                            voteDown={idea.vote_down}
                        />
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
            </Link>
        </div>
    );
}
