import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Product from './Product';
import { act } from 'react-dom/test-utils';

let originalFetch;

beforeEach(() => {
    originalFetch = global.fetch;
    // Mocking up the fetch function to return a resolved promise with the expected JSON data
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({
            title: "Nintendo Switch Console",
            colours: [
                {
                color: "pink",
                image: "https://media.very.co.uk/i/very/QE9G4_SQ1_0000000054_CORAL_SLf?$550x733_standard$",
                defaultImage: true
            }, 
            {
                color: "grey",
                image: "https://media.very.co.uk/i/very/PEM4V_SQ1_0000000005_GREY_SLf?$550x733_standard$",
                defaultImage: false
            }
            ]
        })
    }));
});

afterEach(() => {
    global.fetch = originalFetch;
});

describe("Product Component", () => {
    it("renders Loading... content on page while fetching data", () => {
        const { container } = render(<Product />);

        expect(container.innerHTML).toMatch("Loading...");
    });

    it("renders content with data correctly after data has been fetched", async () => {
        await act(async () => render(<Product/>));

        expect(screen.getByText("Nintendo Switch Console")).toBeInTheDocument();
    });
});

describe("Product component handlers", () => {
    describe("Select colour change handler", () => {
        it("Correctly change the image colour when colour is selected from select dropdown", async () => {
            await act(async () => render(<Product/>));

            const colourSelect = screen.getByTestId('colour-select');
            const productImage = screen.getByTestId('product-image');

            fireEvent.change(colourSelect, { target: { value: 'grey' }});

            expect(productImage).toHaveProperty('src', 'https://media.very.co.uk/i/very/PEM4V_SQ1_0000000005_GREY_SLf?$550x733_standard$');

        });
    });

    describe("Quantity change, form submit and close alert handlers", () => {
        it("Correctly alert users to the quantity and product added and alert container removed when alert close button is clicked", async () => {
            await act(async () => render(<Product/>));

            const quantityInput = screen.getByTestId('quantity-input');
            const submitButton = screen.getByTestId('submit-button');

            fireEvent.change(quantityInput, { target: { value: 5 }});
            fireEvent.click(submitButton, { preventDefault: () => null});

            const alertContainer = screen.getByTestId('alert-container');

            expect(alertContainer).toBeTruthy();
            expect(alertContainer.innerHTML).toMatch('5 pink Nintendo Switch Console added to basket!');

            const alertCloseButton = screen.getByTestId('alert-close-button');

            fireEvent.click(alertCloseButton, { target: { value: null }});

            expect(alertContainer).not.toBeInTheDocument();
        });
    });
});
