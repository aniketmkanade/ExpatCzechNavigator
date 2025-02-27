import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { type VisaStep } from "@shared/schema";

interface StepsProps {
  steps: VisaStep[];
}

export default function Steps({ steps }: StepsProps) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <Card key={step.id}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
                {index + 1}
              </span>
              {step.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{step.description}</p>
            
            <div className="space-y-2">
              <h4 className="font-medium">Required Documents:</h4>
              <ul className="space-y-2">
                {step.documents.map((doc: string, i: number) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
