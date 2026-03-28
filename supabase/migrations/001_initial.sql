BEGIN;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  email text NOT NULL,
  role text NOT NULL CHECK (role IN ('Analyst', 'Partner', 'Admin')),
  first_name text NOT NULL,
  last_name text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  last_login_at timestamptz
);

CREATE UNIQUE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_is_active ON users(is_active);
CREATE INDEX idx_users_created_at ON users(created_at);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_all" ON users FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

-- Funds table
CREATE TABLE funds (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid NOT NULL REFERENCES users(id),
  name text NOT NULL,
  vintage_year integer NOT NULL,
  fund_size numeric(15,2) NOT NULL,
  target_irr numeric(5,2),
  investment_period_years integer NOT NULL,
  is_active boolean NOT NULL DEFAULT true
);

CREATE INDEX idx_funds_created_by ON funds(created_by);
CREATE INDEX idx_funds_vintage_year ON funds(vintage_year);
CREATE INDEX idx_funds_is_active ON funds(is_active);
CREATE INDEX idx_funds_created_at ON funds(created_at);

ALTER TABLE funds ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_all" ON funds FOR ALL USING (auth.uid() = created_by) WITH CHECK (auth.uid() = created_by);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

-- Portfolio companies table
CREATE TABLE portfolio_companies (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid NOT NULL REFERENCES users(id),
  fund_id uuid NOT NULL REFERENCES funds(id),
  company_name text NOT NULL,
  industry text,
  sector text,
  headquarters_location text,
  investment_date date NOT NULL,
  exit_date date,
  status text NOT NULL CHECK (status IN ('active', 'exited', 'written_off')),
  crm_contact_id text,
  crm_company_id text
);

CREATE INDEX idx_portfolio_companies_created_by ON portfolio_companies(created_by);
CREATE INDEX idx_portfolio_companies_fund_id ON portfolio_companies(fund_id);
CREATE INDEX idx_portfolio_companies_industry ON portfolio_companies(industry);
CREATE INDEX idx_portfolio_companies_investment_date ON portfolio_companies(investment_date);
CREATE INDEX idx_portfolio_companies_status ON portfolio_companies(status);
CREATE INDEX idx_portfolio_companies_created_at ON portfolio_companies(created_at);

ALTER TABLE portfolio_companies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_all" ON portfolio_companies FOR ALL USING (auth.uid() = created_by) WITH CHECK (auth.uid() = created_by);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

-- Investments table
CREATE TABLE investments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid NOT NULL REFERENCES users(id),
  portfolio_company_id uuid NOT NULL REFERENCES portfolio_companies(id),
  investment_type text NOT NULL CHECK (investment_type IN ('initial', 'follow_on', 'bridge', 'exit')),
  investment_amount numeric(15,2) NOT NULL,
  valuation_pre_money numeric(15,2),
  valuation_post_money numeric(15,2),
  ownership_percentage numeric(5,2),
  transaction_date date NOT NULL,
  current_value numeric(15,2),
  realized_proceeds numeric(15,2),
  is_realized boolean NOT NULL DEFAULT false
);

CREATE INDEX idx_investments_created_by ON investments(created_by);
CREATE INDEX idx_investments_portfolio_company_id ON investments(portfolio_company_id);
CREATE INDEX idx_investments_investment_type ON investments(investment_type);
CREATE INDEX idx_investments_transaction_date ON investments(transaction_date);
CREATE INDEX idx_investments_created_at ON investments(created_at);

ALTER TABLE investments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_all" ON investments FOR ALL USING (auth.uid() = created_by) WITH CHECK (auth.uid() = created_by);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

-- Financial statements table
CREATE TABLE financial_statements (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid NOT NULL REFERENCES users(id),
  portfolio_company_id uuid NOT NULL REFERENCES portfolio_companies(id),
  period_end_date date NOT NULL,
  period_type text NOT NULL CHECK (period_type IN ('quarterly', 'annual')),
  statement_type text NOT NULL CHECK (statement_type IN ('income_statement', 'balance_sheet', 'cash_flow')),
  source_type text NOT NULL CHECK (source_type IN ('pdf_upload', 'quickbooks', 'xero', 'manual_entry')),
  source_file_url text,
  external_id text,
  processing_status text NOT NULL CHECK (processing_status IN ('pending', 'processing', 'completed', 'failed')) DEFAULT 'pending',
  parsed_data jsonb,
  validation_errors jsonb
);

