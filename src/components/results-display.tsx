import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { RashiData } from "@/app/actions"
import { Sparkles, MoonStar, ArrowLeft, CalendarDays, Star } from "lucide-react"

type ResultsDisplayProps = {
  result: RashiData;
  onReset: () => void;
};

const InfoRow = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="flex items-start p-4 bg-primary/5 rounded-lg border border-primary/10">
      <div className="p-3 bg-primary/10 rounded-full mr-4 text-primary">
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-body text-sm text-muted-foreground">{label}</p>
        <p className="font-headline text-2xl font-semibold text-foreground">{value}</p>
      </div>
    </div>
);

export function ResultsDisplay({ result, onReset }: ResultsDisplayProps) {
  return (
    <Card className="text-center bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg animate-in fade-in-50 duration-500 w-full">
      <CardHeader className="pb-4">
        <CardTitle className="font-headline text-3xl text-primary">
          Jai Gurudev
        </CardTitle>
        <CardDescription className="font-headline text-2xl font-semibold !mt-0">
          {result.inputName}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <InfoRow icon={<MoonStar className="h-6 w-6" />} label="Your Rashi (Moon Sign)" value={result.Rashi} />
        <InfoRow icon={<Sparkles className="h-6 w-6" />} label="Your Nakshatra (Birth Star)" value={result.birthNakshatra} />
        <InfoRow icon={<Star className="h-6 w-6" />} label="Your Tithi" value={result.lunarJanmaMonTithi} />
        <InfoRow icon={<CalendarDays className="h-6 w-6" />} label="Your Tithi Birthday (this year)" value={result.lunarJanmaTithiMap} />

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
