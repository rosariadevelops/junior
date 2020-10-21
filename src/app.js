import React from "react";
import Navigation from "./navigation";
import IdeaBoard from "./ideaboard/ideaboard";
import IdeaModal from "./ideaboard/ideamodal";
import AllProjects from "./project/allprojects";
import Community from "./community/community";
import Settings from "./profile/settings";
import { BrowserRouter, Route } from "react-router-dom";

export default function App() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <div className="main-ctr">
                    <div className="nav-sidebar">
                        <div className="logo">Junior</div>
                        <Navigation />
                    </div>
                    <div className="container">
                        <div className="nav"></div>
                        <div className="main">
                            <div className="title"></div>
                            <Route
                                exact
                                path="/"
                                render={() => <IdeaBoard />}
                            />
                            <Route
                                path="/projects"
                                render={() => <AllProjects />}
                            />
                            <Route
                                path="/idea/:id"
                                render={(props) => (
                                    <IdeaModal
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                    />
                                )}
                            />
                            <Route
                                path="/community"
                                render={() => <Community />}
                            />
                            <Route
                                path="/profile"
                                render={() => <Settings />}
                            />
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        </React.Fragment>
    );
}