CREATE INDEX idx_financial_statements_created_by ON financial_statements(created_by);
CREATE INDEX idx_financial_statements_portfolio_company_id ON financial_statements(portfolio_company_id);
CREATE INDEX idx_financial_statements_period_end_date ON financial_statements(period_end_date);
CREATE INDEX idx_financial_statements_statement_type ON financial_statements(statement_type);
CREATE INDEX idx_financial_statements_processing_status ON financial_statements(processing_status);
CREATE INDEX idx_financial_statements_created_at ON financial_statements(created_at);

ALTER TABLE financial_statements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_all" ON financial_statements FOR ALL USING (auth.uid() = created_by) WITH CHECK (auth.uid() = created_by);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

-- Financial metrics table
CREATE TABLE financial_metrics (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid NOT NULL REFERENCES users(id),
  portfolio_company_id uuid NOT NULL REFERENCES portfolio_companies(id),
  period_end_date date NOT NULL,
  revenue numeric(15,2),
  gross_profit numeric(15,2),
  ebitda numeric(15,2),
  ebitda_margin numeric(5,2),
  net_income numeric(15,2),
  revenue_growth_rate numeric(5,2),
  debt_to_equity_ratio numeric(8,4),
  current_ratio numeric(8,4),
  working_capital numeric(15,2),
  cash_balance numeric(15,2),
  burn_rate numeric(15,2),
  runway_months numeric(6,2)
);

CREATE INDEX idx_financial_metrics_created_by ON financial_metrics(created_by);
CREATE INDEX idx_financial_metrics_portfolio_company_id ON financial_metrics(portfolio_company_id);
CREATE INDEX idx_financial_metrics_period_end_date ON financial_metrics(period_end_date);
CREATE INDEX idx_financial_metrics_ebitda_margin ON financial_metrics(ebitda_margin);
CREATE INDEX idx_financial_metrics_revenue_growth_rate ON financial_metrics(revenue_growth_rate);
CREATE INDEX idx_financial_metrics_created_at ON financial_metrics(created_at);

ALTER TABLE financial_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_all" ON financial_metrics FOR ALL USING (auth.uid() = created_by) WITH CHECK (auth.uid() = created_by);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

-- IRR calculations table
CREATE TABLE irr_calculations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid NOT NULL REFERENCES users(id),
  investment_id uuid NOT NULL REFERENCES investments(id),
  calculation_date date NOT NULL,
  scenario_name text NOT NULL,
  irr_percentage numeric(8,4),
  moic numeric(8,4),
  total_invested numeric(15,2) NOT NULL,
  current_value numeric(15,2) NOT NULL,
  cash_flows jsonb NOT NULL,
  benchmark_irr numeric(8,4),
  time_weighted_return numeric(8,4)
);

CREATE INDEX idx_irr_calculations_created_by ON irr_calculations(created_by);
CREATE INDEX idx_irr_calculations_investment_id ON irr_calculations(investment_id);
CREATE INDEX idx_irr_calculations_calculation_date ON irr_calculations(calculation_date);
CREATE INDEX idx_irr_calculations_scenario_name ON irr_calculations(scenario_name);
CREATE INDEX idx_irr_calculations_irr_percentage ON irr_calculations(irr_percentage);
CREATE INDEX idx_irr_calculations_created_at ON irr_calculations(created_at);

ALTER TABLE irr_calculations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_all" ON irr_calculations FOR ALL USING (auth.uid() = created_by) WITH CHECK (auth.uid() = created_by);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_funds_updated_at BEFORE UPDATE ON funds FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_portfolio_companies_updated_at BEFORE UPDATE ON portfolio_companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_investments_updated_at BEFORE UPDATE ON investments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_financial_statements_updated_at BEFORE UPDATE ON financial_statements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_financial_metrics_updated_at BEFORE UPDATE ON financial_metrics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_irr_calculations_updated_at BEFORE UPDATE ON irr_calculations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

COMMIT;