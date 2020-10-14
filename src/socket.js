import * as io from "socket.io-client";
import {
    /* renderVotesUp,
    renderVotesDown, */
    renderVotes,
    addNewVoteUp,
    addNewVoteDown,
} from "./redux/actions";
//console.log(renderVotesUp, renderVotesDown, addNewVoteUp, addNewVoteDown);

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
    }

    socket.on("votes", (votes) => {
        store.dispatch(renderVotes(votes));
        //console.log("ALL VOTES SOCKET: ", votes);
    });

    /* socket.on("votesDown", (votesDown) => {
        store.dispatch(renderVotesDown(votesDown));
        //console.log("ALL VOTES DOWN SOCKET: ", votesDown);
    }); */

    socket.on("newUpVote", (votes) => {
        //const newVoteUp = count.voteup;
        console.log("Adding a new up vote ", votes);
        store.dispatch(addNewVoteUp(votes));
    });

    socket.on("newDownVote", (votes) => {
        //const newVoteDown = count.votedown;
        console.log("Adding a new down vote ", votes);
        store.dispatch(addNewVoteDown(votes));
    });
};
