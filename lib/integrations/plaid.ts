import { PlaidApi, PlaidEnvironments, Configuration } from 'plaid';

interface Account {
  account_id: string;
  name: string;
  type: string;
  subtype: string;
  balance: {
    available: number;
    current: number;
  };
}

interface Transaction {
  transaction_id: string;
  account_id: string;
  amount: number;
  date: string;
  name: string;
  category: string[];
}

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID!,
      'PLAID-SECRET': process.env.PLAID_SECRET!
    }
  }
});

const client = new PlaidApi(configuration);

export async function getAccounts(accessToken: string): Promise<Account[]> {
  try {
    const response = await client.accountsGet({ access_token: accessToken });
    return response.data.accounts;
  } catch (error) {
    throw new Error(`Failed to fetch Plaid accounts: ${error}`);
  }
}

export async function getTransactions(accessToken: string, startDate: string, endDate: string): Promise<Transaction[]> {
  try {
    const response = await client.transactionsGet({
      access_token: accessToken,
      start_date: startDate,
      end_date: endDate
    });
    return response.data.transactions;
  } catch (error) {
    throw new Error(`Failed to fetch Plaid transactions: ${error}`);
  }
}