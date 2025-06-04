import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

// Mock ForceGraph2D to allow DOM interactions
jest.mock('react-force-graph-2d', () => {
  return ({ onNodeClick }) => (
    <button data-testid="force-graph" onClick={() => onNodeClick?.({ id: 'cmp1', label: 'Dibutyl Phthalate', type: 'compound' })}>
      ForceGraph
    </button>
  );
});

describe('App', () => {
  test('renders ForceGraph2D and opens modal on compound click', () => {
    render(<App />);

    const graph = screen.getByTestId('force-graph');
    expect(graph).toBeInTheDocument();

    // modal should not be visible initially
    expect(screen.queryByText(/Dibutyl Phthalate/i)).not.toBeInTheDocument();

    // simulate clicking a compound node
    fireEvent.click(graph);

    // modal should appear with compound label
    expect(screen.getByText(/Dibutyl Phthalate/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '닫기' })).toBeInTheDocument();
  });
});
