import React from "react";
import { Link } from "react-router-dom";
import { useStatefulFields } from "./usestatefulfields";
import { useAuthSubmit } from "./useauthsubmit";

export default function Registration() {
    console.log("is this working?");
    const [value, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useAuthSubmit("/welcome", value);
    return (
        <div className="form-ctr">
            <div className="rgtr-display">
                <div className="nav-sidebar">
                    <div className="logo">Junior</div>
                </div>
            </div>
            <div className="rgtr-form">
                <div className="rgtr-ctr">
                    <h5>
                        Get better at motivating yourself for side-projects,
                        with others.
                    </h5>
                    <div className="form">
                        {error && <p className="error">{error}</p>}
                        <label htmlFor="first">First name:</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="first"
                            autoComplete="false"
                            placeholder="Wes"
                        />
                        <label htmlFor="last">Last name:</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="last"
                            autoComplete="false"
                            placeholder="Bos"
                        />
                        <label htmlFor="email">Email Address:</label>
                        <input
                            onChange={handleChange}
                            type="email"
                            name="email"
                            autoComplete="false"
                            placeholder="wesbos@developers.com"
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            className="pwd-input"
                            autoComplete="false"
                            onChange={handleChange}
                            type="password"
                            name="password"
                            placeholder="At least 8 characters"
                            required
                        />
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            name="submitted"
                            value="registered"
                        >
                            Create my free account
                        </button>
                    </div>
                    <div className="login-link">
                        <p className="body-1">
                            Already have an account?{" "}
                            <Link to="/login">Log in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
