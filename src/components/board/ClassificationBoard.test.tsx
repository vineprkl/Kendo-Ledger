import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import ClassificationBoard from './ClassificationBoard';
import { useAppStore } from '@/store';

describe('ClassificationBoard', () => {
  beforeEach(() => {
    useAppStore.getState().resetApp();
    useAppStore.setState((state) => ({
      ...state,
      categories: ['A', 'B'],
      transactions: [
        {
          id: 'tx-1',
          date: new Date().toISOString(),
          amount: -10,
          category: 'A',
          description: 'Item A1',
          tags: [],
        },
      ],
    }), true);
  });

  it('changes category when dropped into another column', () => {
    render(<ClassificationBoard />);
    const target = screen.getByTestId('sortable-B');
    (window as any).__draggedData = useAppStore.getState().transactions[0];
    const dropBtn = within(target).getByText('DropHere');
    fireEvent.click(dropBtn);
    expect(useAppStore.getState().transactions[0].category).toBe('B');
  });

  it('normalizes aliased categories and surfaces data', () => {
    useAppStore.setState({
      ...useAppStore.getState(),
      categories: ['\u7406\u8d22'],
      transactions: [
        {
          id: 'tx-2',
          date: new Date().toISOString(),
          amount: 50,
          category: 'Investments',
          description: 'Investment payout',
          tags: [],
        },
      ],
    }, true);

    render(<ClassificationBoard />);
    expect(screen.getByText('Investment payout')).toBeInTheDocument();
  });
});
