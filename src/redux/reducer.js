export default function (state = {}, action) {
    if (action.type == "RECIEVE IDEAS") {
        state = Object.assign({}, state, {
            ideas: action.ideas,
        });
    }
    console.log("RECIEVE IDEAS REDUCER: ", state.ideas);
    return state;
}
