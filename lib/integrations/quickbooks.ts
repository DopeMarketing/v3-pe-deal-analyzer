import OAuthClient from 'intuit-oauth';

interface Customer {
  id: string;
  name: string;
  email?: string;
  balance: number;
}

interface Invoice {
  id: string;
  customerRef: string;
  totalAmt: number;
  txnDate: string;
  docNumber: string;
}

const oauthClient = new OAuthClient({
  clientId: process.env.QUICKBOOKS_CLIENT_ID!,
  clientSecret: process.env.QUICKBOOKS_CLIENT_SECRET!,
  environment: 'sandbox',
  redirectUri: process.env.QUICKBOOKS_REDIRECT_URI!
});

export async function getCustomers(companyId: string): Promise<Customer[]> {
  try {
    const authResponse = oauthClient.getToken();
    const response = await oauthClient.makeApiCall({
      url: `https://sandbox-quickbooks.api.intuit.com/v3/company/${companyId}/customers`,
      method: 'GET',
      headers: { Accept: 'application/json' }
    });
    return response.json.QueryResponse.Customer || [];
  } catch (error) {
    throw new Error(`Failed to fetch QuickBooks customers: ${error}`);
  }
}

export async function getInvoices(companyId: string): Promise<Invoice[]> {
  try {
    const authResponse = oauthClient.getToken();
    const response = await oauthClient.makeApiCall({
      url: `https://sandbox-quickbooks.api.intuit.com/v3/company/${companyId}/invoices`,
      method: 'GET',
      headers: { Accept: 'application/json' }
    });
    return response.json.QueryResponse.Invoice || [];
  } catch (error) {
    throw new Error(`Failed to fetch QuickBooks invoices: ${error}`);
  }
}