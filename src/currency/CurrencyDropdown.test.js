import React from "react";
import {render, fireEvent, waitFor} from "@testing-library/react";
import {CurrencyDropdown} from "./CurrencyDropdown";

test('can change the currency', async () => {
    let curr = "USD";
    let { getByText, getByRole, rerender } = render(<CurrencyDropdown currency={curr} onCurrencyChange={(c) => curr = c} />);
    const button = getByRole("button");
    fireEvent.click(button);
    await waitFor(() => expect(getByText('EUR (€)')).toBeInTheDocument());
    fireEvent.click(getByText("EUR (€)"));
    rerender(<CurrencyDropdown currency={curr} onCurrencyChange={(c) => curr = c} />);
    expect(getByRole("button").textContent).toBe("EUR");
});


