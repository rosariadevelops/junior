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
    }
    console.log("RECIEVE IDEAS REDUCER: ", state.ideas);
    return state;
}
