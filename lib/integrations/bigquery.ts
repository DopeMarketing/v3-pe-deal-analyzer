import { BigQuery } from '@google-cloud/bigquery';

interface QueryResult {
  [key: string]: any;
}

interface Dataset {
  id: string;
  name: string;
  location: string;
}

const bigquery = new BigQuery({
  keyFilename: process.env.BIGQUERY_API_KEY,
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID
});

export async function runQuery(query: string): Promise<QueryResult[]> {
  try {
    const [job] = await bigquery.createQueryJob({ query });
    const [rows] = await job.getQueryResults();
    return rows;
  } catch (error) {
    throw new Error(`BigQuery query failed: ${error}`);
  }
}

export async function getDatasets(): Promise<Dataset[]> {
  try {
    const [datasets] = await bigquery.getDatasets();
    return datasets.map(dataset => ({
      id: dataset.id!,
      name: dataset.metadata.friendlyName || dataset.id!,
      location: dataset.metadata.location || 'US'
    }));
  } catch (error) {
    throw new Error(`Failed to fetch BigQuery datasets: ${error}`);
  }
}