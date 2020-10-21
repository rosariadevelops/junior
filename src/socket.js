import * as io from "socket.io-client";
import {
    renderVotes,
    addNewVoteUp,
    addNewVoteDown,
    ideaComments,
    addNewComment,
} from "./redux/actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
    }

    socket.on("votes", (votes) => {
        store.dispatch(renderVotes(votes));
        //console.log("ALL VOTES SOCKET: ", votes);
    });

    socket.on("newUpVote", (votes) => {
        // console.log("Adding a new up vote ", votes);
        store.dispatch(addNewVoteUp(votes));
    });

    socket.on("newDownVote", (votes) => {
        //console.log("Adding a new down vote ", votes);
        store.dispatch(addNewVoteDown(votes));
    });

    socket.on("ideaComments", (comments) => {
        store.dispatch(ideaComments(comments));
        //console.log("LATEST COMMENTS SOCKET: ", comments);
    });

    socket.on("newComment", (cmnt) => {
        //console.log(" Got a comment in the client. My comment is: ", cmnt);
        store.dispatch(addNewComment(cmnt));
    });
};
