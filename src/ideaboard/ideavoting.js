import React, { useEffect, useState /* , useEffect  */ } from "react";
import { useSelector } from "react-redux";
import { socket } from "./../socket";

export default function ideaVoting(props) {
    //console.log("ideaCARD: ", props);
    const initialUpVotes = useSelector(
        (state) => state.votes && state.votes.vote_up
    );
    const initialDownVotes = useSelector(
        (state) => state.votes && state.votes.votes.vote_down
    );
    const [upVote, setUpVote] = useState();
    const [downVote, setDownVote] = useState();

    function handleInsertUp() {
        //e.preventDefault();
        let newUpVotes = upVote + 1;
        console.log("newUpVotes: ", newUpVotes);
        setUpVote(newUpVotes);
    }

    function handleInsertDown() {
        //e.preventDefault();
        let newDownVotes = downVote + 1;
        console.log("newDownVotes: ", newDownVotes);
        setDownVote(newDownVotes);
    }

    useEffect(() => {
        socket.emit(`Card Id`, props.id);
        setUpVote(initialUpVotes);
        setDownVote(initialDownVotes);
    }, [initialUpVotes, initialDownVotes]);

    useEffect(() => {
        setUpVote(upVote);
        console.log("upVote INSIDE USE EFFECT: ", upVote);
        let insertUpObj = {
            cardId: props.id,
            count: upVote,
        };
        socket.emit(`Up Vote on Card`, insertUpObj);
        console.log("insertUpObj: ", insertUpObj);
    }, [upVote]);

    useEffect(() => {
        setUpVote(downVote);
        console.log("downVote INSIDE USE EFFECT: ", downVote);
        let insertDownObj = {
            cardId: props.id,
            count: downVote,
        };
        socket.emit(`Down Vote on Card`, insertDownObj);
        console.log("insertUpObj: ", insertDownObj);
    }, [downVote]);

    // console.log(`PROPS OF CARD ${props.id}`, props);
    /* if (!allUpVotes || !allDownVotes) {
        return (
            <React.Fragment>
                <div className="card-votes-up" onClick={() => handleInsertUp()}>
                    <div className="heart"></div>
                    <p className="body-2">{props.voteUp}</p>
                </div>
                <div
                    className="card-votes-down"
                    onClick={() => handleInsertDown()}
                >
                    <div className="heart"></div>
                    <p className="body-2">{props.voteDown}</p>
                </div>
            </React.Fragment>
        );
    } else { */
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
