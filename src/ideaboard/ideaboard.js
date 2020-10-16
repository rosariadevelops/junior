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
    const [filter, setFilter] = useState({ filterValue: [] });
    const [renderFilter, setRenderFilter] = useState({ filterOn: false });
    const [create, setCreate] = useState({ createIdea: false });

    useEffect(() => {
        dispatch(recieveIdeas());
        //setIdeas(initialIdeas);
    }, []);
    //console.log("ideas: ", ideas);

    useEffect(() => {
        console.log("renderFilter: ", renderFilter.filterOn);
    }, [filter.filterValue]);

    const ideas = useSelector((state) => state.ideas);

    function filterByValue(e) {
        const { value } = e.target;
        console.log("value: ", value);

        setFilter({ filterValue: value });
        setRenderFilter({ filterOn: true });
        if (value == "All") {
            setRenderFilter({ filterOn: false });
        }
    }

    const filterIdeas =
        ideas &&
        ideas.filter((idea) => idea.stack.includes(filter.filterValue));
    //console.log("filterIdeas: ", filterIdeas);
    //console.log("renderFilter.filterOn: ", renderFilter.filterOn);

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
            <div className="title">
                <h2>Ideaboard</h2>
            </div>
            <div className="ibd-tags-ctr">
                <button
                    onClick={(e) => filterByValue(e)}
                    className="ibd-tags"
                    value="All"
                >
                    All
                </button>
                <button
                    onClick={(e) => filterByValue(e)}
                    className="ibd-tags"
                    value="React.js"
                >
                    React.js
                </button>
                <button
                    onClick={(e) => filterByValue(e)}
                    className="ibd-tags"
                    value="Redux"
                >
                    Redux
                </button>
                <button
                    onClick={(e) => filterByValue(e)}
                    className="ibd-tags"
                    value="Vue.js"
                >
                    Vue.js
                </button>
                <button
                    onClick={(e) => filterByValue(e)}
                    className="ibd-tags"
                    value="Angular"
                >
                    Angular
                </button>
                <button
                    onClick={(e) => filterByValue(e)}
                    className="ibd-tags"
                    value="TypeScript"
                >
                    TypeScript
                </button>

                <button
                    onClick={(e) => filterByValue(e)}
                    className="ibd-tags"
                    value="jQuery"
                >
                    jQuery
                </button>
                <button
                    onClick={(e) => filterByValue(e)}
                    className="ibd-tags"
                    value="Node.js"
                >
                    Node.js
                </button>
            </div>
            {renderFilter.filterOn ? (
                <div className="grid-ctr">
                    {filterIdeas &&
                        filterIdeas.map((idea) => (
                            <IdeaCard key={idea.id} idea={idea} />
                        ))}
                </div>
            ) : (
                <div className="grid-ctr">
                    {ideas &&
                        ideas.map((idea) => (
                            <IdeaCard key={idea.id} idea={idea} />
                        ))}
                </div>
            )}

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
