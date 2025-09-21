import '@testing-library/jest-dom';

// Mock Next.js Link and navigation for component tests
jest.mock('next/link', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ href, children, ...props }: any) => React.createElement('a', { href, ...props }, children),
  };
}, { virtual: true });
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}), { virtual: true });

