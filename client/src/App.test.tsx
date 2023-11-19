import {render, screen, fireEvent } from '@testing-library/react'
import App from "./App";
import Home from './pages/home';

it("should have country catalog", () =>{
    render(<App/>)
    const message = screen.queryByText(/country catalog/i)
    expect(message).toBeVisible();
})

it('renders dropdown list when typing Canada', async () => {
    render(<Home />);
    const inputField = screen.getByRole('textbox');
    fireEvent.change(inputField, { target: { value: 'Canada' } });

    const dropdownList = await screen.findByRole('list');
    expect(dropdownList).toBeInTheDocument();

    const listItem = await screen.findByText('Canada');
    expect(listItem).toBeInTheDocument();
});

it('renders DrawerContent when the button is clicked after typing a valid country', async () => {
    render(<Home />);
    
    // Simulate typing 'Canada' into the input field
    const inputField = screen.getByRole('textbox');
    fireEvent.change(inputField, { target: { value: 'Canada' } });

    // Wait for the button to be enabled (if there's any delay)
    const button = await screen.findByTestId('drawer-button', {}, { timeout: 1000 });
    fireEvent.click(button);

    // Check if 'Canada' is present in DrawerContent
    const drawerContentElement = await screen.findByText('Canada');
    expect(drawerContentElement).toBeInTheDocument(); 
});