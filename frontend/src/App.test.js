import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

    // fetch('http://localhost:8000/audio-analysis/',
    //     {
    //         method: 'GET',
    //     })
    //     .then(response => response.json())
    //     .then(data => console.log(data));