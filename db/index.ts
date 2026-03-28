import { supabase } from '@/lib/supabase';
import type { User, Fund, PortfolioCompany, Investment, FinancialStatement, FinancialMetrics, IrrCalculation, Alert } from '@/types';

// Users
export async function getAllUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from('users')
    .select('id, created_at, updated_at, email, role, first_name, last_name, is_active, last_login_at')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch users: ${error.message}`);
  return data;
}

export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('id, created_at, updated_at, email, role, first_name, last_name, is_active, last_login_at')
    .eq('id', id)
    .single();
  
  if (error) throw new Error(`Failed to fetch user: ${error.message}`);
  return data;
}

export async function createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .insert(user)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create user: ${error.message}`);
  return data;
}

export async function updateUser(id: string, user: Partial<User>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .update(user)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to update user: ${error.message}`);
  return data;
}

export async function deleteUser(id: string): Promise<void> {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete user: ${error.message}`);
}

// Funds
export async function getAllFunds(): Promise<Fund[]> {
  const { data, error } = await supabase
    .from('funds')
    .select('id, created_at, updated_at, created_by, name, vintage_year, fund_size, target_irr, investment_period_years, is_active')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch funds: ${error.message}`);
  return data;
}

export async function getFundById(id: string): Promise<Fund | null> {
  const { data, error } = await supabase
    .from('funds')
    .select('id, created_at, updated_at, created_by, name, vintage_year, fund_size, target_irr, investment_period_years, is_active')
    .eq('id', id)
    .single();
  
  if (error) throw new Error(`Failed to fetch fund: ${error.message}`);
  return data;
}

export async function createFund(fund: Omit<Fund, 'id' | 'created_at' | 'updated_at'>): Promise<Fund> {
  const { data, error } = await supabase
    .from('funds')
    .insert(fund)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create fund: ${error.message}`);
  return data;
}

export async function updateFund(id: string, fund: Partial<Fund>): Promise<Fund> {
  const { data, error } = await supabase
    .from('funds')
    .update(fund)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to update fund: ${error.message}`);
  return data;
}

export async function deleteFund(id: string): Promise<void> {
  const { error } = await supabase
    .from('funds')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete fund: ${error.message}`);
}

// Portfolio Companies
export async function getAllPortfolioCompanies(): Promise<PortfolioCompany[]> {
  const { data, error } = await supabase
    .from('portfolio_companies')
    .select('id, created_at, updated_at, created_by, fund_id, company_name, industry, sector, headquarters_location, investment_date, exit_date, status, crm_contact_id, crm_company_id')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch portfolio companies: ${error.message}`);
  return data;
}

export async function getPortfolioCompanyById(id: string): Promise<PortfolioCompany | null> {
  const { data, error } = await supabase
    .from('portfolio_companies')
    .select('id, created_at, updated_at, created_by, fund_id, company_name, industry, sector, headquarters_location, investment_date, exit_date, status, crm_contact_id, crm_company_id')
    .eq('id', id)
    .single();
  
  if (error) throw new Error(`Failed to fetch portfolio company: ${error.message}`);
  return data;
}

export async function createPortfolioCompany(company: Omit<PortfolioCompany, 'id' | 'created_at' | 'updated_at'>): Promise<PortfolioCompany> {
  const { data, error } = await supabase
    .from('portfolio_companies')
    .insert(company)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create portfolio company: ${error.message}`);
  return data;
}

export async function updatePortfolioCompany(id: string, company: Partial<PortfolioCompany>): Promise<PortfolioCompany> {
  const { data, error } = await supabase
    .from('portfolio_companies')
    .update(company)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to update portfolio company: ${error.message}`);
  return data;
}

export async function deletePortfolioCompany(id: string): Promise<void> {
  const { error } = await supabase
    .from('portfolio_companies')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete portfolio company: ${error.message}`);
}

