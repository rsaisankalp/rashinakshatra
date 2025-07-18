import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { RashiData } from "@/app/actions"
import { Sparkles, MoonStar, ArrowLeft } from "lucide-react"

type ResultsDisplayProps = {
  result: RashiData;
  onReset: () => void;
};

export function ResultsDisplay({ result, onReset }: ResultsDisplayProps) {
  return (
    <Card className="text-center bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg animate-in fade-in-50 duration-500 w-full">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-foreground">
          Namaste, {result.inputName}
        </CardTitle>
        <CardDescription className="font-body text-base">
          Here are your verified details.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 text-left">
        <div className="flex items-center p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="p-3 bg-primary/20 rounded-full mr-4">
            <MoonStar className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-body text-sm text-muted-foreground">Your Rashi (Moon Sign)</p>
            <p className="font-headline text-2xl font-semibold">{result.Rashi}</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-accent/10 rounded-lg border border-accent/20">
          <div className="p-3 bg-accent/20 rounded-full mr-4">
            <Sparkles className="h-6 w-6 text-accent" />
          </div>
          <div>
            <p className="font-body text-sm text-muted-foreground">Your Nakshatra (Birth Star)</p>
            <p className="font-headline text-2xl font-semibold">{result.birthNakshatra}</p>
          </div>
        </div>
        <p className="font-headline text-lg italic text-center pt-4 text-muted-foreground">
          "Offer your sankalpa and gently enter meditation during puja."
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={onReset} className="w-full" variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Start Over
        </Button>
      </CardFooter>
    </Card>
  )
}
