import * as io from "socket.io-client";
import {
    renderVotesUp,
    renderVotesDown,
    addNewVoteUp,
    addNewVoteDown,
} from "./redux/actions";
console.log(renderVotesUp, renderVotesDown, addNewVoteUp, addNewVoteDown);

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
    }

    socket.on("votesUp", (votesUp) => {
        store.dispatch(renderVotesUp(votesUp));
        console.log("ALL VOTES UP SOCKET: ", votesUp);
    });

    socket.on("votesDown", (votesDown) => {
        store.dispatch(renderVotesDown(votesDown));
        console.log("ALL VOTES DOWN SOCKET: ", votesDown);
    });

    socket.on("newUpVote", (newUpVote) => {
        //const newVoteUp = count.voteup;
        console.log("Adding a new up vote ", newUpVote);
        store.dispatch(addNewVoteUp(newUpVote));
    });

    socket.on("newDownVote", (newDownVote) => {
        //const newVoteDown = count.votedown;
        console.log("Adding a new down vote ", newDownVote);
        store.dispatch(addNewVoteDown(newDownVote));
    });
};
