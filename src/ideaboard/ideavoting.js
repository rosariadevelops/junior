import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "./../socket";

export default function ideaVoting(props) {
    const initialUpVotes = useSelector((state) => {
        const resultIdea = state.ideas.filter((idea) => idea.id === props.id);
        const resultVoteUp = resultIdea[0].vote_up;
        return resultVoteUp;
    });
    const initialDownVotes = useSelector((state) => {
        const resultIdea = state.ideas.filter((idea) => idea.id === props.id);
        const resultVoteDown = resultIdea[0].vote_down;
        return resultVoteDown;
    });

    const [upVote, setUpVote] = useState(initialUpVotes);
    const [downVote, setDownVote] = useState(initialDownVotes);

    function handleInsertUp() {
        let newUpVotes = upVote + 1;

        setUpVote(newUpVotes);
        let insertUpObj = {
            cardId: props.id,
            count: newUpVotes,
        };

        socket.emit(`Up Vote on Card`, insertUpObj);
    }

    function handleInsertDown() {
        let newDownVotes = downVote + 1;

        setDownVote(newDownVotes);
        let insertDownObj = {
            cardId: props.id,
            count: newDownVotes,
        };

        socket.emit(`Down Vote on Card`, insertDownObj);
    }

    useEffect(() => {
        socket.emit(`Card Id`, props.id);
        setUpVote(initialUpVotes);
        setDownVote(initialDownVotes);
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
