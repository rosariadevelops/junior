import React, { useEffect, useState } from "react";
import { useStatefulFields } from "./../usestatefulfields";
import { useAuthSubmit } from "./../useauthsubmit";

export default function createIdeaModal() {
    const [value, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useAuthSubmit("/create-idea", value);
    const [stack, setStack] = useState([]);

    //const stackArr = [];
    const keyCheck = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            ///socket.emit("Latest chat message", e.target.value);
            //stackArr.push(e.target.value);
            //console.log("stackArr INSIDE: ", stackArr);
            setStack([...stack, e.target.value]);
            console.log("stack imsoode: ", stack);
            e.target.value = "";
        }
    };
    //console.log("stackArr: ", stackArr);

    /* useEffect(() => {
        keyCheck();
    }, []); */

    return (
        <React.Fragment>
            <div className="form">
                {error && <p className="error">{error}</p>}
                <input
                    onChange={handleChange}
                    type="text"
                    name="idea_title"
                    autoComplete="false"
                    placeholder="Simple React Weather App"
                />
                <label htmlFor="idea_title">Idea title:</label>

                <textarea
                    onChange={handleChange}
                    type="text"
                    name="idea_desc"
                    autoComplete="false"
                    placeholder="Looking to make something simple this weekend with one other person. This simple weather app will will only display the current weather for an area we choose."
                />
                <label htmlFor="idea_desc">Description:</label>

                <div className="stack-rendered">{stack}</div>
                <input
                    onChange={handleChange}
                    type="text"
                    name="idea_stack"
                    autoComplete="false"
                    placeholder="Type and hit Enter"
                    onKeyDown={keyCheck}
                />
                <label htmlFor="idea_stack">Stack:</label>

                <input
                    className="idea_time"
                    autoComplete="false"
                    onChange={handleChange}
                    type="date"
                    name="idea_duedate"
                    placeholder="2020-10-16"
                    min="2020-10-16"
                    max="2020-12-31"
                    required
                />
                <label htmlFor="idea_duedate">Estimated duration:</label>

                <button
                    onClick={handleSubmit}
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
