export default function (state = {}, action) {
    if (action.type == "RECIEVE IDEAS") {
        state = Object.assign({}, state, {
            ideas: action.ideas,
        });
    } else if (action.type === "ACCEPT COLAB") {
        state = {
            ...state,
            status: state.data.map((user) => {
                console.log("action.id", action);
                console.log("user.id: ", user);
                /* if (action.id === user.id) {
                    console.log("made it to the IF", user);
                    return {
                        ...user,
                        accepted: true,
                    };
                } else {
                    return user;
                } */
            }),
        };
        //console.log("ACCEPT COLAB REDUCER: ", state);
    } else if (action.type === "GETTING ALL VOTES") {
        //console.log("ACTION VOTES UP REDUCER: ", state);
        // let incrementedArr =
        state.ideas &&
            state.ideas.map((idea) => {
                console.log("idea logging: ", action.votes);
                if (idea.id === action.votes.cardId) {
                    /* console.log(
                        `IDEA GETTING ALL VOTES REDUCER ${idea.id}: `,
                        idea
                    );
                    console.log(
                        `ACTION VOTES REDUCER  ${idea.id}: `,
                        action.votes
                    ); */
                    return (state = {
                        ...idea,
                        //cardId: action.votes.cardId,
                        votes: action.votes,
                    });
                } else {
                    return idea;
                }
            });
        console.log(`State for this card ${action.votes.cardId}`, state);
        return {
            ...state,
        };
    } else if (action.type === "NEW VOTE UP ADDED") {
        /* console.log(
            "NEW VOTE UP ADDED ACTION INSIDE REDUCER: ",
            action.votes.votes.vote_up
        ); */
        state.ideas &&
            state.ideas.map((idea) => {
                if (idea.id === action.votes.cardId) {
                    console.log(
                        "NEW VOTE UP ADDED IDEA INSIDE REDUCER: ",
                        idea
                    );
                    return {
                        ...idea,
                        vote_up: action.votes.votes.vote_up,
                    };
                } else {
                    return idea;
                }
            });
        return {
            ...state,
            //newUpVoteValue: newUpVoteValue,
        };
    } else if (action.type === "NEW VOTE DOWN ADDED") {
        /* console.log(
            "NEW VOTE DOWN ADDED ACTION INSIDE REDUCER: ",
            action.votes
        ); */
        state.ideas &&
            state.ideas.map((idea) => {
                if (idea.id === action.votes.cardId) {
                    console.log(
                        "NEW VOTE UP ADDED IDEA INSIDE REDUCER: ",
                        idea
                    );
                    return {
                        ...idea,
                        vote_down: action.votes.votes.vote_down,
                    };
                } else {
                    return idea;
                }
            });
        return {
            ...state,
            //newUpVoteValue: newUpVoteValue,
        };
    } else if (action.type === "LATEST COMMENTS") {
        console.log("LATEST COMMENTS REDUCER: ", action);
        // action.comments.senders.sender_id
        const senders = action.comments.slice(-1)[0];
        const allSenders = senders.senders;
        //const singleSender = allSenders.senders.filter((sender) => sender.id);

        const filteredComments = action.comments.filter(
            (comment) => comment.idea_id === state.id
        );
        /* const allComments = allSenders.senders.filter(
            (sender) => sender.sender_id === singleSender.id
        ); */

        let allCommentData = [];
        for (let i = 0; i < filteredComments.length; ++i) {
            for (let j = 0; j < allSenders.length; ++j) {
                if (filteredComments[i].sender_id === allSenders[j].sender_id) {
                    let singleComment = Object.assign(
                        filteredComments[i],
                        allSenders[j]
                    );
                    allCommentData.push(singleComment);
                }
            }
        }

        console.log("filtered Comments: ", allCommentData);
        console.log("filtered Senders: ", allSenders);
        state = {
            ...state,
            comments: allCommentData,
        };
    } else if (action.type === "NEW COMMENT ADDED") {
        //console.log("NEW COMMENT ADDED REDUCER: ", action);
        state = {
            ...state,
            comments: [...state.comments, action.newComment],
        };
    }
    console.log("REDCUER STATE? ", state);
    return state;
}
