import React, { useEffect, useState } from "react";
/* import IdeaRequestButton from "./idearequestbutton";
import IdeaVoting from "./ideavoting";
import { useDispatch, useSelector } from "react-redux";
import { recieveIdeas } from "./../actions"; */
import axios from "./../axios";
import { Link } from "react-router-dom";

//import { useStatefulFields } from "./../usestatefulfields";
//import { useAuthSubmit } from "./../useauthsubmit";
//import IdeaBoard from "./ideaboard";

export default function ideaModal(props) {
    const [idea, setIdea] = useState();
    console.log("ideaModal props: ", props);

    useEffect(() => {
        // dispatch(recieveIdeas());
        async function fetchData() {
            const result = await axios.get(
                `/idea/${props.match.params.id}.json`
            );
            setIdea(result.data.data);
        }
        fetchData();
    }, []);
    console.log("idea: ", idea);
    const ideaInfo = typeof idea;
    console.log("ideaInfo: ", ideaInfo);

    if (!idea) {
        return null;
    }
    //console.log("ideaInfo: ", idea.id);
    // const idea = data;
    //const results = axios.get(`/idea/${idea.id}`);

    return (
        <React.Fragment>
            <div className="idea-expanded">
                <div className="modal">
                    <div className="overlay"></div>
                    <div className="modal-ctr">
                        <Link to={"/"}>
                            <div className="close-button">
                                <span className="close-modal-left"></span>
                                <span className="close-modal-right"></span>
                            </div>
                        </Link>

                        {/* {error && <p className="error">{error}</p>} */}

                        <h3>{idea.idea_title}</h3>
                        {/* <IdeaRequestButton otherUserId={ideaExpanded.id} /> */}
                        <div className="card-creator">
                            <p className="body-2">@rosariadevelops</p>
                        </div>
                        <div className="card-votes">
                            <div className="card-votes-up">
                                <div className="heart"></div>
                                <p className="body-2">{idea.vote_up}</p>
                            </div>
                            <div className="card-votes-down">
                                <div className="heart"></div>
                                <p className="body-2">{idea.vote_down}</p>
                            </div>
                        </div>
                        <div className="card-bottom">
                            <div className="card-title">
                                <p>{idea.idea_desc}</p>
                            </div>
                            <div className="card-stack">
                                <p className="caption">{idea.idea_stack}</p>
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
            </div>
        </React.Fragment>
    );
}
