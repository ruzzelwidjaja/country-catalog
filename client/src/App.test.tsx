import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from "./App";
import Home from './pages/home';

describe("App Component Tests", () => {
  it("should display the 'Country Catalog' title", () => {
    render(<App />);
    const titleElement = screen.getByText(/country catalog/i);
    expect(titleElement).toBeInTheDocument();
  });

  describe("Home Component Tests", () => {
    it('renders dropdown list when typing "Canada"', async () => {
      render(<Home />);
      const inputField = screen.getByRole('textbox');
      fireEvent.change(inputField, { target: { value: 'Canada' } });

      const dropdownList = await screen.findByRole('list');
      expect(dropdownList).toBeInTheDocument();

      const listItem = await screen.findByText('Canada');
      expect(listItem).toBeInTheDocument();
    });

    it('renders DrawerContent when a valid country is selected', async () => {
      render(<Home />);
      
      // Simulate typing 'Canada' into the input field
      const inputField = screen.getByRole('textbox');
      fireEvent.change(inputField, { target: { value: 'Canada' } });

      // Wait for the button to be enabled and simulate a click
      const button = await screen.findByTestId('drawer-button', {}, { timeout: 1000 });
      fireEvent.click(button);

      // Check if 'Canada' is present in DrawerContent
      const drawerContentElement = await waitFor(() => screen.findByText('Ottawa'));
      expect(drawerContentElement).toBeInTheDocument();
    });
  });
});
