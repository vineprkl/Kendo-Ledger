import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_TRANSACTIONS, DEFAULT_EVENTS } from './defaultData';
import { DEFAULT_CATEGORIES } from '@/lib/category-utils';

const BASE_TAGS = ['family', 'work', 'personal', 'recurring', 'one-time'];

// --- Interfaces ---
export interface Transaction {
  id: string;
  date: string; // ISO 8601 format
  amount: number; // Positive for income, negative for expense
  category: string;
  description: string; // Rich text (HTML) from the Editor
  tags: string[];
}

export interface FinancialEvent {
  id: string;
  title: string;
  start: string; // ISO 8601 format
  end: string; // ISO 8601 format
  isAllDay: boolean;
  recurrenceRule?: string; // RRULE for recurring events
}

export interface NotificationState {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppState {
  notifications: NotificationState[];
  transactions: Transaction[];
  categories: string[];
  tags: string[];
  financialEvents: FinancialEvent[];
  preferences: {
    theme: 'light';
    language: 'en' | 'zh';
  };

  // --- Actions ---
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  updateTransaction: (tx: Transaction) => void;
  deleteTransaction: (id: string) => void;

  addCategory: (category: string) => void;
  deleteCategory: (category: string) => void;

  addTag: (tag: string) => void;
  deleteTag: (tag: string) => void;

  addFinancialEvent: (event: Omit<FinancialEvent, 'id'>) => void;
  updateFinancialEvent: (event: FinancialEvent) => void;
  deleteFinancialEvent: (id: string) => void;

  setLanguage: (language: 'en' | 'zh') => void;

  resetApp: () => void;
  clearAll: () => void;

  addNotification: (notification: Omit<NotificationState, 'id'>) => void;
  removeNotification: (id: string) => void;
}

const cloneTransactions = () => DEFAULT_TRANSACTIONS.map((tx) => ({ ...tx, tags: [...tx.tags] }));
const cloneEvents = () => DEFAULT_EVENTS.map((event) => ({ ...event }));

const buildInitialData = () => ({
  notifications: [] as NotificationState[],
  transactions: cloneTransactions(),
  categories: [...DEFAULT_CATEGORIES],
  tags: [...BASE_TAGS],
  financialEvents: cloneEvents(),
  preferences: {
    theme: 'light' as const,
    language: 'en' as const,
  },
});

// --- Store Implementation ---
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...buildInitialData(),

      // --- Action Implementations ---
      addTransaction: (tx) =>
        set((state) => ({
          transactions: [...state.transactions, { ...tx, id: new Date().toISOString() }],
        })),
      updateTransaction: (tx) =>
        set((state) => ({
          transactions: state.transactions.map((t) => (t.id === tx.id ? tx : t)),
        })),
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      addCategory: (category) =>
        set((state) => ({
          categories: [...state.categories, category],
        })),
      deleteCategory: (category) =>
        set((state) => ({
          categories: state.categories.filter((c) => c !== category),
        })),

      addTag: (tag) =>
        set((state) => ({
          tags: [...state.tags, tag],
        })),
      deleteTag: (tag) =>
        set((state) => ({
          tags: state.tags.filter((t) => t !== tag),
        })),

      addFinancialEvent: (event) =>
        set((state) => ({
          financialEvents: [...state.financialEvents, { ...event, id: new Date().toISOString() }],
        })),
      updateFinancialEvent: (event) =>
        set((state) => ({
          financialEvents: state.financialEvents.map((e) => (e.id === event.id ? event : e)),
        })),
      deleteFinancialEvent: (id) =>
        set((state) => ({
          financialEvents: state.financialEvents.filter((e) => e.id !== id),
        })),

      setLanguage: (language) =>
        set((state) => ({
          preferences: { ...state.preferences, language },
        })),

      resetApp: () =>
        set(() => ({
          ...buildInitialData(),
        })),

      clearAll: () =>
        set((state) => ({
          notifications: [],
          transactions: [],
          financialEvents: [],
          categories: [...DEFAULT_CATEGORIES],
          tags: [...BASE_TAGS],
          preferences: state.preferences,
        })),

      addNotification: (notification) =>
        set((state) => ({
          notifications: [...state.notifications, { ...notification, id: new Date().toISOString() }],
        })),
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
    }),
    {
      name: 'bookkeeping-app-storage', // Name for the localStorage key
    }
  )
);
