import React, { useEffect, useState } from "react";
//import { useStatefulFields } from "./../usestatefulfields";
//import { useAuthSubmit } from "./../useauthsubmit";
import axios from "./../axios";

export default function createIdeaModal() {
    //const [value, handleChange] = useState();
    const [error, setError] = useState();
    //const [state, setState] = useState();
    const [stack, setStack] = useState([]);

    //const stackArr = [];
    const keyCheck = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            ///socket.emit("Latest chat message", e.target.value);
            setStack([...stack, e.target.value]);
            console.log("stack inside keyCheck: ", stack);
            e.target.value = "";
        }
    };

    const [value, setValue] = useState({});
    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
            stack: [...stack],
        });
        console.log("useStatefulFields value: ", value);
    };

    console.log("handleInput: ", value);

    function handleSubmit(e) {
        e.preventDefault();
        axios
            .post("/create-idea", value)
            .then(function (response) {
                console.log("login response:", response.data);
                if (response) {
                    location.replace("/");
                } else {
                    setError(true);
                }
            })
            .catch(function (err) {
                console.log("err in  POST /create-idea: ", err);
            });
        //}
        console.log("login state:", this.state);
    }

    /* const valueTotal = {
        ...value,
        stack,
    }; */
    console.log("stack outside keycheck: ", stack);

    /* useEffect(() => {
        keyCheck();
    }, []); */

    return (
        <React.Fragment>
            <div className="form">
                {error && <p className="error">{error}</p>}
                <h4>Share your project idea</h4>
                <div className="input-ctr">
                    <label htmlFor="idea_title">Idea title:</label>
                    <input
                        onChange={(e) => handleChange(e)}
                        type="text"
                        name="idea_title"
                        autoComplete="false"
                        placeholder="Simple React Weather App"
                    />
                </div>
                <div className="input-ctr">
                    <label htmlFor="idea_desc">Description:</label>
                    <textarea
                        onChange={(e) => handleChange(e)}
                        type="text"
                        name="idea_desc"
                        autoComplete="false"
                        placeholder="Looking to make something simple this weekend with one other person. This simple weather app will will only display the current weather for an area we choose."
                    />
                </div>
                <div className="input-ctr">
                    <label htmlFor="idea_stack">Intended Stack:</label>
                    <input
                        onChange={(e) => handleChange(e)}
                        type="text"
                        name="idea_stack"
                        autoComplete="false"
                        placeholder="Type and hit Enter"
                        onKeyDown={keyCheck}
                    />

                    <div className="stack-rendered">
                        <div className="stack-box">
                            {stack.map((item) => (
                                <p key={item} className="stack-p">
                                    {item}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="input-ctr">
                    <label htmlFor="idea_duedate">End date:</label>
                    <input
                        className="idea_time"
                        autoComplete="false"
                        onChange={(e) => handleChange(e)}
                        type="date"
                        name="idea_duedate"
                        placeholder="2020-10-16"
                        min="2020-10-16"
                        max="2020-12-31"
                        required
                    />
                </div>

                <button
                    onClick={(e) => handleSubmit(e)}
                    type="submit"
                    name="submitted"
                    value="registered"
                >
                    Create project idea
                </button>
            </div>
        </React.Fragment>
    );
}
