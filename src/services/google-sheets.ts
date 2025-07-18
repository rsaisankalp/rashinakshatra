'use server';

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { GOOGLE_SHEET_ID, GOOGLE_SHEET_TAB_NAME, GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } from '@/lib/google-sheets-credentials';

const serviceAccountAuth = new JWT({
    email: GOOGLE_CLIENT_EMAIL,
    key: GOOGLE_PRIVATE_KEY,
    scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
    ],
});

const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);

type SheetRow = {
    name: string;
    whatsapp: string;
    dob: string;
    tob: string;
};

export async function appendToSheet(rowData: SheetRow) {
    try {
        await doc.loadInfo(); 
        const sheet = doc.sheetsByTitle[GOOGLE_SHEET_TAB_NAME];
        if (!sheet) {
            console.error(`Sheet with title "${GOOGLE_SHEET_TAB_NAME}" not found.`);
            return { error: 'Sheet not found.' };
        }
        await sheet.addRow({
            Name: rowData.name,
            'WhatsApp Number': rowData.whatsapp,
            'Date of Birth': rowData.dob,
            'Time of Birth': rowData.tob,
            'Timestamp': new Date().toISOString(),
        });
        return { success: true };
    } catch (error) {
        console.error('Error appending to sheet:', error);
        return { error: 'Failed to save details to sheet.' };
    }
}
