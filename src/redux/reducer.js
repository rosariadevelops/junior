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
        state = {
            ...state,
            ideas: state.ideas.map((idea) => {
                //console.log("idea logging: ", action.votes);
                const actionVotes = action.votes;
                console.log("HJFBHJSB: ", actionVotes);
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
        //console.log("NEW VOTE UP ADDED ACTION INSIDE REDUCER: ", action.votes);
        state = {
            ...state,
            ideas: state.ideas.map((idea) => {
                //console.log("idea logging: ", action.votes);
                const actionVotes = action.votes;
                console.log("HJFBHJSB: ", actionVotes);
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

        /* state.ideas &&
            state.ideas.map((idea) => {
                console.log("NEW VOTE UP ADDED IDEA INSIDE REDUCER: ", idea);
                if (idea.id === action.votes.cardId) {
                    /* console.log(
                        "NEW VOTE UP ADDED IDEA INSIDE REDUCER: ",
                        idea
                    ); 
                    return {
                        ...idea,
                        vote_up: action.votes.vote_up,
                    };
                } else {
                    return idea;
                }
            }); */
    } else if (action.type === "NEW VOTE DOWN ADDED") {
        /* console.log(
            "NEW VOTE DOWN ADDED ACTION INSIDE REDUCER: ",
            action.votes
        ); */
        state = {
            ...state,
            ideas: state.ideas.map((idea) => {
                //console.log("idea logging: ", action.votes);
                const actionVotes = action.votes;
                console.log("HJFBHJSB: ", actionVotes);
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

        /* state.ideas &&
            state.ideas.map((idea) => {
                if (idea.id === action.votes.cardId) {
                    console.log(
                        "NEW VOTE DOWN ADDED IDEA INSIDE REDUCER: ",
                        idea
                    );
                    return {
                        ...idea,
                        vote_down: action.votes.votes.vote_down,
                    };
                } else {
                    return idea;
                }
            }); */
    } else if (action.type === "LATEST COMMENTS") {
        console.log("LATEST COMMENTS REDUCER: ", action);

        //const featuredCard = state.ideas.filter((idea) => idea.id);
        //console.log("featuredCard: ", featuredCard);

        const filteredComments = action.comments.reverseComments.filter(
            (comment) => comment.idea_id === action.comments.cardId
        );
        console.log("filtered Comments: ", state);
        state = {
            ...state,
            comments: filteredComments,
        };
        console.log("LATEST COMMENTS REDUCER: ", state);
    } else if (action.type === "NEW COMMENT ADDED") {
        console.log("NEW COMMENT ADDED REDUCER: ", action);
        state = {
            ...state,
            comments: [...state.comments, action.newComment],
        };
    }
    //console.log("REDCUER STATE? ", state);
    return state;
}
