import { GoogleSpreadsheet } from 'google-spreadsheet';

interface SheetData {
  [key: string]: string | number;
}

interface WorksheetInfo {
  sheetId: number;
  title: string;
  index: number;
  rowCount: number;
  columnCount: number;
}

export async function getSheetData(spreadsheetId: string, worksheetIndex = 0): Promise<SheetData[]> {
  try {
    const doc = new GoogleSpreadsheet(spreadsheetId);
    await doc.useApiKey(process.env.GOOGLE_SHEETS_API_KEY!);
    await doc.loadInfo();
    
    const sheet = doc.sheetsByIndex[worksheetIndex];
    const rows = await sheet.getRows();
    return rows.map(row => row.toObject());
  } catch (error) {
    throw new Error(`Failed to fetch Google Sheets data: ${error}`);
  }
}

export async function getWorksheets(spreadsheetId: string): Promise<WorksheetInfo[]> {
  try {
    const doc = new GoogleSpreadsheet(spreadsheetId);
    await doc.useApiKey(process.env.GOOGLE_SHEETS_API_KEY!);
    await doc.loadInfo();
    
    return Object.values(doc.sheetsById).map(sheet => ({
      sheetId: sheet.sheetId,
      title: sheet.title,
      index: sheet.index,
      rowCount: sheet.rowCount,
      columnCount: sheet.columnCount
    }));
  } catch (error) {
    throw new Error(`Failed to fetch Google Sheets worksheets: ${error}`);
  }
}