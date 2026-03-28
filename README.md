# V3 Pe Deal Analyzer

Private equity deal analysis platform with automated financial modeling and AI-powered investment scoring.

## Overview

V3 Pe Deal Analyzer is a comprehensive private equity analytics platform that automates deal evaluation by parsing financial statements, calculating key metrics like IRR and MOIC, and providing AI-powered scoring for investment decisions. Built for private equity firms to streamline their investment analysis workflow and improve decision-making with data-driven insights.

### Built For
- Private equity analysts
- Investment partners
- Fund administrators
- Investment committees

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Integrations**: HubSpot, BigQuery, QuickBooks, Xero, Plaid, Google Sheets, Airtable, Salesforce
- **Deployment**: Vercel
- **Analytics**: Custom financial modeling engine
- **AI**: Deal scoring models

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase CLI
- Git

## Local Development Setup

1. **Clone the repository**
   bash
   git clone <repository-url>
   cd v3-pe-deal-analyzer
   

2. **Install dependencies**
   bash
   npm install
   

3. **Set up environment variables**
   bash
   cp .env.example .env.local
   
   Fill in the required environment variables (see table below)

4. **Start Supabase**
   bash
   supabase start
   

5. **Run database migrations**
   bash
   supabase db reset
   

6. **Start development server**
   bash
   npm run dev
   

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side) | Yes |
| `HUBSPOT_ACCESS_TOKEN` | HubSpot private app token | No |
| `SALESFORCE_CLIENT_ID` | Salesforce connected app client ID | No |
| `SALESFORCE_CLIENT_SECRET` | Salesforce connected app secret | No |
| `QUICKBOOKS_CLIENT_ID` | QuickBooks app client ID | No |
| `QUICKBOOKS_CLIENT_SECRET` | QuickBooks app secret | No |
| `XERO_CLIENT_ID` | Xero app client ID | No |
| `XERO_CLIENT_SECRET` | Xero app secret | No |
| `PLAID_CLIENT_ID` | Plaid client ID | No |
| `PLAID_SECRET` | Plaid secret key | No |
| `GOOGLE_SHEETS_API_KEY` | Google Sheets API key | No |
| `BIGQUERY_PROJECT_ID` | Google BigQuery project ID | No |
| `BIGQUERY_CREDENTIALS` | Base64 encoded service account JSON | No |
| `AIRTABLE_ACCESS_TOKEN` | Airtable personal access token | No |

## Database Setup

The database schema includes 14 tables for comprehensive deal tracking:

- `users` - User authentication and roles
- `funds` - Private equity fund information
- `portfolio_companies` - Portfolio company details
- `investments` - Investment transactions and terms
- `financial_statements` - P&L, balance sheet, cash flow data
- `financial_metrics` - Calculated KPIs and ratios
- `irr_calculations` - IRR and MOIC calculations
- `deal_comparisons` - Side-by-side deal analysis
- `alerts` - Performance alerts and notifications
- `tax_recommendations` - Tax optimization suggestions
- `executive_dashboards` - Dashboard configurations
- `ai_deal_scores` - AI model predictions
- `integration_configs` - Third-party integration settings
- `sync_logs` - Data synchronization audit trail

Migrations are automatically applied when running `supabase db reset`.

## Deployment

### Deploy to Vercel

1. **Connect to Vercel**
   bash
   npx vercel
   

2. **Configure environment variables**
   Add all required environment variables in the Vercel dashboard

3. **Deploy**
   bash
   npx vercel --prod
   

## Project Structure


├── app/                    # Next.js 15 app router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Protected dashboard pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   └── forms/            # Form components
├── lib/                  # Business logic and utilities
│   ├── actions/          # Server actions
│   ├── integrations/     # Third-party integrations
│   ├── calculations/     # Financial modeling
│   └── validations/      # Schema validations
├── db/                   # Database utilities and types
├── supabase/            # Supabase configuration
│   ├── migrations/      # Database migrations
│   └── config.toml      # Supabase settings
└── public/              # Static assets


## Development Workflow

1. Create feature branches from `main`
2. Make small, focused commits with conventional commit messages
3. Run `npm run build` before committing
4. Submit pull requests for review
5. Deploy to staging for testing before production

## Support

For questions or issues, please refer to the technical documentation or create an issue in the repository.