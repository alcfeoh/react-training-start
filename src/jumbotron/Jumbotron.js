import React from "react";

// Lab TS1 - this component is handed a title and a description, and ignores both.
export function Jumbotron(props) {

    return (
        <div className="jumbotron">
            <div className="container">
                <h1 className="display-3">Title</h1>
                <p>Description</p>
            </div>
        </div>
    );
}
