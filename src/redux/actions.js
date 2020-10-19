import axios from "./../axios";

export async function recieveIdeas() {
    const { data } = await axios.get("/ideaboard");
    //console.log("RECIEVE IDEAS ACTIONS: ", data.ideas);
    return {
        type: "RECIEVE IDEAS",
        ideas: data.ideas,
    };
}

export async function acceptIdeaReq(ideaId, otherUserId) {
    console.log("ACCEPT IDEA ID: ", otherUserId);
    const { data } = await axios.post(
        `/idea-status/${ideaId}/${otherUserId}/accept-colab`
    );

    console.log("ACCEPT REQUEST: ", data);
    return {
        type: "ACCEPT COLAB",
        data,
        status: data.status,
        accepted: data.accepted,
        id: otherUserId,
    };
}

export async function renderVotes(votes) {
    //console.log("GETTING ALL VOTES ACTIONS: ", votes);
    return {
        type: "GETTING ALL VOTES",
        votes,
    };
}

/* export async function renderVotesUp(votesUp) {
    console.log("GETTING ALL VOTES UP ACTIONS: ", votesUp);
    return {
        type: "GETTING ALL VOTES UP",
        votesUp: votesUp,
    };
} */

export async function renderVotesDown(votesDown) {
    //console.log("GETTING ALL VOTES DOWN ACTIONS: ", votesDown);
    return {
        type: "GETTING ALL VOTES DOWN",
        votesDown: votesDown,
    };
}

export async function addNewVoteUp(votes) {
    //console.log("NEW VOTE UP ACTION: ", votes);
    return {
        type: "NEW VOTE UP ADDED",
        votes: votes,
    };
}

export async function addNewVoteDown(votes) {
    //console.log("NEW VOTE DOWN ACTION: ", votes);
    return {
        type: "NEW VOTE DOWN ADDED",
        votes: votes,
    };
}

export async function ideaComments(comments) {
    console.log("LATEST COMMENTS ACTIONS: ", comments);
    return {
        type: "LATEST COMMENTS",
        comments: comments,
    };
}

export async function addNewComment(cmnt) {
    console.log("NEW COMMENT ACTION: ", cmnt);
    return {
        type: "NEW COMMENT ADDED",
        newComment: cmnt,
    };
}
