import React from "react";
import {render, fireEvent, screen, waitForElement} from "@testing-library/react";
import CurrencyDropdown from "./CurrencyDropdown";

test('can change the currency', async () => {
    const { getByText, getByRole } = render(<CurrencyDropdown/>);
    const button = getByRole("button");
    fireEvent.click(button);
    await waitForElement(() => screen.getByText('EUR (€)'));
    fireEvent.click(getByText("EUR (€)"));
    expect(getByRole("button").textContent).toBe("EUR");
});
