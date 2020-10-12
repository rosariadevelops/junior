import React, { useState } from "react";

export default function ideaVoting() {
    const [upVote, setUpVote] = useState(0);
    const [downVote, setDownVote] = useState(0);
    //let incrementCount = setUpVote(upVote + 1);

    return (
        <React.Fragment>
            <div
                className="card-votes-up"
                onClick={() => setUpVote(upVote + 1)}
            >
                <div className="heart"></div>
                <p className="body-2">{upVote}</p>
            </div>
            <div
                className="card-votes-down"
                onClick={() => setDownVote(downVote + 1)}
            >
                <div className="heart"></div>
                <p className="body-2">{downVote}</p>
            </div>
        </React.Fragment>
    );
}
