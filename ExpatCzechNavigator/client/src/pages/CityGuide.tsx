import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type CityGuide } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Train, Clock, Euro, Users } from "lucide-react";

type TransportationData = {
  metro?: string[];
  tram?: string;
  bus?: string;
  passes?: {
    monthly: string;
    student_discount: string;
  };
};

type CustomsData = {
  greetings: string;
  tipping: string;
  business_hours: string;
};

type CostOfLivingData = {
  rent: string;
  food: string;
  transport: string;
  entertainment: string;
};

export default function CityGuide() {
  const [selectedCity, setSelectedCity] = useState("Prague");

  const { data: guides } = useQuery<CityGuide[]>({
    queryKey: ["/api/city-guides"],
  });

  const selectedGuide = guides?.find(guide => guide.city === selectedCity);

  if (!selectedGuide) {
    return null;
  }

  const transportation = selectedGuide.transportation as TransportationData;
  const customs = selectedGuide.customs as CustomsData;
  const costOfLiving = selectedGuide.costOfLiving as CostOfLivingData;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">City Guide</h1>

      <div className="max-w-xs mb-8">
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger>
            <SelectValue placeholder="Select a city" />
          </SelectTrigger>
          <SelectContent>
            {guides?.map(guide => (
              <SelectItem key={guide.id} value={guide.city}>
                {guide.city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-500" />
              Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{selectedGuide.overview}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Train className="w-5 h-5 text-blue-500" />
              Transportation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(transportation).map(([key, value]) => (
                <div key={key}>
                  <h3 className="font-medium capitalize mb-2">{key.replace('_', ' ')}</h3>
                  {typeof value === 'string' ? (
                    <p className="text-muted-foreground">{value}</p>
                  ) : Array.isArray(value) ? (
                    <ul className="list-disc list-inside text-muted-foreground">
                      {value.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  ) : value && typeof value === 'object' ? (
                    <div className="space-y-2">
                      {Object.entries(value).map(([k, v]) => (
                        <p key={k} className="text-muted-foreground">
                          <span className="font-medium capitalize">{k.replace('_', ' ')}:</span> {v}
                        </p>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              Local Customs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(customs).map(([key, value]) => (
                <div key={key}>
                  <h3 className="font-medium capitalize mb-2">{key.replace('_', ' ')}</h3>
                  <p className="text-muted-foreground">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Euro className="w-5 h-5 text-blue-500" />
              Cost of Living
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              {Object.entries(costOfLiving).map(([key, value]) => (
                <div key={key} className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium capitalize mb-2">{key.replace('_', ' ')}</h3>
                  <p className="text-2xl font-bold">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}