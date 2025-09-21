import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TransactionGrid from './TransactionGrid';

describe('TransactionGrid paging and sorting', () => {
  it('shows initial dataState and updates on sort and next page', () => {
    render(<TransactionGrid />);

    const getState = () => JSON.parse(screen.getByTestId('grid-state').textContent || '{}');

    // Initial state from component: sort by date desc, take 10, skip 0
    const initial = getState();
    expect(initial.take).toBe(10);
    expect(initial.skip).toBe(0);
    expect(initial.sort?.[0]?.field).toBe('date');
    expect(initial.sort?.[0]?.dir).toBe('desc');

    // Trigger sort by amount asc
    fireEvent.click(screen.getByText('SortAmountAsc'));
    const afterSort = getState();
    expect(afterSort.sort?.[0]).toEqual({ field: 'amount', dir: 'asc' });

    // Trigger next page: skip increases by take
    fireEvent.click(screen.getByText('NextPage'));
    const afterNext = getState();
    expect(afterNext.skip).toBe((afterSort.skip || 0) + (afterSort.take || 10));
    expect(afterNext.take).toBe(afterSort.take || 10);
  });
});

