'use server';

import { google } from 'googleapis';
import { GOOGLE_SHEET_ID, GOOGLE_SHEET_TAB_NAME, GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } from '@/lib/google-sheets-credentials';

type SheetRow = {
    name: string;
    whatsapp: string;
    dob: string;
    tob: string;
};

export async function appendToSheet(rowData: SheetRow) {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: GOOGLE_CLIENT_EMAIL,
                private_key: GOOGLE_PRIVATE_KEY,
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        const timestamp = new Date().toISOString();

        const rowValues = [
            timestamp,
            rowData.name,
            rowData.whatsapp,
            rowData.dob,
            rowData.tob,
        ];

        const request = {
            spreadsheetId: GOOGLE_SHEET_ID,
            range: GOOGLE_SHEET_TAB_NAME, 
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            resource: {
                values: [rowValues],
            },
        };

        const response = await sheets.spreadsheets.values.append(request);

        if (response.status === 200) {
            console.log("Successfully saved to Google Sheet.");
            return { success: true };
        } else {
            console.error("Error saving to Google Sheet, API response status:", response.status, response.statusText);
            return { error: `Failed to save details to sheet. API Status: ${response.statusText}` };
        }

    } catch (error: any) {
        console.error('Error appending to sheet:', error);
        
        let errorMessage = 'Failed to save details to sheet.';
        if (error.response?.data?.error?.message) {
            errorMessage += ` Google API Error: ${error.response.data.error.message}.`;
        } else if (error.message) {
            errorMessage += ` Details: ${error.message}.`;
        }

        return { error: errorMessage };
    }
}
