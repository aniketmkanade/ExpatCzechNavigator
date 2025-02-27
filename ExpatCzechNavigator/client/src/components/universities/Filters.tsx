import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { type Program } from "@shared/schema";

interface FiltersProps {
  filters: Partial<Program>;
  onFilterChange: (filters: Partial<Program>) => void;
  onReset: () => void;
}

export default function Filters({ filters, onFilterChange, onReset }: FiltersProps) {
  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Subject Area</Label>
          <Select
            value={filters.subject}
            onValueChange={(value) => onFilterChange({ ...filters, subject: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Computer Science">Computer Science</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Arts">Arts</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Level of Study</Label>
          <Select
            value={filters.level}
            onValueChange={(value) => onFilterChange({ ...filters, level: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bachelor">Bachelor</SelectItem>
              <SelectItem value="Master">Master</SelectItem>
              <SelectItem value="Doctoral">Doctoral</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Language</Label>
          <Select
            value={filters.language}
            onValueChange={(value) => onFilterChange({ ...filters, language: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Czech">Czech</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Form of Study</Label>
          <Select
            value={filters.formOfStudy}
            onValueChange={(value) => onFilterChange({ ...filters, formOfStudy: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select form" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Maximum Tuition (EUR/year)</Label>
          <Input
            type="number"
            value={filters.tuition || ""}
            onChange={(e) => onFilterChange({ ...filters, tuition: parseInt(e.target.value) })}
            placeholder="Enter max tuition"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onReset}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
