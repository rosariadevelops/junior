import React, { useEffect } from "react";
import IdeaCard from "./ideacard";
//import CreateIdea from "./createidea";
//import Modal from "./modal";
import IdeaModal from "./ideamodal";
import useModal from "./../useModal";
//import CreateIdea from "./createidea";
import ModalComponent from "./../modal";
//import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { recieveIdeas } from "./../redux/actions";
//import "bootstrap/dist/css/bootstrap.min.css";
//import { Link } from "react-router-dom";

export default function IdeaBoard() {
    const dispatch = useDispatch();
    const { isVisible, toggle } = useModal();

    useEffect(() => {
        dispatch(recieveIdeas());
    }, []);

    //function modalContent() {}

    /* const ideas = useSelector(
        (state) => state.ideas && state.ideas.filter((user) => user.accepted)
    ); */
    const ideas = useSelector((state) => state.ideas);
    console.log("IDEAS COMPONENT: ", ideas);

    const ideaId = useSelector(
        (state) => state.ideas && state.ideas.filter((idea) => idea.id)
    );
    const ideaOne = useSelector(
        (state) => state.ideas && state.ideas.filter((idea) => idea.id === 1)
    );

    return (
        <React.Fragment>
            <div className="add-idea">
                <div className="plus" onClick={toggle}>
                    <div className="plus-h"></div>
                    <div className="plus-v"></div>
                </div>
            </div>
            <div className="grid-ctr">
                {ideas &&
                    ideas.map((idea) => <IdeaCard key={idea.id} idea={idea} />)}
            </div>

            {isVisible && (
                <ModalComponent isVisible={isVisible} hide={toggle} />
            )}
        </React.Fragment>
    );
}
