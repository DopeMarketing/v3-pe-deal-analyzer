export interface User {
  id: string;
  created_at: Date;
  updated_at: Date;
  email: string;
  role: 'Analyst' | 'Partner' | 'Admin';
  first_name: string;
  last_name: string;
  is_active: boolean;
  last_login_at: Date | null;
}

export interface Fund {
  id: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  name: string;
  vintage_year: number;
  fund_size: number;
  target_irr: number | null;
  investment_period_years: number;
  is_active: boolean;
}

export interface PortfolioCompany {
  id: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  fund_id: string;
  company_name: string;
  industry: string | null;
  sector: string | null;
  headquarters_location: string | null;
  investment_date: string;
  exit_date: string | null;
  status: 'active' | 'exited' | 'written_off';
  crm_contact_id: string | null;
  crm_company_id: string | null;
}

export interface Investment {
  id: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  portfolio_company_id: string;
  investment_type: 'initial' | 'follow_on' | 'bridge' | 'exit';
  investment_amount: number;
  valuation_pre_money: number | null;
  valuation_post_money: number | null;
  ownership_percentage: number | null;
  transaction_date: string;
  current_value: number | null;
  realized_proceeds: number | null;
  is_realized: boolean;
}

export interface FinancialStatement {
  id: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  portfolio_company_id: string;
  period_end_date: string;
  period_type: 'quarterly' | 'annual';
  statement_type: 'income_statement' | 'balance_sheet' | 'cash_flow';
  source_type: 'pdf_upload' | 'quickbooks' | 'xero' | 'manual_entry';
  source_file_url: string | null;
  external_id: string | null;
  processing_status: 'pending' | 'processing' | 'completed' | 'failed';
  parsed_data: any | null;
  validation_errors: any | null;
}

export interface FinancialMetrics {
  id: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  portfolio_company_id: string;
  period_end_date: string;
  revenue: number | null;
  gross_profit: number | null;
  ebitda: number | null;
  ebitda_margin: number | null;
  net_income: number | null;
  revenue_growth_rate: number | null;
  debt_to_equity_ratio: number | null;
  current_ratio: number | null;
  working_capital: number | null;
  cash_balance: number | null;
  burn_rate: number | null;
  runway_months: number | null;
}

export interface IrrCalculation {
  id: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  investment_id: string;
  calculation_date: string;
  scenario_name: string;
  irr_percentage: number | null;
  moic: number | null;
  total_invested: number;
  current_value: number;
  cash_flows: any;
  benchmark_irr: number | null;
  time_weighted_return: number | null;
}

export interface DealComparison {
  id: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  report_name: string;
  description: string | null;
  portfolio_company_ids: any;
  comparison_metrics: any;
  time_period: any;
  analysis_results: any | null;
  last_updated_at: Date;
  is_published: boolean;
}

export interface Alert {
  id: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  portfolio_company_id: string;
  alert_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  triggered_date: string;
  metric_value: number | null;
  threshold_value: number | null;
  is_acknowledged: boolean;
  acknowledged_by: string | null;
  acknowledged_at: Date | null;
}

export interface TaxRecommendation {
  id: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  portfolio_company_id: string;
  tax_year: number;
  recommendation_type: string;
  title: string;
  description: string;
  estimated_savings: number | null;
  implementation_priority: 'low' | 'medium' | 'high' | 'urgent';
  deadline: string | null;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  assigned_to: string | null;
  supporting_data: any | null;
}

export interface ExecutiveDashboard {
  id: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  dashboard_name: string;
  fund_id: string | null;
  dashboard_type: 'monthly' | 'quarterly' | 'annual' | 'ad_hoc';
  period_end_date: string;
  summary_metrics: any;
  top_performers: any | null;
  underperformers: any | null;
  key_insights: any | null;
  chart_configs: any;
  last_updated_at: Date;
  is_published: boolean;
}

export interface AiDealScore {
  id: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  portfolio_company_id: string;
  score_date: string;
  success_probability: number;
  predicted_irr: number | null;
  predicted_moic: number | null;
  risk_score: number;
  model_version: string;
  input_features: any;
  confidence_score: number;
  key_drivers: any | null;
  peer_comparison: any | null;
}

export interface IntegrationConfig {
  id: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  integration_type: string;
  portfolio_company_id: string | null;
  config_name: string;
  credentials: any;
  sync_settings: any;
  last_sync_at: Date | null;
  sync_status: 'pending' | 'active' | 'error' | 'disabled';
  error_message: string | null;
  is_active: boolean;
}

export interface SyncLog {
  id: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  integration_config_id: string;
  sync_started_at: Date;
  sync_completed_at: Date | null;
  status: 'running' | 'completed' | 'failed';
  records_processed: number | null;
  records_created: number | null;
  records_updated: number | null;
  records_failed: number | null;
  error_details: any | null;
  sync_summary: any | null;
}

export type Database = {
  users: User;
  funds: Fund;
  portfolio_companies: PortfolioCompany;
  investments: Investment;
  financial_statements: FinancialStatement;
  financial_metrics: FinancialMetrics;
  irr_calculations: IrrCalculation;
  deal_comparisons: DealComparison;
  alerts: Alert;
  tax_recommendations: TaxRecommendation;
  executive_dashboards: ExecutiveDashboard;
  ai_deal_scores: AiDealScore;
  integration_configs: IntegrationConfig;
  sync_logs: SyncLog;
};