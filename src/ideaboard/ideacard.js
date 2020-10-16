import React, { useState, useEffect, useSelector } from "react";
import IdeaVoting from "./ideavoting";
import { Link } from "react-router-dom";
import axios from "./../axios";
import { socket } from "./../socket";

export default function IdeaCard({ idea }) {
    const [userFirst, setUserFirst] = useState();
    const [userLast, setUserLast] = useState();

    useEffect(() => {
        // socket.emit(`Card Id`, props.match.params.id);
        async function fetchUser() {
            const result = await axios.get(`/idea-creator/${idea.id}.json`);
            setUserFirst(result.data.firstname);
            setUserLast(result.data.lastname);
        }
        fetchUser();
    }, []);

    return (
        <div className="idea-card">
            <Link to={"/idea/" + idea.id}>
                <div className="card-top">
                    <div className="card-creator">
                        <p className="body-2">
                            {" "}
                            Posted by {userFirst} {userLast}
                        </p>
                    </div>
                    <div className="card-votes">
                        <IdeaVoting
                            id={idea.id}
                            voteUp={idea.vote_up}
                            voteDown={idea.vote_down}
                        />
                        {/* <div className="card-votes-up">
                            <div className="heart"></div>
                            <p className="body-2">{idea.vote_up}</p>
                        </div>
                        <div className="card-votes-down">
                            <div className="heart"></div>
                            <p className="body-2">{idea.vote_down}</p>
                        </div> */}
                    </div>
                </div>
                <div className="card-bottom">
                    <div className="card-title">
                        <h5>{idea.idea_title}</h5>
                    </div>
                    <div className="card-stack">
                        {idea.stack.map((item) => (
                            <p key={item} className="caption">
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
            </Link>
        </div>
    );
}
