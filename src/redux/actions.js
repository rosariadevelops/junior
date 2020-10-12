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
        type: "ACCEPT FRIEND",
        status: data.status,
        accepted: data.accepted,
        id: otherUserId,
    };
}
