import React from "react";

export class Jumbotron extends React.Component  {

    render() {
        return <div className="jumbotron">
            <div className="container">
                <h1 className="display-3">Title</h1>
                <p>Description</p>
            </div>
        </div>;
    }
}