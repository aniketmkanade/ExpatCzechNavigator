import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, CloudSun, Train, CreditCard, Luggage } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TravelGuide() {
  const [selectedSeason, setSelectedSeason] = useState("spring");

  const seasonalInfo = {
    spring: { temp: "10-20°C", clothing: "Light jacket, umbrella" },
    summer: { temp: "20-30°C", clothing: "Light clothing, sun protection" },
    autumn: { temp: "5-15°C", clothing: "Warm jacket, layers" },
    winter: { temp: "-5-5°C", clothing: "Winter coat, boots, gloves" },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Travel Guide</h1>
      <p className="text-muted-foreground mb-8">
        Essential information to prepare for your journey to the Czech Republic
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Luggage className="w-5 h-5 text-blue-500" />
                Essential Documents Checklist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "Valid passport",
                  "Visa or residence permit",
                  "Acceptance letter from university",
                  "Health insurance documents",
                  "Accommodation confirmation",
                  "Proof of financial means",
                  "Travel insurance",
                  "Passport-sized photos"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CloudSun className="w-5 h-5 text-blue-500" />
                Weather & Clothing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedSeason} onValueChange={setSelectedSeason}>
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="spring">Spring</TabsTrigger>
                  <TabsTrigger value="summer">Summer</TabsTrigger>
                  <TabsTrigger value="autumn">Autumn</TabsTrigger>
                  <TabsTrigger value="winter">Winter</TabsTrigger>
                </TabsList>
                <TabsContent value={selectedSeason}>
                  <div className="space-y-2">
                    <p className="font-medium">Temperature Range:</p>
                    <p className="text-muted-foreground">
                      {seasonalInfo[selectedSeason as keyof typeof seasonalInfo].temp}
                    </p>
                    <p className="font-medium mt-4">Recommended Clothing:</p>
                    <p className="text-muted-foreground">
                      {seasonalInfo[selectedSeason as keyof typeof seasonalInfo].clothing}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Train className="w-5 h-5 text-blue-500" />
                Transportation Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">From Airport</h3>
                  <p className="text-muted-foreground">
                    Take Bus 119 to Nádraží Veleslavín (metro line A) or Airport Express bus to Prague Main Station
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Public Transport</h3>
                  <p className="text-muted-foreground">
                    Metro, trams, and buses operate from 5:00 to 24:00. Night trams and buses available.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Transport Passes</h3>
                  <p className="text-muted-foreground">
                    Student passes available with ISIC card. Monthly pass recommended for longer stays.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-500" />
                Currency & Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Local Currency</h3>
                  <p className="text-muted-foreground">
                    Czech Crown (CZK). Exchange money at official exchange offices or banks, avoid street exchanges.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Payment Methods</h3>
                  <p className="text-muted-foreground">
                    Cards widely accepted. Some places might only accept cash. Always carry some cash for small purchases.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Banking</h3>
                  <p className="text-muted-foreground">
                    Consider opening a local bank account for regular transactions and avoiding international fees.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
