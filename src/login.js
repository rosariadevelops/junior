import React from "react";
import { Link } from "react-router-dom";
import { useStatefulFields } from "./useStatefulFields";
import { useAuthSubmit } from "./useAuthSubmit";

export default function Login() {
    const [value, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useAuthSubmit("/login", value);
    return (
        <div className="form-ctr">
            <div className="login-form">
                <h3>Log in</h3>
                <div className="form">
                    {error && <p className="error">{error}</p>}
                    <label htmlFor="email">Enter your Email:</label>
                    <input
                        onChange={handleChange}
                        type="email"
                        name="email"
                        placeholder="wesbos@developers.com"
                    />
                    <label htmlFor="password">Enter your password:</label>
                    <input
                        onChange={handleChange}
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    />
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        name="loggingin"
                        value="loggedin"
                    >
                        Log in
                    </button>
                </div>
                <div className="login-link">
                    <p className="body-1">
                        Already have an account? <Link to="/">Log in here</Link>
                    </p>
                </div>
            </div>
            <div className="login-display">
                <div>Display</div>
            </div>
        </div>
    );
}
