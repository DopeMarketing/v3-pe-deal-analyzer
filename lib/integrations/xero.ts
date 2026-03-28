import { XeroApi } from 'xero-node';

interface Contact {
  contactID: string;
  name: string;
  emailAddress?: string;
  contactStatus: string;
}

interface Invoice {
  invoiceID: string;
  invoiceNumber: string;
  contact: Contact;
  total: number;
  date: string;
  status: string;
}

const xero = new XeroApi({
  clientId: process.env.XERO_CLIENT_ID!,
  clientSecret: process.env.XERO_CLIENT_SECRET!,
  redirectUris: [process.env.XERO_REDIRECT_URI!],
  scopes: 'accounting.read accounting.transactions'
});

export async function getContacts(tenantId: string): Promise<Contact[]> {
  try {
    const response = await xero.accountingApi.getContacts(tenantId);
    return response.body.contacts || [];
  } catch (error) {
    throw new Error(`Failed to fetch Xero contacts: ${error}`);
  }
}

export async function getInvoices(tenantId: string): Promise<Invoice[]> {
  try {
    const response = await xero.accountingApi.getInvoices(tenantId);
    return response.body.invoices || [];
  } catch (error) {
    throw new Error(`Failed to fetch Xero invoices: ${error}`);
  }
}