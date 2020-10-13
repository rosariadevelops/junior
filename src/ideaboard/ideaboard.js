import React, { useEffect, useState } from "react";
import IdeaCard from "./ideacard";
//import CreateIdea from "./createidea";
//import Modal from "./modal";
//import IdeaModal from "./ideamodal";
import useModal from "./../useModal";
//import CreateIdea from "./createidea";
import ModalComponent from "./../modal";
import { useDispatch, useSelector } from "react-redux";
import { recieveIdeas } from "./../redux/actions";

export default function IdeaBoard() {
    const dispatch = useDispatch();
    const { isVisible, toggle } = useModal();
    const [create, setCreate] = useState({ createIdea: false });

    useEffect(() => {
        dispatch(recieveIdeas());
    }, []);

    const ideas = useSelector((state) => state.ideas);
    console.log("IDEAS COMPONENT: ", ideas);

    /* const ideaId = useSelector(
        (state) => state.ideas && state.ideas.filter((idea) => idea.id)
    );
    const ideaOne = useSelector(
        (state) => state.ideas && state.ideas.filter((idea) => idea.id === 1)
    ); */

    function createIdea(e) {
        e.preventDefault();
        toggle();
        setCreate((create.createIdea = true));
        console.log("create: ", create);
    }

    return (
        <React.Fragment>
            <div className="add-idea">
                <div className="plus" onClick={(e) => createIdea(e)}>
                    <div className="plus-h"></div>
                    <div className="plus-v"></div>
                </div>
            </div>
            <div className="grid-ctr">
                {ideas &&
                    ideas.map((idea) => <IdeaCard key={idea.id} idea={idea} />)}
            </div>

            {isVisible && (
                <ModalComponent
                    isVisible={isVisible}
                    hide={toggle}
                    create={create}
                />
            )}
        </React.Fragment>
    );
}
