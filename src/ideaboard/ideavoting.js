import React, { useEffect, useState /* , useEffect  */ } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "./../socket";
//import { renderVotes } from "./../redux/actions";

export default function ideaVoting(props) {
    //const dispatch = useDispatch();
    console.log("ideaVoting props: ", props.id);

    const initialUpVotes = useSelector((state) => {
        const resultIdea = state.ideas.filter((idea) => idea.id === props.id);
        const resultVoteUp = resultIdea[0].vote_up;
        console.log("resultIdea: ", resultVoteUp);
        // state.ideas && state.ideas.vote_up;
        return resultVoteUp;
    });
    const initialDownVotes = useSelector((state) => {
        const resultIdea = state.ideas.filter((idea) => idea.id === props.id);
        const resultVoteDown = resultIdea[0].vote_down;
        console.log("resultIdea: ", resultVoteDown);
        // state.ideas && state.ideas.vote_up;
        return resultVoteDown;
    });

    const [upVote, setUpVote] = useState(initialUpVotes);
    const [downVote, setDownVote] = useState(initialDownVotes);
    console.log("initialUpVotes: ", initialUpVotes);
    console.log("initialDownVotes: ", initialDownVotes);

    function handleInsertUp() {
        //e.preventDefault();
        let newUpVotes = upVote + 1;
        console.log("newUpVotes: ", newUpVotes);
        setUpVote(newUpVotes);
        let insertUpObj = {
            cardId: props.id,
            count: newUpVotes,
        };
        socket.emit(`Up Vote on Card`, insertUpObj);
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
