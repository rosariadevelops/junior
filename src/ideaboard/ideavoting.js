import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
//import { socket } from "./socket";

export default function ideaVoting(props) {
    console.log("idea voting props: ", props);
    const [upVote, setUpVote] = useState(props.voteUp);
    const [downVote, setDownVote] = useState(props.voteDown);
    //let incrementCount = setUpVote(upVote + 1);
    //const elemRef = useRef();
    const votesUp = useSelector((state) => state && state.votesUp);
    const votesDown = useSelector((state) => state && state.votesDown);

    useEffect(() => {
        // dispatch(recieveIdeas());
    }, []);

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
