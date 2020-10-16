import axios from "./axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
//import { useSelector } from "react-redux";

export default function ResetPassword() {
    // REPLACE CONSTRUCTOR FROM SN
    // REPLACE HANDLE CHANGE FROM SN
    // REPLACE HANDLE EMAIL CHANGE FROM SN

    const [currentDisplay, setcurrentDisplay] = useState(1);
    const [value, setValue] = useState({});
    const [error, setError] = useState(false);
    const [email, setEmail] = useState();

    useEffect(() => {
        //
    }, []);

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
        console.log("useStatefulFields value: ", value);
    };

    //console.log("handleInput: ", value);

    function handleEmailSend(e) {
        e.preventDefault();

        if (e.target.value === null) {
            setError("Please make sure information you entered is correct.");
        }
        console.log("checking value: ", value);

        axios
            .post("/password/reset/start", value)
            .then(function (response) {
                console.log("/password/reset/start RESULT", response.data);
                if (response.data.errorMsg) {
                    setError(true);
                } else {
                    setcurrentDisplay(2);
                }
            })
            .catch(function (err) {
                console.log("err in  POST /password/reset/start: ", err);
            });
    }

    function handlePwReset(evt) {
        evt.preventDefault();
        const { name, value } = evt.target;

        if (evt.target.value === null) {
            setError(true);
        } else {
            setValue({
                ...value,
                [name]: value,
            });
            //setEmail(email);
        }

        axios
            .post("/password/reset/verify", value)
            .then(function (response) {
                console.log("/password/reset/verify RESULT", response.data);
                if (response.data.errorMsg) {
                    setError(
                        "Please make sure information you entered is correct."
                    );
                } else {
                    setcurrentDisplay(3);
                }
            })
            .catch(function (err) {
                console.log("err in  POST /password/reset/verify: ", err);
            });
    }

    return (
        <React.Fragment>
            <div className="form-ctr">
                <div className="login-display">
                    <div className="nav-sidebar">
                        <div className="logo">Junior</div>
                    </div>
                </div>

                <div className="reset-ctr">
                    <div className="rgtr-ctr">
                        {currentDisplay == 1 && (
                            <div className="pw-reset-form">
                                <h5>
                                    Forgot your password?
                                    <br />
                                    Don’t panic!
                                </h5>
                                <div className="form">
                                    {error && <p className="error">{error}</p>}
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        onChange={(e) => handleChange(e)}
                                        type="email"
                                        name="email"
                                        placeholder="forgetful.frana@developers.com"
                                        required
                                    />
                                    <p className="body-2">
                                        Type the address linked to your account
                                        and we&apos;ll send you password a reset
                                        code. The email may end up in your spam
                                        folder, so please check there as well.
                                    </p>
                                    <div className="send-email">
                                        <Link className="cancel" to="/login">
                                            Cancel
                                        </Link>
                                        <button
                                            onClick={(e) => handleEmailSend(e)}
                                            type="submit"
                                            name="sendemail"
                                        >
                                            Send reset code
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {currentDisplay == 2 && (
                            <div className="pw-reset-form">
                                <div className="form">
                                    {error && <p className="error">{error}</p>}
                                    <label htmlFor="cryptocode">
                                        Reset code:
                                    </label>
                                    <input
                                        onChange={(e) => handleChange(e)}
                                        type="text"
                                        min="6"
                                        name="cryptocode"
                                        placeholder="Enter 6-digit code"
                                        required
                                    />
                                    <label htmlFor="password">
                                        Your new password:
                                    </label>
                                    <input
                                        onChange={(e) => handleChange(e)}
                                        type="password"
                                        name="password"
                                        className="pwd-input"
                                        placeholder="At least 8 characters"
                                        required
                                    />
                                    <div className="send-email">
                                        <Link className="cancel" to="/login">
                                            Cancel
                                        </Link>
                                        <button
                                            onClick={(evt) =>
                                                handlePwReset(evt)
                                            }
                                            type="submit"
                                            name="resetpw"
                                            value="resetpw"
                                        >
                                            Save password
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {currentDisplay == 3 && (
                            <div className="pw-reset-form">
                                <div className="form">
                                    <h3>Success!</h3>
                                    <div className="login-link">
                                        You can now log in with your new
                                        password:{" "}
                                        <Link to="/login">Log in here</Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
