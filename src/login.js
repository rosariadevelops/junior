import React from "react";
import { Link } from "react-router-dom";
import { useStatefulFields } from "./usestatefulfields";
import { useAuthSubmit } from "./useauthsubmit";

export default function Login() {
    const [value, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useAuthSubmit("/login", value);
    return (
        <div className="form-ctr">
            <div className="login-display">
                <div className="nav-sidebar">
                    <div className="logo">Junior</div>
                </div>
            </div>
            <div className="login-form">
                <div className="rgtr-ctr">
                    <h5>Hello, who&apos;s this?</h5>
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
                        <Link to="/password/reset">I forgot my password</Link>
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            name="loggingin"
                            value="loggedin"
                        >
                            Log in to Junior
                        </button>
                    </div>
                    <div className="login-link">
                        <p className="body-1">
                            Don&apos;t have an account yet?{" "}
                            <Link to="/">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