// Investments
export async function getAllInvestments(): Promise<Investment[]> {
  const { data, error } = await supabase
    .from('investments')
    .select('id, created_at, updated_at, created_by, portfolio_company_id, investment_type, investment_amount, valuation_pre_money, valuation_post_money, ownership_percentage, transaction_date, current_value, realized_proceeds, is_realized')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch investments: ${error.message}`);
  return data;
}

export async function getInvestmentById(id: string): Promise<Investment | null> {
  const { data, error } = await supabase
    .from('investments')
    .select('id, created_at, updated_at, created_by, portfolio_company_id, investment_type, investment_amount, valuation_pre_money, valuation_post_money, ownership_percentage, transaction_date, current_value, realized_proceeds, is_realized')
    .eq('id', id)
    .single();
  
  if (error) throw new Error(`Failed to fetch investment: ${error.message}`);
  return data;
}

export async function createInvestment(investment: Omit<Investment, 'id' | 'created_at' | 'updated_at'>): Promise<Investment> {
  const { data, error } = await supabase
    .from('investments')
    .insert(investment)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create investment: ${error.message}`);
  return data;
}

export async function updateInvestment(id: string, investment: Partial<Investment>): Promise<Investment> {
  const { data, error } = await supabase
    .from('investments')
    .update(investment)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to update investment: ${error.message}`);
  return data;
}

export async function deleteInvestment(id: string): Promise<void> {
  const { error } = await supabase
    .from('investments')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete investment: ${error.message}`);
}

// Financial Statements
export async function getAllFinancialStatements(): Promise<FinancialStatement[]> {
  const { data, error } = await supabase
    .from('financial_statements')
    .select('id, created_at, updated_at, created_by, portfolio_company_id, period_end_date, period_type, statement_type, source_type, source_file_url, external_id, processing_status, parsed_data, validation_errors')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch financial statements: ${error.message}`);
  return data;
}

export async function getFinancialStatementById(id: string): Promise<FinancialStatement | null> {
  const { data, error } = await supabase
    .from('financial_statements')
    .select('id, created_at, updated_at, created_by, portfolio_company_id, period_end_date, period_type, statement_type, source_type, source_file_url, external_id, processing_status, parsed_data, validation_errors')
    .eq('id', id)
    .single();
  
  if (error) throw new Error(`Failed to fetch financial statement: ${error.message}`);
  return data;
}

export async function createFinancialStatement(statement: Omit<FinancialStatement, 'id' | 'created_at' | 'updated_at'>): Promise<FinancialStatement> {
  const { data, error } = await supabase
    .from('financial_statements')
    .insert(statement)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create financial statement: ${error.message}`);
  return data;
}

export async function updateFinancialStatement(id: string, statement: Partial<FinancialStatement>): Promise<FinancialStatement> {
  const { data, error } = await supabase
    .from('financial_statements')
    .update(statement)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to update financial statement: ${error.message}`);
  return data;
}

export async function deleteFinancialStatement(id: string): Promise<void> {
  const { error } = await supabase
    .from('financial_statements')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete financial statement: ${error.message}`);
}

// Financial Metrics
export async function getAllFinancialMetrics(): Promise<FinancialMetrics[]> {
  const { data, error } = await supabase
    .from('financial_metrics')
    .select('id, created_at, updated_at, created_by, portfolio_company_id, period_end_date, revenue, gross_profit, ebitda, ebitda_margin, net_income, revenue_growth_rate, debt_to_equity_ratio, current_ratio, working_capital, cash_balance, burn_rate, runway_months')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch financial metrics: ${error.message}`);
  return data;
}

export async function getFinancialMetricsById(id: string): Promise<FinancialMetrics | null> {
  const { data, error } = await supabase
    .from('financial_metrics')
    .select('id, created_at, updated_at, created_by, portfolio_company_id, period_end_date, revenue, gross_profit, ebitda, ebitda_margin, net_income, revenue_growth_rate, debt_to_equity_ratio, current_ratio, working_capital, cash_balance, burn_rate, runway_months')
    .eq('id', id)
    .single();
  
  if (error) throw new Error(`Failed to fetch financial metrics: ${error.message}`);
  return data;
}

export async function createFinancialMetrics(metrics: Omit<FinancialMetrics, 'id' | 'created_at' | 'updated_at'>): Promise<FinancialMetrics> {
  const { data, error } = await supabase
    .from('financial_metrics')
    .insert(metrics)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create financial metrics: ${error.message}`);
  return data;
}

