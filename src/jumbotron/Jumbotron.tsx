import React from "react";

export interface JumbotronProps {
    title: string,
    description: string
}

export class Jumbotron extends React.Component<JumbotronProps, {}>  {

    render() {
        return (
            <div className="jumbotron">
                <div className="container">
                    <h1 className="display-3">{this.props.title}</h1>
                    <p>{this.props.description}</p>
                </div>
            </div>
        );
    }
}