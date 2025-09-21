import { useAppStore } from './index';

describe('Zustand Store - Additional Actions', () => {
  beforeEach(() => {
    useAppStore.getState().resetApp();
  });

  it('sets language to en and zh', () => {
    const { setLanguage } = useAppStore.getState();
    setLanguage('en');
    expect(useAppStore.getState().preferences.language).toBe('en');
    setLanguage('zh');
    expect(useAppStore.getState().preferences.language).toBe('zh');
  });

  it('adds and deletes a category', () => {
    const { addCategory, deleteCategory } = useAppStore.getState();
    const initialCategories = useAppStore.getState().categories;
    const baselineLength = initialCategories.length;

    addCategory('Travel');
    expect(useAppStore.getState().categories).toContain('Travel');
    expect(useAppStore.getState().categories.length).toBe(baselineLength + 1);

    deleteCategory('Travel');
    expect(useAppStore.getState().categories).not.toContain('Travel');
    expect(useAppStore.getState().categories.length).toBe(baselineLength);
  });

  it('adds and deletes a tag', () => {
    const { addTag, deleteTag } = useAppStore.getState();
    const baselineLength = useAppStore.getState().tags.length;

    addTag('urgent');
    expect(useAppStore.getState().tags).toContain('urgent');
    expect(useAppStore.getState().tags.length).toBe(baselineLength + 1);

    deleteTag('urgent');
    expect(useAppStore.getState().tags).not.toContain('urgent');
    expect(useAppStore.getState().tags.length).toBe(baselineLength);
  });

  it('adds, updates and deletes a financial event', () => {
    const { addFinancialEvent, updateFinancialEvent, deleteFinancialEvent } = useAppStore.getState();
    const baselineLength = useAppStore.getState().financialEvents.length;

    addFinancialEvent({
      title: 'Payday',
      start: new Date().toISOString(),
      end: new Date().toISOString(),
      isAllDay: true,
    });
    const eventsAfterCreate = useAppStore.getState().financialEvents;
    expect(eventsAfterCreate.length).toBe(baselineLength + 1);
    const created = eventsAfterCreate[eventsAfterCreate.length - 1];
    expect(created.title).toBe('Payday');

    updateFinancialEvent({ ...created, title: 'Payday Updated' });
    const updated = useAppStore.getState().financialEvents.find((event) => event.id === created.id);
    expect(updated?.title).toBe('Payday Updated');

    deleteFinancialEvent(created.id);
    expect(useAppStore.getState().financialEvents.length).toBe(baselineLength);
  });
});
