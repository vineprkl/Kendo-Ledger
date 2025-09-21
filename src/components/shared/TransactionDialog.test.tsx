import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TransactionDialog from './TransactionDialog';
import { useAppStore } from '@/store';

jest.mock('@/store', () => ({
  useAppStore: jest.fn(),
}));

const mockAddTransaction = jest.fn();
const mockUpdateTransaction = jest.fn();
const mockAddNotification = jest.fn();
const mockOnClose = jest.fn();

const mockCategories = ['Groceries', 'Transport', 'Entertainment'];
const mockTags = ['work', 'personal', 'food'];

describe('TransactionDialog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAppStore as unknown as jest.Mock).mockReturnValue({
      categories: mockCategories,
      tags: mockTags,
      addTransaction: mockAddTransaction,
      updateTransaction: mockUpdateTransaction,
      addNotification: mockAddNotification,
    });
  });

  it('renders in create mode and submits a new transaction', async () => {
    render(<TransactionDialog onClose={mockOnClose} />);

    expect(screen.getByText('Transaction Details')).toBeInTheDocument();

    const amountInput = screen.getByRole('spinbutton');
    await userEvent.clear(amountInput);
    await userEvent.type(amountInput, '123.45');

    fireEvent.click(screen.getByText('Save'));

    expect(mockAddTransaction).toHaveBeenCalledTimes(1);
    expect(mockAddTransaction).toHaveBeenCalledWith(
      expect.objectContaining({ amount: 123.45 })
    );
    expect(mockAddNotification).toHaveBeenCalledWith({
      message: 'Transaction saved',
      type: 'success',
    });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('renders in edit mode and submits an updated transaction', async () => {
    const mockTransaction = {
      id: 'tx1',
      date: new Date().toISOString(),
      amount: 50,
      category: 'Groceries',
      description: 'Initial description',
      tags: ['food'],
    };

    render(<TransactionDialog onClose={mockOnClose} transaction={mockTransaction} />);

    const amountInput = screen.getByRole('spinbutton');
    expect(amountInput).toHaveValue(50);

    await userEvent.clear(amountInput);
    await userEvent.type(amountInput, '75.50');

    fireEvent.click(screen.getByText('Save'));

    expect(mockUpdateTransaction).toHaveBeenCalledTimes(1);
    expect(mockUpdateTransaction).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'tx1', amount: 75.5 })
    );
    expect(mockAddNotification).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the cancel button is clicked', () => {
    render(<TransactionDialog onClose={mockOnClose} />);

    fireEvent.click(screen.getByText('Cancel'));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockAddTransaction).not.toHaveBeenCalled();
    expect(mockUpdateTransaction).not.toHaveBeenCalled();
  });
});
