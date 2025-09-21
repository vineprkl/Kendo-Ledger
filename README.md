# Kendo React Bookkeeping App

An end-to-end bookkeeping experience built with **Next.js 15**, **React 18**, and the **KendoReact** component suite. The goal of this project is to transform the classic HTML bookkeeping sample into a modern, production-ready dashboard that demonstrates the breadth of KendoReact components, real-time data interactions, and state persistence with **Zustand**.

## ✨ Features at a Glance

- **Dashboard Overview**
  - Expense distribution pie chart
  - Income vs expense line chart (adaptive labels for small screens)
  - Spending heatmap grouped by weekday and hour
  - Finance Tasks card (scrollable) highlighting upcoming calendar events and high-value transactions
  - Quick “Add Transaction” button that opens a Kendo Dialog form
- **Transactions Workspace**
  - KendoReact Grid with sorting, search, paging, export, and inline actions
  - Dialog-driven add/edit flow backed by Zustand actions
- **Classification Board**
  - Drag & drop categorisation using KendoReact Sortable
- **Financial Calendar**
  - Scheduler view combining transactions and events
  - “Add Quick Event” button to create 1-hour reminders instantly
- **Settings Hub**
  - Export / Import JSON data
  - Reset to sample data
  - Clear all data (transactions, events, notifications)
  - Notifications area powered by KendoReact Notification Group
- **Global State & Persistence**
  - Zustand store with `persist` middleware to keep data between sessions
  - Sample data is generated relative to “today” ensuring fresh dashboard insights

## 🧱 Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── dashboard/
│   │   ├── transactions/
│   │   ├── board/
│   │   ├── calendar/
│   │   └── settings/
│   ├── components/
│   │   ├── dashboard/
│   │   ├── transactions/
│   │   ├── board/
│   │   ├── calendar/
│   │   └── shared/
│   ├── lib/                 # Utilities (category helpers, Kendo license loader)
│   └── store/               # Zustand store, default data, tests
├── public/                  # Static assets
├── README.md                # You are here
└── LICENSE                  # MIT License (project level)
```

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Configure KendoReact license**
   - Obtain a license key from [Progress](https://www.telerik.com/kendo-react-ui/).
   - Create `.env.local` (see `.env.local.example`) and add:
     ```bash
     NEXT_PUBLIC_KENDO_LICENSE_KEY=your-license-key-here
     ```
   - Restart the dev server so the key loads via `src/lib/kendo-license.ts`.
3. **Run the dev server**
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3020](http://localhost:3020) to explore the app.

> **Note:** If the license key is missing, the browser console will warn you (non-production) and KendoReact will display trial watermarks.

## 🧪 Testing & Quality

| Command            | Description                                    |
| ------------------ | ---------------------------------------------- |
| `npm run test`     | Run Jest unit tests (store & component helpers) |
| `npm run lint`     | Execute ESLint over the project                 |
| `npm run build`    | Production build (Next.js)                      |

## 📦 Data & Persistence

- Default sample data is in `src/store/defaultData.ts` and is generated relative to the current date.
- Use the **Settings** page for:
  - **Reset to Sample Data** – reloads the defaults.
  - **Clear All Data** – wipes transactions/events/notifications but keeps base categories/tags.
  - **Export / Import** – snapshot your data to JSON or load existing JSON back in.

## 🔌 Tech Stack

- **Next.js 15 (App Router)**
- **React 18**
- **KendoReact**: charts, scheduler, grid, dialogs, buttons, cards, chips, dropdowns, editor, notification, etc.
- **Zustand** + `persist` for global state
- **Tailwind-inspired CSS variables** for theme control
- **Jest + Testing Library** for unit tests

## 🔐 Environment Variables

| Variable                           | Purpose                                   |
| ---------------------------------- | ----------------------------------------- |
| `NEXT_PUBLIC_KENDO_LICENSE_KEY`    | KendoReact license key (required)         |

Create `.env.local` in the project root and supply the variables listed above.

## 📝 Changelog Highlights

- Added Finance Tasks card with scrollable task list
- Dashboard “Add Transaction” button wired to `TransactionDialog`
- Calendar quick-add events and notification feedback
- Settings “Clear All Data” action
- Responsive x-axis labels on line chart for narrow layouts

## 💡 Roadmap Ideas

- Authentication layer and per-user data storage
- Analytics exports (CSV/Excel) for dashboard charts
- Advanced filtering on the Transactions page
- Mobile-friendly layout tweaks

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch `git checkout -b feature/xyz`
3. Commit changes `git commit -m 'Add XYZ'`
4. Push to branch and submit a PR

Please run lint/tests before submitting:
```bash
npm run lint
npm run test
```

## 📄 License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.

Happy bookkeeping! 🎉
