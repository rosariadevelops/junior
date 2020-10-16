import React, { useEffect, useState /* , useEffect  */ } from "react";
import { useSelector } from "react-redux";
import { socket } from "./../socket";

export default function ideaVoting(props) {
    //console.log("ideaVoting props: ", props);
    const initialUpVotes = useSelector(
        (state) => state.votes && state.votes.votes.vote_up
    );
    const initialDownVotes = useSelector(
        (state) => state.votes && state.votes.votes.vote_down
    );
    const [upVote, setUpVote] = useState(initialUpVotes);
    const [downVote, setDownVote] = useState(initialDownVotes);

    function handleInsertUp() {
        //e.preventDefault();
        let newUpVotes = upVote + 1;
        console.log("newUpVotes: ", newUpVotes);
        setUpVote(newUpVotes);
        let insertUpObj = {
            cardId: props.id,
            count: newUpVotes,
        };
        socket.emit(`Down Vote on Card`, insertUpObj);
        console.log("insertUpObj: ", insertUpObj);
    }

    function handleInsertDown() {
        //e.preventDefault();
        let newDownVotes = downVote + 1;
        console.log("newDownVotes: ", newDownVotes);
        setDownVote(newDownVotes);
        let insertDownObj = {
            cardId: props.id,
            count: newDownVotes,
        };
        socket.emit(`Down Vote on Card`, insertDownObj);
        console.log("insertDownObj: ", insertDownObj);
        //socket.broadcast.emit(`Down Vote on Card`, insertDownObj);
    }

    //console.log("initialVotes OUTSIDE USE EFFECT: ", initialUpVotes);
    //console.log("props.id ", props.id);

    useEffect(() => {
        socket.emit(`Card Id`, props.id);
        setUpVote(initialUpVotes);
        setDownVote(initialDownVotes);
        console.log("UP VOTES INSIDE USE EFFECT: ", upVote);
        console.log("DOWN VOTES INSIDE USE EFFECT: ", downVote);
    }, [initialUpVotes, initialDownVotes]);

    return (
        <React.Fragment>
            <div className="card-votes-up" onClick={() => handleInsertUp()}>
                <div className="heart"></div>
                <p className="body-2">{upVote}</p>
            </div>
            <div className="card-votes-down" onClick={() => handleInsertDown()}>
                <div className="heart"></div>
                <p className="body-2">{downVote}</p>
            </div>
        </React.Fragment>
    );
    //}
}
