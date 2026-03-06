# `use client` Inventory

Generated during the refactor branch to classify current client boundaries.

Legend:

- **Required**: Must stay client due to hooks, browser APIs, event handlers, or client-only libs.
- **Accidental**: Can be removed or deleted safely.
- **Layout contamination**: High-level layout/page forcing unnecessary hydration.

| File | Classification | Reason | Action |
| --- | --- | --- | --- |
| `src/components/teachers/teachers-client.tsx` | Required | Interactive client table/actions | Keep |
| `src/app/auth/reset-password/page.tsx` | Required | Uses client hooks + form events + navigation hooks | Keep |
| `src/app/auth/forgot-password/page.tsx` | Required | Uses client hooks + form events | Keep |
| `src/app/auth/request-access/page.tsx` | Required | Uses transitions/state, toast, router navigation | Keep |
| `src/app/auth/register/page.tsx` | Required | Uses transitions/state, router, toast | Keep |
| `src/app/dashboard/error.tsx` | Required | Next.js error boundary requires client component | Keep |
| `src/components/events/events-client.tsx` | Required | Interactive dashboard module | Keep |
| `src/components/forms/login-form.tsx` | Required | Controlled auth form interactions | Keep |
| `src/components/finance/finance-client.tsx` | Required | Interactive finance UI | Keep |
| `src/components/LanguageToggle.tsx` | Required | Uses router hooks + cookie/localStorage writes | Keep |
| `src/components/finance/fee-payment-actions.tsx` | Required | User action handlers | Keep |
| `src/components/ui/macos-toast.tsx` | Required | Client-side toast runtime | Keep |
| `src/components/ui/data-table-pagination.tsx` | Required | Event-driven pagination controls | Keep |
| `src/components/ui/dialog.tsx` | Required | Radix dialog client primitives | Keep |
| `src/components/ui/tabs.tsx` | Required | Radix tabs client primitives | Keep |
| `src/components/ui/select.tsx` | Required | Radix select client primitives | Keep |
| `src/components/ui/search-input.tsx` | Required | Input events/state | Keep |
| `src/components/timetable/govt-primary-routine-client.tsx` | Required | Interactive routine management | Keep |
| `src/components/classes/classes-client.tsx` | Required | Client interactions and local UI state | Keep |
| `src/components/classes/classes-only-client.tsx` | Required | Client interactions and local UI state | Keep |
| `src/components/timetable/timetable-client.tsx` | Required | Interactive timetable UI | Keep |
| `src/components/exams/primary-exam-client.tsx` | Required | Interactive exam management | Keep |
| `src/components/exports/export-options-dialog.tsx` | Required | Dialog interactions and events | Keep |
| `src/components/notices/notice-board-client.tsx` | Required | Notice board interactions | Keep |
| `src/components/i18n/language-toggle.tsx` | Accidental | Legacy duplicate toggle; no project imports found | Delete |
| `src/components/attendance/attendance-client.tsx` | Required | Interactive attendance workflows | Keep |
| `src/components/layout/mobile-menu-content.client.tsx` | Required | Mobile navigation interactions | Keep |
| `src/components/layout/app-toaster.tsx` | Required | Sonner client-side toaster | Keep |
| `src/components/subjects/subjects-client.tsx` | Required | Interactive subject management | Keep |
| `src/components/layout/sidebar.tsx` | Required | Uses pathname/search params and expand/collapse state | Keep |
| `src/components/layout/topbar.tsx` | Required | Uses client i18n hooks + dialog state | Keep |
| `src/components/layout/active-link.client.tsx` | Required | Active-route client behavior | Keep |
| `src/components/layout/mobile-fab.tsx` | Required | Scroll listeners + click handlers | Keep |
| `src/components/layout/tab-loading-indicator.tsx` | Required | Patches `window.fetch` + DOM APIs | Keep |
| `src/components/layout/mobile-menu-drawer.client.tsx` | Required | Drawer state and interactions | Keep |
| `src/components/analytics/analytics-client.tsx` | Required | Interactive analytics UI | Keep |
| `src/components/landing/demo-booking-form.tsx` | Required | Form state/submission interactions | Keep |
| `src/components/landing/landing-header.tsx` | Required | Client nav interactions | Keep |
| `src/components/pwa/sw-register.tsx` | Required | Browser service worker API | Keep |
| `src/components/announcements/announcements-client.tsx` | Required | Interactive announcements UI | Keep |
| `src/components/grades/grades-client.tsx` | Required | Interactive grade UI | Keep |
| `src/components/settings/settings-client.tsx` | Required | Settings forms/interactions | Keep |
| `src/components/students/template-selector.tsx` | Required | Selector interactions/state | Keep |
| `src/components/students/report-preview.tsx` | Required | Client-side preview behavior | Keep |
| `src/components/students/student-search-select.tsx` | Required | Search input + dynamic selection interactions | Keep |
| `src/components/students/student-row-actions.client.tsx` | Required | Per-row UI actions | Keep |
| `src/components/students/reports-workspace.tsx` | Required | Orchestrates client report workflow state | Keep |
| `src/components/students/students-toolbar.client.tsx` | Required | Toolbar filters/actions | Keep |
| `src/components/students/report-toolbar.tsx` | Required | Controlled fields and action handlers | Keep |
| `src/components/students/students-header.tsx` | Required | Uses client i18n hook (`useT`) | Keep |
| `src/components/students/student-dialogs.client.tsx` | Required | Dialog state/actions | Keep |
| `src/components/pwa/offline-banner.tsx` | Required | `navigator.onLine` and browser events | Keep |
| `src/components/control/inactive-control-client.tsx` | Required | Interactive control surface | Keep |
| `src/lib/i18n/client.ts` | Required | Client locale state from cookies/localStorage/window events | Keep |

## Summary

- Total audited: **54**
- Required: **53**
- Accidental: **1**
- Layout contamination found: **0** high-confidence cases
