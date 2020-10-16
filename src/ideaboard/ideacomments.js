import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { socket } from "./../socket";

export default function ideaComments({ ideaId }) {
    //console.log("ideaId comments: ", ideaId);
    const comments = useSelector((state) => state && state.comments);
    const elemRef = useRef();
    //console.log("comments in component: ", comments);

    useEffect(() => {
        if (elemRef.current) {
            elemRef.current.scrollTop =
                elemRef.current.scrollHeight - elemRef.current.clientHeight;
        }
    }, [comments]);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("Latest comment", e.target.value, ideaId);
            e.target.value = "";
        }
    };

    if (!comments) {
        return null;
    }

    return (
        <div className="cmt-container">
            <div className="cmt-constrain">
                <div className="cmt-ctr" ref={elemRef}>
                    {comments &&
                        comments.map(function (comment) {
                            return (
                                <div className="comment" key={comment.id}>
                                    {/* <div className="msg-img-ctr"></div> */}
                                    {/* <div className="msg-content"> */}
                                    <p className="cmt-name">
                                        {comment.firstname} {comment.lastname}
                                    </p>
                                    <p className="cmt">{comment.comment}</p>
                                    {/* </div> */}
                                </div>
                            );
                        })}
                </div>

                <textarea
                    placeholder="Add your message here"
                    cols="80"
                    rows="2"
                    onKeyDown={keyCheck}
                ></textarea>
            </div>
        </div>
    );
}
