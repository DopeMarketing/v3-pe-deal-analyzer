import jsforce from 'jsforce';

interface SalesforceRecord {
  Id: string;
  [key: string]: any;
}

interface QueryResult {
  totalSize: number;
  done: boolean;
  records: SalesforceRecord[];
}

const conn = new jsforce.Connection({
  loginUrl: process.env.SALESFORCE_LOGIN_URL || 'https://login.salesforce.com'
});

export async function query(soql: string): Promise<QueryResult> {
  try {
    await conn.login(process.env.SALESFORCE_USERNAME!, process.env.SALESFORCE_PASSWORD!);
    const result = await conn.query(soql);
    return {
      totalSize: result.totalSize,
      done: result.done,
      records: result.records as SalesforceRecord[]
    };
  } catch (error) {
    throw new Error(`Salesforce query failed: ${error}`);
  }
}

export async function getAccounts(limit = 100): Promise<SalesforceRecord[]> {
  try {
    await conn.login(process.env.SALESFORCE_USERNAME!, process.env.SALESFORCE_PASSWORD!);
    const result = await conn.sobject('Account')
      .select('Id, Name, Type, Industry, AnnualRevenue')
      .limit(limit)
      .execute();
    return result as SalesforceRecord[];
  } catch (error) {
    throw new Error(`Failed to fetch Salesforce accounts: ${error}`);
  }
}