import { Client } from '@hubspot/api-client';

interface Contact {
  id: string;
  email: string;
  firstname?: string;
  lastname?: string;
  company?: string;
}

interface Deal {
  id: string;
  dealname: string;
  amount: string;
  dealstage: string;
  closedate?: string;
}

const client = new Client({ accessToken: process.env.HUBSPOT_API_KEY });

export async function getContacts(limit = 100): Promise<Contact[]> {
  try {
    const response = await client.crm.contacts.basicApi.getPage(limit);
    return response.results.map(contact => ({
      id: contact.id!,
      email: contact.properties.email || '',
      firstname: contact.properties.firstname,
      lastname: contact.properties.lastname,
      company: contact.properties.company
    }));
  } catch (error) {
    throw new Error(`Failed to fetch HubSpot contacts: ${error}`);
  }
}

export async function getDeals(limit = 100): Promise<Deal[]> {
  try {
    const response = await client.crm.deals.basicApi.getPage(limit);
    return response.results.map(deal => ({
      id: deal.id!,
      dealname: deal.properties.dealname || '',
      amount: deal.properties.amount || '0',
      dealstage: deal.properties.dealstage || '',
      closedate: deal.properties.closedate
    }));
  } catch (error) {
    throw new Error(`Failed to fetch HubSpot deals: ${error}`);
  }
}