import { useQuery } from "@tanstack/react-query";
import { type VisaStep } from "@shared/schema";
import Steps from "@/components/visa/Steps";
import { Loader2 } from "lucide-react";

export default function VisaGuide() {
  const { data: steps, isLoading } = useQuery<VisaStep[]>({
    queryKey: ["/api/visa-steps"],
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Student Visa Guide</h1>
        <p className="text-muted-foreground mb-8">
          Follow these steps carefully to prepare your student visa application for the Czech Republic
        </p>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <Steps steps={steps || []} />
        )}
      </div>
    </div>
  );
}
