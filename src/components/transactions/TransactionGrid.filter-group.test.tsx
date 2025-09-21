import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TransactionGrid from './TransactionGrid';

const getState = () => JSON.parse(screen.getByTestId('grid-state').textContent || '{}');

describe('TransactionGrid filter and group', () => {
  it('has initial grouping by category and can clear and re-group', () => {
    render(<TransactionGrid />);
    const initial = getState();
    expect(initial.group?.[0]?.field).toBe('category');

    fireEvent.click(screen.getByText('ClearGroup'));
    const afterClear = getState();
    expect(Array.isArray(afterClear.group)).toBe(true);
    expect(afterClear.group.length).toBe(0);

    fireEvent.click(screen.getByText('GroupByCategory'));
    const afterGroup = getState();
    expect(afterGroup.group?.[0]?.field).toBe('category');
  });

  it('applies and clears a numeric filter on amount', () => {
    render(<TransactionGrid />);
    fireEvent.click(screen.getByText('ApplyFilterGt0'));
    const afterFilter = getState();
    expect(afterFilter.filter?.filters?.[0]).toEqual({ field: 'amount', operator: 'gt', value: 0 });

    fireEvent.click(screen.getByText('ClearFilter'));
    const afterClear = getState();
    expect(afterClear.filter).toBeUndefined();
  });
});

