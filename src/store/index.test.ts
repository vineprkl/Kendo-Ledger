import { useAppStore } from './index';
import type { Transaction } from './index';

describe('Zustand Store Actions', () => {
  beforeEach(() => {
    useAppStore.getState().resetApp();
  });

  it('should add a transaction correctly', () => {
    const { addTransaction } = useAppStore.getState();
    const beforeLength = useAppStore.getState().transactions.length;

    const newTransaction: Omit<Transaction, 'id'> = {
      date: new Date().toISOString(),
      amount: 100,
      category: 'Groceries',
      description: 'Weekly shopping',
      tags: ['food', 'essentials'],
    };

    addTransaction(newTransaction);

    const { transactions } = useAppStore.getState();
    expect(transactions.length).toBe(beforeLength + 1);
    const tx = transactions[transactions.length - 1];
    expect(tx.amount).toBe(100);
    expect(tx.category).toBe('Groceries');
    expect(tx.id).toBeDefined();
  });

  it('should update an existing transaction', () => {
    const { addTransaction, updateTransaction } = useAppStore.getState();

    const initialTransaction: Omit<Transaction, 'id'> = {
      date: new Date().toISOString(),
      amount: 150,
      category: 'Utilities',
      description: 'Electricity bill',
      tags: ['home'],
    };
    addTransaction(initialTransaction);

    const transactions = useAppStore.getState().transactions;
    const transactionToUpdate = transactions[transactions.length - 1];

    const updatedTransaction: Transaction = {
      ...transactionToUpdate,
      amount: 200,
      description: 'Electricity bill (updated)',
    };

    updateTransaction(updatedTransaction);

    const finalTransactions = useAppStore.getState().transactions;
    const updated = finalTransactions.find((t) => t.id === transactionToUpdate.id);
    expect(updated).toBeDefined();
    expect(updated?.amount).toBe(200);
    expect(updated?.description).toBe('Electricity bill (updated)');
  });
});
