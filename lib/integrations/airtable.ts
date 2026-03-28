import Airtable from 'airtable';

interface AirtableRecord {
  id: string;
  fields: {
    [key: string]: any;
  };
  createdTime: string;
}

interface BaseInfo {
  id: string;
  name: string;
  permissionLevel: string;
}

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });

export async function getRecords(baseId: string, tableName: string): Promise<AirtableRecord[]> {
  try {
    const records: AirtableRecord[] = [];
    await base(baseId)(tableName)
      .select({
        maxRecords: 100,
        view: 'Grid view'
      })
      .eachPage((pageRecords, fetchNextPage) => {
        records.push(...pageRecords.map(record => ({
          id: record.id,
          fields: record.fields,
          createdTime: record._rawJson.createdTime
        })));
        fetchNextPage();
      });
    return records;
  } catch (error) {
    throw new Error(`Failed to fetch Airtable records: ${error}`);
  }
}

export async function createRecord(baseId: string, tableName: string, fields: object): Promise<AirtableRecord> {
  try {
    const record = await base(baseId)(tableName).create(fields);
    return {
      id: record.id,
      fields: record.fields,
      createdTime: record._rawJson.createdTime
    };
  } catch (error) {
    throw new Error(`Failed to create Airtable record: ${error}`);
  }
}