export async function updateFinancialMetrics(id: string, metrics: Partial<FinancialMetrics>): Promise<FinancialMetrics> {
  const { data, error } = await supabase
    .from('financial_metrics')
    .update(metrics)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to update financial metrics: ${error.message}`);
  return data;
}

export async function deleteFinancialMetrics(id: string): Promise<void> {
  const { error } = await supabase
    .from('financial_metrics')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete financial metrics: ${error.message}`);
}

// IRR Calculations
export async function getAllIrrCalculations(): Promise<IrrCalculation[]> {
  const { data, error } = await supabase
    .from('irr_calculations')
    .select('id, created_at, updated_at, created_by, investment_id, calculation_date, scenario_name, irr_percentage, moic, total_invested, current_value, cash_flows, benchmark_irr, time_weighted_return')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch IRR calculations: ${error.message}`);
  return data;
}

export async function getIrrCalculationById(id: string): Promise<IrrCalculation | null> {
  const { data, error } = await supabase
    .from('irr_calculations')
    .select('id, created_at, updated_at, created_by, investment_id, calculation_date, scenario_name, irr_percentage, moic, total_invested, current_value, cash_flows, benchmark_irr, time_weighted_return')
    .eq('id', id)
    .single();
  
  if (error) throw new Error(`Failed to fetch IRR calculation: ${error.message}`);
  return data;
}

export async function createIrrCalculation(calculation: Omit<IrrCalculation, 'id' | 'created_at' | 'updated_at'>): Promise<IrrCalculation> {
  const { data, error } = await supabase
    .from('irr_calculations')
    .insert(calculation)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create IRR calculation: ${error.message}`);
  return data;
}

export async function updateIrrCalculation(id: string, calculation: Partial<IrrCalculation>): Promise<IrrCalculation> {
  const { data, error } = await supabase
    .from('irr_calculations')
    .update(calculation)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to update IRR calculation: ${error.message}`);
  return data;
}

export async function deleteIrrCalculation(id: string): Promise<void> {
  const { error } = await supabase
    .from('irr_calculations')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete IRR calculation: ${error.message}`);
}

// Alerts
export async function getAllAlerts(): Promise<Alert[]> {
  const { data, error } = await supabase
    .from('alerts')
    .select('id, created_at, updated_at, created_by, portfolio_company_id, alert_type, severity, message, triggered_date, metric_value, threshold_value, is_acknowledged, acknowledged_by, acknowledged_at')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(`Failed to fetch alerts: ${error.message}`);
  return data;
}

export async function getAlertById(id: string): Promise<Alert | null> {
  const { data, error } = await supabase
    .from('alerts')
    .select('id, created_at, updated_at, created_by, portfolio_company_id, alert_type, severity, message, triggered_date, metric_value, threshold_value, is_acknowledged, acknowledged_by, acknowledged_at')
    .eq('id', id)
    .single();
  
  if (error) throw new Error(`Failed to fetch alert: ${error.message}`);
  return data;
}

export async function createAlert(alert: Omit<Alert, 'id' | 'created_at' | 'updated_at'>): Promise<Alert> {
  const { data, error } = await supabase
    .from('alerts')
    .insert(alert)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to create alert: ${error.message}`);
  return data;
}

export async function updateAlert(id: string, alert: Partial<Alert>): Promise<Alert> {
  const { data, error } = await supabase
    .from('alerts')
    .update(alert)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw new Error(`Failed to update alert: ${error.message}`);
  return data;
}

export async function deleteAlert(id: string): Promise<void> {
  const { error } = await supabase
    .from('alerts')
    .delete()
    .eq('id', id);
  
  if (error) throw new Error(`Failed to delete alert: ${error.message}`);
}