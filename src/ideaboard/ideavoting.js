import React, { useState /* , useEffect  */ } from "react";
import { useSelector } from "react-redux";
import { socket } from "./../socket";

export default function ideaVoting(props) {
    console.log("ideaCARD: ", props.id);
    //socket.emit(`Card Id`, props.id);
    const votesUp = useSelector((state) => state && state.ideas.vote_up);
    //console.log("voteUps: ", props.voteUp);
    const votesDown = useSelector((state) => state && state.ideas.vote_down);
    //console.log("voteDowns: ", props.voteDown);
    const newVoteUps = useSelector((state) => {
        for (let i = 0; i < state.ideas.length; ++i) {
            if (state.ideas[i].id === props.id) {
                /* console.log(
                    `component state UP of ${props.id}: `,
                    state.ideas[i]
                ); */
                state && state.ideas[i].vote_up;
            }
        }
    });
    console.log(`component state UP of ${props.id}: `, newVoteUps);
    const newVotesDown = useSelector((state) => {
        //console.log(`component state DOWN of ${props.id}: `, state);
        state && state.newDownVote;
    });
    const [upVote, setUpVote] = useState(votesUp);
    const [downVote, setDownVote] = useState(votesDown);

    //useselector .find

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
                <p className="body-2">{upVote}</p>
            </div>
            <div className="card-votes-down" onClick={() => insertDown()}>
                <div className="heart"></div>
                <p className="body-2">{downVote}</p>
            </div>
        </React.Fragment>
    );
}
