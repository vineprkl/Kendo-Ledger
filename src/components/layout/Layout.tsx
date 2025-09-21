'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';
import { useAppStore } from '@/store';
import '@/lib/kendo-license';

const NAV_LINKS = [
  { href: '/', label: 'Dashboard', icon: '\u{1F4CA}' },
  { href: '/transactions', label: 'Transactions', icon: '\u{1F4DD}' },
  { href: '/board', label: 'Board', icon: '\u{1F4CB}' },
  { href: '/calendar', label: 'Calendar', icon: '\u{1F4C5}' },
  { href: '/settings', label: 'Settings', icon: '\u2699\uFE0F' },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r border-[var(--border-subtle)] bg-[var(--sidebar)] px-6 py-8 text-[var(--muted)] transition-colors md:flex">
      <div className="flex w-full flex-col gap-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">KendoReact</p>
          <h1 className="mt-2 text-2xl font-semibold text-[var(--foreground)]">Ledger Pro</h1>
        </div>
        <nav aria-label="Main navigation">
          <ul className="space-y-1">
            {NAV_LINKS.map(({ href, label, icon }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[var(--sidebar-active)] text-[var(--accent)] shadow-sm'
                        : 'text-[var(--muted)] hover:bg-[var(--sidebar-active)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    <span className="text-lg" aria-hidden>
                      {icon}
                    </span>
                    <span>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

const Header = () => {
  const pathname = usePathname();
  const active = NAV_LINKS.find((link) => link.href === pathname);
  const heading = active?.label ?? 'Ledger Pro';

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--surface)]/95 px-6 py-4 backdrop-blur-md transition-colors supports-[backdrop-filter]:bg-[var(--surface)]/80">
      <h2 className="text-lg font-semibold text-[var(--foreground)]">{heading}</h2>
      {pathname === '/settings' ? null : (
        <Link
          href="/settings"
          className="rounded-lg border border-[var(--border-subtle)] px-4 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
        >
          Settings
        </Link>
      )}
    </header>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const notifications = useAppStore((state) => state.notifications);

  return (
    <div className="flex min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-transparent p-6">
          <div className="mx-auto w-full max-w-6xl space-y-6">{children}</div>
        </main>
      </div>
      <NotificationGroup
        style={{
          right: '10px',
          bottom: '10px',
          alignItems: 'flex-start',
          flexWrap: 'wrap-reverse',
        }}
      >
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            type={{ style: notification.type, icon: true }}
            closable
            onClose={() => useAppStore.getState().removeNotification(notification.id)}
          >
            {notification.message}
          </Notification>
        ))}
      </NotificationGroup>
    </div>
  );
};

export default Layout;
