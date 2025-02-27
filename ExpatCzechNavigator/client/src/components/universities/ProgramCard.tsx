import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Clock, Euro } from "lucide-react";
import { type Program, type University } from "@shared/schema";

interface ProgramCardProps {
  program: Program;
  university?: University;
}

export default function ProgramCard({ program, university }: ProgramCardProps) {
  if (!university) {
    return null;
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">
          {program.name}
          <span className="text-sm text-muted-foreground block mt-1">
            {university.name}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4" />
          <span>{program.duration} years • {program.formOfStudy}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Euro className="w-4 h-4" />
          <span>{program.tuition} EUR/year</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
            {program.level}
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
            {program.language}
          </span>
          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
            {university.city}
          </span>
        </div>

        <div className="pt-4">
          <Button variant="outline" className="w-full" asChild>
            <a href={university.website} target="_blank" rel="noopener noreferrer">
              Visit Website
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}