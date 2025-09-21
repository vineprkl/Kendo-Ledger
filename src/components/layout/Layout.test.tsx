import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Layout from './Layout';

const mockRemoveNotification = jest.fn();

jest.mock('@/store', () => ({
  useAppStore: jest.fn(() => ({
    notifications: [{ id: 'n1', message: 'hello_notice', type: 'info' }],
    removeNotification: mockRemoveNotification,
  })),
}));

describe('Layout Notifications', () => {
  it('renders and closes notifications', () => {
    render(
      <Layout>
        <div>child</div>
      </Layout>
    );

    expect(screen.getByText('hello_notice')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'close' }));
    expect(mockRemoveNotification).toHaveBeenCalledWith('n1');
  });
});
