# V3 Pe Deal Analyzer — Claude Briefing

Private equity deal analysis platform with automated financial modeling, CRM integrations, and AI-powered investment scoring for comprehensive portfolio management.

## Tech Stack
- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Integrations**: HubSpot, BigQuery, QuickBooks, Xero, Plaid, Google Sheets, Airtable, Salesforce
- **Deployment**: Vercel
- **AI/Analytics**: Custom financial modeling engine, deal scoring models

## Project Structure


app/
├── (auth)/                 # Public auth pages (login, signup)
├── (dashboard)/            # Protected pages with shared layout
│   ├── dashboard/         # Main dashboard
│   ├── deals/            # Deal management pages
│   ├── portfolio/        # Portfolio company pages
│   ├── financial-data/   # Financial data upload/management
│   ├── reports/          # Analytics and reporting
│   ├── ai-scoring/       # AI model management
│   ├── integrations/     # Third-party integrations setup
│   ├── performance-alerts/ # Alert management
│   └── settings/         # User and system settings
├── api/                   # API routes for integrations
└── globals.css           # Global styles

components/
├── ui/                    # Shadcn/ui base components
├── charts/               # Financial charts and visualizations
├── forms/                # Form components for data entry
├── tables/               # Data table components
└── layout/               # Navigation, headers, sidebars

lib/
├── actions/              # Server actions for mutations
├── calculations/         # Financial modeling (IRR, MOIC, etc.)
├── integrations/         # API clients for external services
├── ai/                   # Deal scoring and ML models
├── parsers/             # Financial statement parsing
├── utils.ts             # Utility functions
└── validations/         # Zod schemas

db/
├── index.ts             # Database client setup
├── queries/             # Database query functions
└── types.ts             # TypeScript types for tables

supabase/
├── migrations/          # Database migration files
├── config.toml         # Supabase configuration
└── seed.sql            # Development seed data


## Coding Conventions

- **TypeScript**: Strict mode enabled, explicit types required
- **Components**: Server Components by default, Client Components only when needed
- **Data Access**: All database queries in `/db/queries/`, no direct Supabase calls in components
- **Business Logic**: Pure functions in `/lib/`, server actions in `/lib/actions/`
- **Security**: No secrets in client components, all sensitive operations server-side
- **Styling**: Tailwind CSS with consistent design system
- **Validation**: Zod schemas for all user inputs and API responses

## Current State

This is a freshly generated scaffold containing:

### Generated Files
- Complete Next.js 15 app structure with App Router
- 30 page stubs matching the sitemap (auth and protected routes)
- 14 database tables with migrations and TypeScript types
- Integration stubs for 8 external services
- Authentication setup with role-based access (Analyst, Partner, Admin)
- Basic UI components and layout structure
- Environment variable configuration
- Deployment configuration for Vercel

### Database Schema
- `users` - Authentication and role management
- `funds` - Private equity fund tracking
- `portfolio_companies` - Portfolio company information
- `investments` - Investment transactions and terms
- `financial_statements` - Financial data storage
- `financial_metrics` - Calculated KPIs and ratios
- `irr_calculations` - Return calculations
- `deal_comparisons` - Comparative analysis data
- `alerts` - Performance monitoring
- `tax_recommendations` - Tax optimization data
- `executive_dashboards` - Dashboard configurations
- `ai_deal_scores` - ML model outputs
- `integration_configs` - Third-party settings
- `sync_logs` - Data synchronization audit

## What to Build Next — V1 Features

1. **Financial Statement Parser** - Build automated extraction system for P&L, balance sheet, and cash flow from PDF uploads and QuickBooks/Xero APIs with support for variable layouts

2. **IRR and MOIC Calculator** - Implement time-weighted returns calculator with scenario modeling and industry benchmark comparisons

3. **Deal Performance Dashboard** - Create comprehensive dashboard showing EBITDA trends, revenue growth, margin analysis, and financial ratios with drill-down capabilities

4. **CRM Integration Hub** - Build HubSpot and Salesforce connectors to sync deal data, contacts, and investment timelines automatically

5. **Portfolio Comparison Engine** - Develop side-by-side deal analysis with peer benchmarking and relative performance rankings

6. **AI Deal Scoring Model** - Train and deploy ML model on historical PE outcomes to predict investment success probability

## Never Touch Rules

❌ **Never modify without explicit instruction:**
- `.env` files (security risk)
- Migration files in `supabase/migrations/` (data integrity)
- RLS policies (security - requires review)
- Authentication configuration (security critical)
- Database schema changes without migration

✅ **Always safe to modify:**
- Component files in `/components/`
- Page files in `/app/`
- Utility functions in `/lib/`
- Styling and UI improvements
- Business logic and calculations

## How to Work on This Project

### Before Starting Any Session
1. **Read this file first** - Understand current state and conventions
2. **Check TECHNICAL_DEBT.md** - Know existing shortcuts and limitations
3. **Review ROADMAP.md** - Understand feature priorities

### Development Workflow
1. **Start small** - Pick one feature or component to work on
2. **Build incrementally** - Make frequent, small commits
3. **Test as you go** - Run `npm run build` to catch TypeScript errors
4. **Commit early and often** - Use conventional commit messages
5. **Document technical debt** - Add items to TECHNICAL_DEBT.md for shortcuts taken

### Git Commit Format
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `style:` for formatting changes
- `refactor:` for code restructuring
- `test:` for adding tests
- `chore:` for maintenance tasks

### Key Integration Points
- Financial data flows through `/lib/parsers/` then `/db/queries/`
- All calculations in `/lib/calculations/` with pure functions
- External API calls in `/lib/integrations/` with proper error handling
- UI state management through React Server Components and Server Actions
- Authentication handled by Supabase with role-based access

### Priority Order for V1
1. Financial statement parser (core functionality)
2. Basic IRR/MOIC calculations (essential metrics)
3. Deal dashboard (user interface)
4. CRM integrations (data flow)
5. Comparison engine (analytics)
6. AI scoring (advanced features)

Focus on getting core financial analysis working first, then add integrations and advanced features.