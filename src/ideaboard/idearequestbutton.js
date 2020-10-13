import React, { useState, useEffect } from "react";
import axios from "./../axios";

export default function friendRequest({ otherUserId }) {
    const [requestStatus, setrequestStatus] = useState("");
    console.log("outside useEffect: ", otherUserId);

    useEffect(() => {
        let abort;
        (async () => {
            console.log("otherUserId: ", otherUserId);
            const { data } = await axios.get(`/idea-status/${otherUserId}`);
            console.log("DATA DATA DATA: ", data);
            if (!abort) {
                setrequestStatus(data.buttonText);
            }
        })();
        return () => {
            abort = true;
        };
    });

    function sendStatus() {
        console.log("requestStatus: ", requestStatus);
        //let abort;
        //(async () => {
        if (requestStatus === "Request colaboration") {
            //setButtonClick();
            console.log("requestStatus: REQUEST COLAB");
            axios
                .post(`/idea-status/${otherUserId}/request-colab`)
                .then(({ data }) => {
                    console.log("/request-colab response: ", data);
                    requestStatus(data.status);
                })
                .catch(function (err) {
                    console.log(
                        "err in form POST /idea-status/request-colab: ",
                        err
                    );
                });
        }

        if (requestStatus === "Cancel colaboration") {
            console.log("requestStatus: CANCEL COLAB");
            axios
                .post(`/idea-status/${otherUserId}/cancel-colab`)
                .then(({ data }) => {
                    console.log("/cancel-colab response: ", data);
                    requestStatus(data.status);
                })
                .catch(function (err) {
                    console.log(
                        "err in form POST /idea-status/cancel-colab: ",
                        err
                    );
                });
        }

        if (requestStatus === "Accept colaboration") {
            console.log("requestStatus: ACCEPT COLAB");
            axios
                .post(`/idea-status/${otherUserId}/accept-colab`)
                .then(({ data }) => {
                    console.log("/accept-colab response: ", data);
                    requestStatus(data.status);
                })
                .catch(function (err) {
                    console.log(
                        "err in form POST /idea-status/accept-colab: ",
                        err
                    );
                });
        }

        /* if (requestStatus === "Delete friend") {
            console.log("friendshipStatus: DELETE FRIENDSHIP");
            axios
                .post(`/friend-status/${otherUserId}/delete-friend`)
                .then(({ data }) => {
                    console.log("/add-friend response: ", data);
                    setfriendshipStatus(data.status);
                })
                .catch(function (err) {
                    console.log(
                        "err in form POST /friend-status/delete-friend: ",
                        err
                    );
                });
        } */
        /* IF STATUS OF ACCEPTED IS TRUE AND ALL PARTNERS LEVEL REACHED, THEN REMOVE RENDERING OF CARD */
    }

    return (
        <div className="colab-button">
            <button onClick={sendStatus}>{requestStatus}</button>
        </div>
    );
}
