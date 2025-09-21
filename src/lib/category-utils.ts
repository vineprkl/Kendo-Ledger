export const CATEGORY_LABELS: Record<string, string> = {
  'Uncategorized': 'Uncategorized',
  'Food & Dining': 'Food & Dining',
  'Transport': 'Transport',
  'Shopping': 'Shopping',
  'Entertainment': 'Entertainment',
  'Housing': 'Housing',
  'Salary': 'Salary',
  'Investments': 'Investments',
  'Other': 'Other',
};

export const CATEGORY_ALIASES: Record<string, string> = {
  '\u672a\u5206\u7c7b': 'Uncategorized',
  '\u672a\u5206\u985e': 'Uncategorized',
  'uncategorized': 'Uncategorized',
  '\u9910\u996e': 'Food & Dining',
  '\u9910\u98f2': 'Food & Dining',
  'food & dining': 'Food & Dining',
  'food': 'Food & Dining',
  '\u4ea4\u901a': 'Transport',
  'transport': 'Transport',
  '\u8d2d\u7269': 'Shopping',
  '\u8cfc\u7269': 'Shopping',
  'shopping': 'Shopping',
  '\u5a31\u4e50': 'Entertainment',
  '\u5a1b\u6a02': 'Entertainment',
  'entertainment': 'Entertainment',
  '\u4f4f\u623f': 'Housing',
  'housing': 'Housing',
  '\u5de5\u8d44': 'Salary',
  '\u5de5\u8cc7': 'Salary',
  'salary': 'Salary',
  '\u7406\u8d22': 'Investments',
  '\u7406\u8ca1': 'Investments',
  '\u6295\u8d44': 'Investments',
  '\u6295\u8cc7': 'Investments',
  'finance': 'Investments',
  'investments': 'Investments',
  '\u5176\u4ed6': 'Other',
  'other': 'Other',
};

export const DEFAULT_CATEGORIES = Object.keys(CATEGORY_LABELS);

export const normalizeCategory = (value: string): string => {
  if (!value) {
    return value;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return trimmed;
  }

  const direct = CATEGORY_ALIASES[trimmed];
  if (direct) {
    return direct;
  }

  const lower = trimmed.toLowerCase();
  return CATEGORY_ALIASES[lower] ?? trimmed;
};

export const categoryLabel = (value: string): string => {
  const canonical = normalizeCategory(value);
  return CATEGORY_LABELS[canonical] ?? canonical;
};
