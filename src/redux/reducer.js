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
        console.log("ACCEPT COLAB REDUCER: ", state);
    } else if (action.type === "GETTING ALL VOTES UP") {
        let incrementedArr = state.ideas.map((idea) => {
            if (idea.id === action.votesUp.cardId) {
                console.log("ALL VOTES UP REDUCER: ", action.votesUp);
                state = {
                    ...state,
                    cardId: action.votesUp.cardId,
                    voteUps: action.votesUp.upVotes,
                };
            } else {
                return idea;
            }
        });
        //console.log("REDCUER STATE? ", state);
        return {
            ...state,
            ideas: incrementedArr,
        };
    } else if (action.type === "GETTING ALL VOTES DOWN") {
        let incrementedArr = state.ideas.map((idea) => {
            if (idea.id === action.votesDown.cardId) {
                console.log(
                    "ALL VOTES DOWN REDUCER: ",
                    action.votesDown.downVotes
                );
                state = {
                    ...state,
                    voteUps: action.votesDown.downVotes,
                };
            } else {
                return idea;
            }
        });
        //console.log("REDCUER STATE? ", state);
        return {
            ...state,
            ideas: incrementedArr,
        };

        /* console.log("ALL VOTES DOWN REDUCER: ", action);
        state = {
            ...state,
            voteDowns: action.allVotesDown,
        }; */
    } else if (action.type === "NEW VOTE UP ADDED") {
        //console.log("NEW VOTE UP ADDED REDUCER: ", action);
        //action.newUpVote.newUpVoteValue
        let incrementedArr = state.ideas.map((idea) => {
            if (idea.id === action.newUpVote.cardId) {
                console.log("REDCUER IDEA? ", idea);
                return {
                    ...idea,
                    newUpVote: action.newUpVote.newUpVoteValue,
                };
            } else {
                return idea;
            }
        });
        //console.log("REDCUER STATE? ", state);
        return {
            ...state,
            ideas: incrementedArr,
        };

        /*         state = {
            ...state,
            voteUps: action.newUpVote,
        }; */
    } else if (action.type === "NEW VOTE DOWN ADDED") {
        //console.log("NEW VOTE DOWN ADDED REDUCER: ", action);
        let incrementedArr = state.ideas.map((idea) => {
            if (idea.id === action.newDownVote.cardId) {
                console.log("REDCUER IDEA? ", idea);
                return {
                    ...idea,
                    newDownVote: action.newDownVote.newDownVoteValue,
                };
            } else {
                return idea;
            }
        });
        return {
            ...state,
            ideas: incrementedArr,
        };
    }
    console.log("REDCUER STATE? ", state);
    return state;
}
