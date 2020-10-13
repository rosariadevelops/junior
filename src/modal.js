import React, { useState } from "react";
import { createPortal } from "react-dom";
import CreateIdea from "./ideaboard/createidea";

export default function Modal(props) {
    console.log("modal props: ", props);
    const [create, setCreate] = useState(props.create);

    function clearCreateIdeaForm(e) {
        e.preventDefault();
        props.hide();
        setCreate((props.create = false));
        console.log("create: ", create);
    }

    return props.isVisible
        ? createPortal(
              <div className="modal">
                  <div className="overlay"></div>
                  <div className="modal-ctr">
                      <div
                          className="close-button"
                          onClick={(e) => clearCreateIdeaForm(e)}
                      >
                          <span className="close-modal-left"></span>
                          <span className="close-modal-right"></span>
                      </div>

                      {props.create && <CreateIdea />}
                  </div>
              </div>,
              document.body
          )
        : null;
}
