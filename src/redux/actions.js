import axios from "./../axios";

export async function recieveIdeas() {
    const { data } = await axios.get("/ideaboard");
    console.log("RECIEVE IDEAS ACTIONS: ", data.ideas);
    return {
        type: "RECIEVE IDEAS",
        ideas: data.ideas,
    };
}

export async function acceptIdeaReq(otherUserId) {
    console.log("ACCEPT IDEA ID: ", otherUserId);
    const { data } = await axios.post(
        `/idea-status/${otherUserId}/accept-colab`
    );

    console.log("ACCEPT REQUEST: ", data);
    return {
        type: "ACCEPT COLAB",
        status: data.status,
        accepted: data.accepted,
        id: otherUserId,
    };
}

export async function renderVotesUp(votesUp) {
    console.log("GETTING ALL VOTES UP ACTIONS: ", votesUp);
    return {
        type: "GETTING ALL VOTES UP",
        allVotesUp: votesUp,
    };
}

export async function renderVotesDown(votesDown) {
    console.log("GETTING ALL VOTES DOWN ACTIONS: ", votesDown);
    return {
        type: "GETTING ALL VOTES DOWN",
        allVotesDown: votesDown,
    };
}

export async function addNewVoteUp(count) {
    console.log("NEW VOTE UP ACTION: ", count);
    return {
        type: "NEW VOTE UP ADDED",
        votesUp: count,
    };
}

export async function addNewVoteDown(count) {
    console.log("NEW VOTE DOWN ACTION: ", count);
    return {
        type: "NEW VOTE DOWN ADDED",
        votesDown: count,
    };
}
