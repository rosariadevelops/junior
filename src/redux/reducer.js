export default function (state = {}, action) {
    if (action.type == "RECIEVE IDEAS") {
        state = Object.assign({}, state, {
            ideas: action.ideas,
        });
    } else if (action.type === "ACCEPT COLAB") {
        state = {
            ...state,
            users: state.users.map((user) => {
                //console.log("action.id", action.id);
                //console.log("user.id: ", user.id);
                if (action.id === user.id) {
                    console.log("made it to the IF", user);
                    return {
                        ...user,
                        accepted: true,
                    };
                } else {
                    return user;
                }
            }),
        };
        //console.log("ACCEPT FRIEND REDUCER: ", state.user);
    } else if (action.type === "GETTING ALL VOTES UP") {
        console.log("ALL VOTES UP REDUCER: ", action);
        state = {
            ...state,
            voteUps: action.allVotesUp,
        };
    } else if (action.type === "GETTING ALL VOTES DOWN") {
        console.log("ALL VOTES DOWN REDUCER: ", action);
        state = {
            ...state,
            voteDowns: action.allVotesDown,
        };
    } else if (action.type === "NEW VOTE UP ADDED") {
        console.log("NEW VOTE UP ADDED REDUCER: ", action);
        state = {
            ...state,
            voteUpAdded: action.votesUp,
        };
    } else if (action.type === "NEW VOTE DOWN ADDED") {
        console.log("NEW VOTE DOWN ADDED REDUCER: ", action);
        state = {
            ...state,
            voteDownAdded: action.votesDown,
        };
    }
    console.log("STATE REDUCER: ", state);
    return state;
}
