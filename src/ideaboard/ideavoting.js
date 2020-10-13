import React, { useState /* , useEffect  */ } from "react";
import { useSelector } from "react-redux";
import { socket } from "./../socket";

export default function ideaVoting(props) {
    const voteUps = useSelector((state) => state && state.voteUps);
    const votesDown = useSelector((state) => state && state.voteDowns);
    const [upVote, setUpVote] = useState(voteUps);
    const [downVote, setDownVote] = useState(votesDown);

    function insertUp() {
        //e.preventDefault();
        setUpVote(upVote + 1);
        let insertUpObj = {
            cardId: props.id,
            count: upVote + 1,
        };
        socket.emit(`Up Vote on Card`, insertUpObj);
    }

    function insertDown() {
        //e.preventDefault();
        setDownVote(downVote + 1);
        let insertDownObj = {
            cardId: props.id,
            count: downVote + 1,
        };
        socket.emit(`Down Vote on Card`, insertDownObj);
    }

    console.log(`PROPS OF CARD ${props.id}`, props);
    /* if (!votesUp || !votesDown) {
        return null;
    } */

    return (
        <React.Fragment>
            <div className="card-votes-up" onClick={() => insertUp()}>
                <div className="heart"></div>
                <p className="body-2">{voteUps}</p>
            </div>
            <div className="card-votes-down" onClick={() => insertDown()}>
                <div className="heart"></div>
                <p className="body-2">{votesDown}</p>
            </div>
        </React.Fragment>
    );
}
