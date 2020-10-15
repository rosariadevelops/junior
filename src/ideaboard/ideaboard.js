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
    // const { filterByInput } = useFilterByTag();
    const [create, setCreate] = useState({ createIdea: false });
    //const [ideas, setIdeas] = useState();

    //const initialIdeas = useSelector((state) => state.ideas);

    useEffect(() => {
        dispatch(recieveIdeas());
        //setIdeas(initialIdeas);
    }, []);
    console.log("ideas: ", ideas);

    useEffect(() => {
        // setRenderFilter({ filterOn: true });
        console.log("renderFilter: ", renderFilter.filterOn);
    }, [filter.filterValue]);

    //useEffect(() => {
    /* console.log("useEffect filterIdeas: ", filterIdeas);
    if (filterIdeas && filterIdeas.length > 0) {
        setRenderFilter({ filterOn: true });
        console.log("is it true?");
    } */

    //}, []);

    const ideas = useSelector((state) => state.ideas);

    function filterByValue(e) {
        const { value } = e.target;
        console.log("value: ", value);
        setFilter({ filterValue: value });
        setRenderFilter({ filterOn: true });
    }

    const filterIdeas =
        ideas &&
        ideas.filter((idea) => idea.stack.includes(filter.filterValue));
    console.log("filterIdeas: ", filterIdeas);
    console.log("renderFilter.filterOn: ", renderFilter.filterOn);

    function createIdea(e) {
        e.preventDefault();
        toggle();
        setCreate((create.createIdea = true));
        console.log("create: ", create);
    }

    /* if (renderFilter.filterOn) {
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
                        value="React.js"
                    >
                        React.js
                    </button>
                    <div className="ibd-tags">Vue.js</div>
                    <div className="ibd-tags">TypeScript</div>
                    <div className="ibd-tags">Angular</div>
                    <div className="ibd-tags">JavaScript</div>
                    <div className="ibd-tags">jQuery</div>
                    <div className="ibd-tags">Node.js</div>
                    <div className="ibd-tags">Express</div>
                </div>
                <div className="grid-ctr">
                    {filterIdeas &&
                        filterIdeas.map((idea) => (
                            <IdeaCard key={idea.id} idea={idea} />
                        ))}
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
    } else if (!renderFilter.filterOn) {
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
                        value="React.js"
                    >
                        React.js
                    </button>
                    <div className="ibd-tags">Vue.js</div>
                    <div className="ibd-tags">TypeScript</div>
                    <div className="ibd-tags">Angular</div>
                    <div className="ibd-tags">JavaScript</div>
                    <div className="ibd-tags">jQuery</div>
                    <div className="ibd-tags">Node.js</div>
                    <div className="ibd-tags">Express</div>
                </div>
                <div className="grid-ctr">
                    {ideas &&
                        ideas.map((idea) => (
                            <IdeaCard key={idea.id} idea={idea} />
                        ))}
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
    } */

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
                    value="JavaScript"
                >
                    JavaScript
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
