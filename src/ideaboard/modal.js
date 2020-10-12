import React from "react";

export default function Modal({ hide }) {
    return (
        <React.Fragment>
            <div className="modal">
                <div className="overlay"></div>
                <div className="modal-ctr">
                    <div className="close-button">
                        <a onClick={hide}>
                            <span className="close-modal-left"></span>
                            <span className="close-modal-right"></span>
                        </a>
                    </div>

                    {/* Dynamic content */}
                    {this.props.children}
                </div>
            </div>
        </React.Fragment>
    );
}
