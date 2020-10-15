import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { socket } from "./../socket";

export default function ideaComments() {
    //
    const comments = useSelector((state) => state && state.comments);
    const elemRef = useRef();
    console.log("comments in component: ", comments);

    useEffect(() => {
        if (elemRef.current) {
            elemRef.current.scrollTop =
                elemRef.current.scrollHeight - elemRef.current.clientHeight;
        }
    }, [comments]);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("Latest comment", e.target.value);
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
                                    <div className="msg-img-ctr"></div>
                                    <div className="msg-content">
                                        <p>
                                            {comment.firstname}{" "}
                                            {comment.lastname}
                                        </p>
                                        <h4>{comment.comment}</h4>
                                    </div>
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
