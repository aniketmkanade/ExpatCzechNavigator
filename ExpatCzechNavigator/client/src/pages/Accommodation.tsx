import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Accommodation } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Wifi, Home as HomeIcon } from "lucide-react";

export default function Accommodation() {
  const [filters, setFilters] = useState<Partial<Accommodation>>({});
  
  const { data: accommodations, isLoading } = useQuery<Accommodation[]>({
    queryKey: ["/api/accommodations", filters],
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Accommodation</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div>
          <Select
            value={filters.type}
            onValueChange={(value) => setFilters({ ...filters, type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Accommodation type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Dormitory">Dormitory</SelectItem>
              <SelectItem value="Apartment">Apartment</SelectItem>
              <SelectItem value="Shared">Shared Room</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select
            value={filters.city}
            onValueChange={(value) => setFilters({ ...filters, city: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Prague">Prague</SelectItem>
              <SelectItem value="Brno">Brno</SelectItem>
              <SelectItem value="Ostrava">Ostrava</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Input
          type="number"
          placeholder="Max price (EUR)"
          value={filters.price || ""}
          onChange={(e) => setFilters({ ...filters, price: parseInt(e.target.value) })}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accommodations?.map((accommodation) => (
            <Card key={accommodation.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HomeIcon className="w-5 h-5" />
                  {accommodation.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-2xl font-bold">{accommodation.price} EUR/month</p>
                  <p className="text-muted-foreground">{accommodation.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {accommodation.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                      >
                        <Wifi className="w-3 h-3" />
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
