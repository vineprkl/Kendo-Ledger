const today = new Date();
const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

const isoAt = (offsetDays: number, hour = 9, minute = 0) => {
  const date = new Date(startOfToday);
  date.setDate(date.getDate() + offsetDays);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
};

export const DEFAULT_TRANSACTIONS = [
  {
    id: 'tx-001',
    date: isoAt(-9, 9, 30),
    amount: 2450,
    category: 'Salary',
    description: 'Monthly payroll deposit',
    tags: ['work', 'recurring'],
  },
  {
    id: 'tx-002',
    date: isoAt(-9, 12, 45),
    amount: -28.5,
    category: 'Food & Dining',
    description: 'Lunch at The Corner Deli',
    tags: ['one-time'],
  },
  {
    id: 'tx-003',
    date: isoAt(-8, 18, 0),
    amount: -62.2,
    category: 'Transport',
    description: 'Monthly subway pass top-up',
    tags: ['recurring'],
  },
  {
    id: 'tx-004',
    date: isoAt(-7, 10, 30),
    amount: -180,
    category: 'Shopping',
    description: 'Household supplies order',
    tags: ['family'],
  },
  {
    id: 'tx-005',
    date: isoAt(-6, 8, 0),
    amount: 320,
    category: 'Investments',
    description: 'Quarterly dividend payout',
    tags: ['recurring'],
  },
  {
    id: 'tx-006',
    date: isoAt(-5, 19, 30),
    amount: -75,
    category: 'Entertainment',
    description: 'Concert tickets',
    tags: ['personal'],
  },
  {
    id: 'tx-007',
    date: isoAt(-4, 8, 15),
    amount: -1200,
    category: 'Housing',
    description: 'Rent payment',
    tags: ['recurring'],
  },
  {
    id: 'tx-008',
    date: isoAt(-3, 11, 40),
    amount: -45.75,
    category: 'Food & Dining',
    description: 'Groceries - weekend market',
    tags: ['family'],
  },
  {
    id: 'tx-009',
    date: isoAt(-2, 16, 0),
    amount: 210,
    category: 'Investments',
    description: 'Stock sale proceeds',
    tags: ['investments'],
  },
  {
    id: 'tx-010',
    date: isoAt(-1, 20, 0),
    amount: -55.3,
    category: 'Entertainment',
    description: 'Movie night out',
    tags: ['personal'],
  },
  {
    id: 'tx-011',
    date: isoAt(0, 7, 45),
    amount: -32,
    category: 'Transport',
    description: 'Rideshare to client site',
    tags: ['work'],
  },
  {
    id: 'tx-012',
    date: isoAt(1, 14, 45),
    amount: -310,
    category: 'Shopping',
    description: 'New ergonomic chair',
    tags: ['work'],
  },
  {
    id: 'tx-013',
    date: isoAt(2, 9, 15),
    amount: 520,
    category: 'Salary',
    description: 'Freelance project payout',
    tags: ['work'],
  },
  {
    id: 'tx-014',
    date: isoAt(3, 13, 30),
    amount: -88.4,
    category: 'Food & Dining',
    description: 'Sunday brunch with friends',
    tags: ['personal'],
  },
  {
    id: 'tx-015',
    date: isoAt(4, 15, 45),
    amount: -420,
    category: 'Housing',
    description: 'Home maintenance service',
    tags: ['family'],
  },
  {
    id: 'tx-016',
    date: isoAt(5, 11, 0),
    amount: 145,
    category: 'Investments',
    description: 'Peer-to-peer interest return',
    tags: ['investments'],
  },
];

export const DEFAULT_EVENTS = [
  {
    id: 'event-001',
    title: 'Mortgage payment',
    start: isoAt(-3, 9, 0),
    end: isoAt(-3, 9, 30),
    isAllDay: false,
  },
  {
    id: 'event-002',
    title: 'Financial advisor meeting',
    start: isoAt(-1, 14, 0),
    end: isoAt(-1, 15, 0),
    isAllDay: false,
  },
  {
    id: 'event-003',
    title: 'Weekly budget review',
    start: isoAt(0, 18, 30),
    end: isoAt(0, 19, 0),
    isAllDay: false,
  },
  {
    id: 'event-004',
    title: 'Tax filing deadline',
    start: isoAt(2, 8, 0),
    end: isoAt(2, 9, 0),
    isAllDay: false,
  },
  {
    id: 'event-005',
    title: 'Team offsite lunch',
    start: isoAt(3, 12, 30),
    end: isoAt(3, 14, 0),
    isAllDay: false,
  },
  {
    id: 'event-006',
    title: 'Investment portfolio review',
    start: isoAt(5, 16, 0),
    end: isoAt(5, 17, 0),
    isAllDay: false,
  },
];
