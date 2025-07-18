'use client';

import { useState } from 'react';
import { SankalpaForm } from '@/components/sankalpa-form';
import { LoadingSpinner } from '@/components/loading-spinner';
import { ResultsDisplay } from '@/components/results-display';
import { getRashiAndNakshatra, type RashiData, type FormValues } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RashiData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: any) => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    const submissionData: FormValues = {
      name: data.name,
      whatsapp: data.whatsapp,
      day: data.day,
      month: data.month,
      year: data.year,
      tob: data.tob,
    }

    // Artificial delay to demonstrate loading state
    await new Promise(resolve => setTimeout(resolve, 2000));

    const response = await getRashiAndNakshatra(submissionData);

    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setResult(response.data);
    }

    setLoading(false);
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-8 font-body">
      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="text-center">
          <h1 className="font-headline text-4xl sm:text-5xl font-bold text-primary">Find My Rashi Nakshatra</h1>
          <p className="text-muted-foreground mt-2">
            Enter your birth details to discover your Rashi and Nakshatra.
          </p>
        </div>

        <div className="min-h-[520px] flex items-center justify-center">
          {loading ? (
            <LoadingSpinner />
          ) : result ? (
            <ResultsDisplay result={result} onReset={handleReset} />
          ) : (
            <div className="w-full animate-in fade-in-50 duration-500">
               {error && (
                <Alert variant="destructive" className="mb-4">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <SankalpaForm onSubmit={handleFormSubmit} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
