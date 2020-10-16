import React, { useState, useEffect } from "react";
import axios from "./../axios";

export default function friendRequest({ otherUserId, ideaId }) {
    const [requestStatus, setRequestStatus] = useState("");
    const [colorStatus, setColorStatus] = useState("grey");
    //console.log("outside useEffect: ", otherUserId);
    //console.log("requestStatus: ", requestStatus);

    useEffect(() => {
        let abort;
        (async () => {
            console.log("colorStatus: ", colorStatus);
            console.log("otherUserId: ", otherUserId);
            const { data } = await axios.get(
                `/idea-status/${ideaId}/${otherUserId}`
            );
            //console.log("DATA DATA DATA: ", data);
            if (!abort) {
                setRequestStatus(data.buttonText);
            }
        })();
        return () => {
            abort = true;
        };
    }, [requestStatus]);

    function sendStatus() {
        if (requestStatus === "Ask to team up") {
            setColorStatus("black");
            axios
                .post(`/idea-status/${ideaId}/${otherUserId}/request-colab`)
                .then(({ data }) => {
                    setRequestStatus(data.status);
                })
                .catch(function (err) {
                    console.log(
                        "err in form POST /idea-status/request-colab: ",
                        err
                    );
                });
        } else if (requestStatus === "You're still waiting for a partner") {
            setColorStatus("grey");
            document.querySelector("button").classList.add("inactive");
            setRequestStatus(requestStatus);
        } else if (requestStatus === "Cancel team-up request") {
            setColorStatus("black");
            axios
                .post(`/idea-status/${ideaId}/${otherUserId}/cancel-colab`)
                .then(({ data }) => {
                    setRequestStatus(data.status);
                })
                .catch(function (err) {
                    console.log(
                        "err in form POST /idea-status/cancel-colab: ",
                        err
                    );
                });
        } else if (requestStatus === "Accept team-up request") {
            setColorStatus("black");
            axios
                .post(`/idea-status/${ideaId}/${otherUserId}/accept-colab`)
                .then(({ data }) => {
                    setRequestStatus(data.status);
                })
                .catch(function (err) {
                    console.log(
                        "err in form POST /idea-status/accept-colab: ",
                        err
                    );
                });
        } else if (requestStatus === "Go to Project") {
            setColorStatus("green");
            axios
                .post(`/idea-status/${ideaId}/${otherUserId}/pairing-accepted`)
                .then(({ data }) => {
                    location.replace(`/project/${ideaId}/`);
                })
                .catch(function (err) {
                    console.log(
                        "err in form POST /idea-status/pairing-accepted: ",
                        err
                    );
                });
        }
    }

    return (
        <div className="colab-button">
            <button className={colorStatus} onClick={sendStatus}>
                {requestStatus}
            </button>
        </div>
    );
}
