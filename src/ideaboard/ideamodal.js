import React, { useEffect, useState } from "react";
import IdeaRequestButton from "./idearequestbutton";
import IdeaVoting from "./ideavoting";
import IdeaComments from "./ideacomments";
import { useDispatch } from "react-redux";
import { recieveIdeas } from "./../redux/actions";

import axios from "./../axios";
import { Link } from "react-router-dom";
import { socket } from "./../socket";

export default function ideaModal(props) {
    //console.log("ideaModal props: ", props);
    //const dispatch = useDispatch();
    const [idea, setIdea] = useState();
    const [userFirst, setUserFirst] = useState();
    const [userLast, setUserLast] = useState();
    // console.log("ideaModal props: ", props);

    useEffect(() => {
        //dispatch(recieveIdeas());
        // socket.emit(`Card Id`, props.match.params.id);
        async function fetchData() {
            const result = await axios.get(
                `/idea/${props.match.params.id}.json`
            );

            setIdea(result.data.data);
            console.log("idea USE EFFECT: ", result.data.data);
        }
        fetchData();
    }, []);
    //console.log("FETCH DATA IDEA DATA: ", idea);

    useEffect(() => {
        //socket.emit(`Card Id`, props.match.params.id);
        async function fetchUser() {
            const result = await axios.get(
                `/idea-creator/${props.match.params.id}.json`
            );
            setUserFirst(result.data.firstname);
            setUserLast(result.data.lastname);
        }
        fetchUser();
    }, []);

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

                        <div className="idea-cols">
                            <div className="idea-data">
                                <div className="card-votes">
                                    {idea && (
                                        <IdeaVoting
                                            voteUp={idea.vote_up}
                                            voteDown={idea.vote_down}
                                            id={idea.id}
                                        />
                                    )}
                                </div>
                                <h3>{idea.idea_title}</h3>
                                <div className="idea-modal card-top">
                                    <div className="card-creator">
                                        <p className="body-2">
                                            Posted by {userFirst} {userLast}
                                        </p>
                                    </div>
                                    <div className="card-age">
                                        <p className="caption">
                                            <span>End date: </span>
                                            {idea.age.days} days,{" "}
                                            {idea.age.months} months
                                        </p>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <p>
                                        <span>Description: </span>
                                        {idea.idea_desc}
                                    </p>
                                </div>
                                <div className="card-stack">
                                    <p className="caption stack-heading">
                                        <span>Intended Stack: </span>
                                    </p>
                                    <div className="stack-box">
                                        {idea.stack.map((item) => (
                                            <p key={item} className="stack-p">
                                                {item}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="idea-int">
                                <IdeaRequestButton
                                    otherUserId={idea.idea_dev_id}
                                    ideaId={idea.id}
                                />

                                <div className="card-comments">
                                    <p className="card-comments-heading">
                                        <span>Comments:</span>
                                    </p>
                                    <IdeaComments ideaId={idea.id} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
