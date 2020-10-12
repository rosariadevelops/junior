import React, { useEffect } from "react";
import IdeaRequestButton from "./idearequestbutton";
import { useDispatch, useSelector } from "react-redux";
import { recieveIdeas } from "./../actions";

//import { useStatefulFields } from "./../usestatefulfields";
//import { useAuthSubmit } from "./../useauthsubmit";
//import IdeaBoard from "./ideaboard";

export default function createIdeaModal({ hide, idea }) {
    //const [value, handleChange] = useStatefulFields();
    //const dispatch = useDispatch();
    //const [error, handleSubmit] = useAuthSubmit("/idea-to-project/request", value);

    const ideaExpanded = idea[0];
    console.log("idea IDEAMODAL: ", ideaExpanded);
    /* useEffect(() => {
        dispatch(recieveIdeas());
    }, []); */

    return (
        <React.Fragment>
            <div className="modal">
                <div className="overlay"></div>
                <div className="idea-expanded">
                    <div className="close-button" onClick={hide}>
                        <a>
                            <span className="close-modal-left"></span>
                            <span className="close-modal-right"></span>
                        </a>
                    </div>
                    {/* {error && <p className="error">{error}</p>} */}

                    <h3>{idea.idea_title}</h3>
                    <IdeaRequestButton otherUserId={1} />
                    <div className="card-creator">
                        <p className="body-2">@rosariadevelops</p>
                    </div>
                    <div className="card-votes">
                        <div className="card-votes-up">
                            <div className="heart"></div>
                            <p className="body-2">{ideaExpanded.vote_up}</p>
                        </div>
                        <div className="card-votes-down">
                            <div className="heart"></div>
                            <p className="body-2">{ideaExpanded.vote_down}</p>
                        </div>
                    </div>
                    <div className="card-bottom">
                        <div className="card-title">
                            <h5>{ideaExpanded.idea_title}</h5>
                            <p>{ideaExpanded.idea_desc}</p>
                        </div>
                        <div className="card-stack">
                            <p className="caption">{ideaExpanded.idea_stack}</p>
                        </div>
                    </div>
                    {/* <button
                        onClick={handleSubmit}
                        type="submit"
                        name="submitted"
                        value="collaboration"
                    >
                        Request Collaboration
                    </button> */}
                </div>
            </div>
        </React.Fragment>
    );
}
