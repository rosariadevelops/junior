import React, { useState, useEffect } from "react";
import axios from "./../axios";

export default function friendRequest({ otherUserId, ideaId }) {
    const [requestStatus, setRequestStatus] = useState("");
    console.log("outside useEffect: ", otherUserId);
    //console.log("requestStatus: ", requestStatus);

    useEffect(() => {
        let abort;
        (async () => {
            console.log("otherUserId: ", otherUserId);
            const { data } = await axios.get(
                `/idea-status/${ideaId}/${otherUserId}`
            );
            console.log("DATA DATA DATA: ", data);
            if (!abort) {
                setRequestStatus(data.buttonText);
            }
        })();
        return () => {
            abort = true;
        };
    }, []);

    function sendStatus() {
        console.log("requestStatus: ", requestStatus);
        //let abort;
        //(async () => {

        if (requestStatus === "Ask to team up") {
            //setButtonClick();
            console.log("requestStatus: REQUEST COLAB");
            axios
                .post(`/idea-status/${ideaId}/${otherUserId}/request-colab`)
                .then(({ data }) => {
                    console.log("/request-colab response: ", data);
                    setRequestStatus(data.status);
                })
                .catch(function (err) {
                    console.log(
                        "err in form POST /idea-status/request-colab: ",
                        err
                    );
                });
        } else if (requestStatus === "You're still waiting for a partner") {
            //setButtonClick();
            console.log("Logged in User's idea");
            setRequestStatus(requestStatus);
        } else if (requestStatus === "Cancel team-up request") {
            console.log("requestStatus: CANCEL COLAB");
            axios
                .post(`/idea-status/${ideaId}/${otherUserId}/cancel-colab`)
                .then(({ data }) => {
                    console.log("/cancel-colab response: ", data);
                    setRequestStatus(data.status);
                })
                .catch(function (err) {
                    console.log(
                        "err in form POST /idea-status/cancel-colab: ",
                        err
                    );
                });
        } else if (requestStatus === "Accept team-up request") {
            console.log("requestStatus: ACCEPT COLAB");
            axios
                .post(`/idea-status/${ideaId}/${otherUserId}/accept-colab`)
                .then(({ data }) => {
                    console.log("/accept-colab response: ", data);
                    setRequestStatus(data.status);
                })
                .catch(function (err) {
                    console.log(
                        "err in form POST /idea-status/accept-colab: ",
                        err
                    );
                });
        } else if (requestStatus === "Go to Project") {
            console.log("THIS NEEDS TO MOVE TO PROJECTS");
            axios
                .get(`/idea-status/${otherUserId}/pairing-accepted`)
                .then(({ data }) => {
                    console.log("/pairing-accepted response: ", data);
                    setRequestStatus(data.status);
                })
                .catch(function (err) {
                    console.log(
                        "err in form POST /idea-status/pairing-accepted: ",
                        err
                    );
                });
        }
        /* IF STATUS OF ACCEPTED IS TRUE AND ALL PARTNERS LEVEL REACHED, THEN REMOVE RENDERING OF CARD */
    }

    return (
        <div className="colab-button">
            <button onClick={sendStatus}>{requestStatus}</button>
        </div>
    );
}
