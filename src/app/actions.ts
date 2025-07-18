'use server';
import { z } from 'zod';
import { format } from 'date-fns';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  whatsapp: z.string().regex(/^\d{10}$/, "WhatsApp number must be 10 digits."),
  dob: z.date(),
  tob: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
});

export type FormValues = z.infer<typeof formSchema>;

export interface RashiData {
    Rashi: string;
    birthNakshatra: string;
    inputName: string;
}

export async function getRashiAndNakshatra(
  values: FormValues
): Promise<{ data?: RashiData | null; error?: string | null; }> {
  try {
    const validatedData = formSchema.parse(values);

    const bdate = format(validatedData.dob, 'dd/MM/yyyy');
    const time = `${validatedData.tob}:00`;
    const name = validatedData.name;
    const year = new Date().getFullYear().toString();
    const tz = 'GMT+05:30';

    const params = new URLSearchParams({
      bdate,
      PAnth: '0',
      time,
      year,
      name,
      tz,
      utm_source: 'myweb',
    });

    const url = `https://www.janmatithi.in/cgi-bin/first-new.pl?${params.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Authorization': 'Basic NTZhMzU3MWU5MTgwNjc1YzBjOTkzNTBhMDc0ZDQ1NGE6OGY2OTk1ZDdlNDM3MTk5ZTcwZDVlNDFkYzAxNTg4YmI=',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15',
      },
      cache: 'no-store' // Ensure fresh data on each request
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", response.status, errorText);
        return { error: `API request failed. Please try again.` };
    }

    const data = await response.json();
    
    if (!data.Rashi || !data.birthNakshatra) {
        console.error("Invalid API response:", data);
        return { error: "Could not retrieve Rashi and Nakshatra. Please check your details and try again." };
    }

    return { data: {
        Rashi: data.Rashi,
        birthNakshatra: data.birthNakshatra,
        inputName: data.inputName
    } };
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
        return { error: 'Invalid form data provided.' }
    }
    return { error: 'An unexpected error occurred. Please try again later.' };
  }
}
