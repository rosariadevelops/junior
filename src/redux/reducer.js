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
    } else if (action.type === "GETTING ALL VOTES") {
        state = {
            ...state,
            ideas: state.ideas.map((idea) => {
                const actionVotes = action.votes;
                if (idea.id === actionVotes.cardId) {
                    return {
                        ...idea,
                        vote_up: actionVotes.serverVoteUp,
                        vote_down: actionVotes.serverVoteDown,
                    };
                } else {
                    return idea;
                }
            }),
        };
        console.log("ACTION VOTES REDUCER: ", state);
    } else if (action.type === "NEW VOTE UP ADDED") {
        state = {
            ...state,
            ideas: state.ideas.map((idea) => {
                const actionVotes = action.votes;
                if (idea.id === actionVotes.cardId) {
                    return {
                        ...idea,
                        vote_up: actionVotes.serverVoteUp,
                        vote_down: actionVotes.serverVoteDown,
                    };
                } else {
                    return idea;
                }
            }),
        };
    } else if (action.type === "NEW VOTE DOWN ADDED") {
        state = {
            ...state,
            ideas: state.ideas.map((idea) => {
                const actionVotes = action.votes;
                if (idea.id === actionVotes.cardId) {
                    return {
                        ...idea,
                        vote_up: actionVotes.serverVoteUp,
                        vote_down: actionVotes.serverVoteDown,
                    };
                } else {
                    return idea;
                }
            }),
        };
    } else if (action.type === "LATEST COMMENTS") {
        //console.log("LATEST COMMENTS REDUCER: ", action);

        const filteredComments = action.comments.reverseComments.filter(
            (comment) => comment.idea_id === action.comments.cardId
        );
        //console.log("filtered Comments: ", state);
        state = {
            ...state,
            comments: filteredComments,
        };
    } else if (action.type === "NEW COMMENT ADDED") {
        //console.log("NEW COMMENT ADDED REDUCER: ", action);

        state = {
            ...state,
            comments: [...state.comments, action.newComment],
        };
    }

    return state;
}
