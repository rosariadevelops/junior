import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./resetpassword";

export default function welcome() {
    return (
        <React.Fragment>
            <HashRouter>
                {/* <div className="ctr"> */}
                <Route exact path="/" component={Registration} />
                <Route path="/login" component={Login} />
                <Route path="/password/reset" component={ResetPassword} />
                {/*  </div> */}
            </HashRouter>
        </React.Fragment>
    );
}
