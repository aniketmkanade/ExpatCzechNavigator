import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Program, type University } from "@shared/schema";
import Filters from "@/components/universities/Filters";
import ProgramCard from "@/components/universities/ProgramCard";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function UniversitySearch() {
  const [filters, setFilters] = useState<Partial<Program>>({});
  const [search, setSearch] = useState("");

  const { data: programs, isLoading: programsLoading } = useQuery<Program[]>({
    queryKey: ["/api/programs", JSON.stringify(filters)],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          params.append(key, value.toString());
        }
      });
      const response = await fetch(`/api/programs?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch programs");
      return response.json();
    }
  });

  const { data: universities } = useQuery<University[]>({
    queryKey: ["/api/universities"],
  });

  const filteredPrograms = programs?.filter((program) => {
    if (!search) return true;
    return program.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">University Programs Search</h1>

      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search programs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Filters
        filters={filters}
        onFilterChange={setFilters}
        onReset={() => setFilters({})}
      />

      {programsLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredPrograms?.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              university={universities?.find(u => u.id === program.universityId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}