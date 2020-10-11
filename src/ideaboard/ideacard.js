import React from "react";
//import IdeaConnection from "./ideaboard/ideaconnection";
//import IdeaVoting from "./ideaboard/ideavoting";

export default function IdeaCard() {
    return (
        <div className="idea-card">
            {/* <Link to={}></Link> */}
            <div className="card-top">
                <div className="card-creator">
                    <p className="body-2">@rosariadevelops</p>
                </div>
                <div className="card-votes">
                    <div className="card-votes-up">
                        <div className="heart"></div>
                        <p className="body-2">13</p>
                    </div>
                    <div className="card-votes-down">
                        <div className="heart"></div>
                        <p className="body-2">13</p>
                    </div>
                </div>
            </div>
            <div className="card-title">
                <h5>
                    Example title to be replaced with react title when ready
                </h5>
            </div>
            <div className="card-stack">
                <p className="caption">React.js</p>
                <p className="caption">Socket.io</p>
                <p className="caption">Node.js</p>
                <p className="caption">Express</p>
            </div>
        </div>
    );
}
