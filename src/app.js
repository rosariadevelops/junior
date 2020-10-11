import React from "react";
import axios from "./axios";
import Navigation from "./navigation";
//import Profile from "./profile";
// move into ^^ import ProfilePicChange from "./profilepicchange";
//import ProfilePic from "./profilepic";
import IdeaBoard from "./ideaboard/ideaboard";
// move into ^^ import IdeaCard from "./ideaboard/ideacard";
// move into ^^ import IdeaConnection from "./ideaboard/ideaconnection";
// move into ^^ import IdeaVoting from "./ideaboard/ideavoting";
import AllProjects from "./allprojects";
// move into ^^ import Project from "./project/project";
// move into ^^ import ProjectInfo from "./project/projectinfo";
// move into ^^ import ProjectTimeline from "./project/projecttimeline";
// move into ^^ import ProjectTaskList from "./project/tasklist";
//import Community from "./community";
// move into ^^ import Developers from "./community/developers";
// move into ^^ import Conversations from "./community/conversations";
// move into ^^ import PrivateMessage from "./community/privatemessage";
import { Link, BrowserRouter, Route } from "react-router-dom";

export default function App() {
    //
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
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        </React.Fragment>
    );
}
