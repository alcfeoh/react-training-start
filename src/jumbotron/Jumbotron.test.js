import React from "react";
import {Jumbotron} from "./Jumbotron";
import {render} from "@testing-library/react";

test('renders Jumbotron with the proper title', () => {
    const { getByText } = render(<Jumbotron title="Welcome to our store"/>);
    const titleElement = getByText("Welcome to our store");
    expect(titleElement).toBeInTheDocument();
});
