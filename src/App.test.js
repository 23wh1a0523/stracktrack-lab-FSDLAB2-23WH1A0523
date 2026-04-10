import { render, screen } from '@testing-library/react';
import App from './App';

test('renders student list', () => {
  render(<App />);
  const linkElement = screen.getByText(/student list/i);
  expect(linkElement).toBeInTheDocument();
});
