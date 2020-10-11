//import axios from "./axios";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
//import { useSelector } from "react-redux";

export default function ResetPassword() {
    // REPLACE CONSTRUCTOR FROM SN
    // REPLACE HANDLE CHANGE FROM SN
    // REPLACE HANDLE EMAIL CHANGE FROM SN

    useEffect(() => {
        //
    }, []);

    return (
        <React.Fragment>
            <div className="reset-container">
                {this.state.currentDisplay == 1 && (
                    <div className="pw-reset-form">
                        <h1>Reset your password</h1>
                        <p>
                            Please enter the email address with which you
                            entered. We will send you an email with a
                            time-sensitive confirmation code.
                        </p>
                        {this.state.error && (
                            <p className="error">{this.state.error}</p>
                        )}
                        <label htmlFor="email">Enter your Email:</label>
                        <input
                            onChange={(e) => this.handleChange(e)}
                            type="email"
                            name="email"
                            placeholder="Email address"
                            required
                        />
                        <button
                            onClick={(e) => this.handleEmailSend(e)}
                            type="submit"
                            name="sendemail"
                            value="sendemail"
                        >
                            Send reset code
                        </button>
                    </div>
                )}
                {this.state.currentDisplay == 2 && (
                    <div className="pw-reset-form">
                        {this.state.error && (
                            <p className="error">{this.state.error}</p>
                        )}
                        <p>Please enter the code you received on email:</p>
                        <input
                            onChange={(e) => this.handleChange(e)}
                            type="text"
                            min="6"
                            name="cryptocode"
                            placeholder="Enter 6-digit code"
                            required
                        />
                        <p>Now create a new password:</p>
                        <input
                            onChange={(e) => this.handleChange(e)}
                            type="password"
                            name="password"
                            className="pwd-input"
                            placeholder="Enter password"
                            required
                        />
                        <button
                            onClick={(evt) => this.handlePwReset(evt)}
                            type="submit"
                            name="resetpw"
                            value="resetpw"
                        >
                            Save
                        </button>
                    </div>
                )}
                {this.state.currentDisplay == 3 && (
                    <div className="pw-reset-form">
                        <h3>Success!</h3>
                        <div className="login-link">
                            You can now log in with your new password:{" "}
                            <Link to="/login">Log in here</Link>
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
}
