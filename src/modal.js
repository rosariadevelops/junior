import React from "react";
import { createPortal } from "react-dom";

export default function Modal(props) {
    console.log("mddal props: ", props);
    return props.isVisible
        ? createPortal(
              <div className="modal">
                  <div className="overlay"></div>
                  <div className="modal-ctr">
                      <div className="close-button" onClick={props.hide}>
                          <span className="close-modal-left"></span>
                          <span className="close-modal-right"></span>
                      </div>

                      {/* Dynamic content */}
                      {props.children}
                  </div>
              </div>,
              document.body
          )
        : null;
}
