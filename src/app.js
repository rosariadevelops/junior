import React from "react";
// import axios from "./axios";
import Navigation from "./navigation";
//import Modal from "./modal";
//import useModal from "./useModal";
//import Profile from "./profile";
// move into ^^ import ProfilePicChange from "./profilepicchange";
//import ProfilePic from "./profilepic";
import IdeaBoard from "./ideaboard/ideaboard";
import IdeaModal from "./ideaboard/ideamodal";
// move into ^^ import IdeaCard from "./ideaboard/ideacard";
// move into ^^ import IdeaConnection from "./ideaboard/ideaconnection";
// move into ^^ import IdeaVoting from "./ideaboard/ideavoting";
import AllProjects from "./project/allprojects";
// move into ^^ import Project from "./project/project";
// move into ^^ import ProjectInfo from "./project/projectinfo";
// move into ^^ import ProjectTimeline from "./project/projecttimeline";
// move into ^^ import ProjectTaskList from "./project/tasklist";
import Community from "./community/community";
import Settings from "./profile/settings";
// move into ^^ import Developers from "./community/developers";
// move into ^^ import Conversations from "./community/conversations";
// move into ^^ import PrivateMessage from "./community/privatemessage";
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
                                        /* imageURL={this.state.profilePic}
                                        id={this.state.id}
                                        firstname={this.state.firstname}
                                        lastname={this.state.lastname} */
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
