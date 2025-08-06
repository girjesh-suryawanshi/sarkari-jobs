import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchFiltersProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  isLoading?: boolean;
}

export interface SearchFilters {
  location: string;
  department: string;
  deadline: string;
}

export default function SearchFilters({ onSearch, isLoading }: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    location: "all",
    department: "all",
    deadline: "all"
  });

  const handleSearch = () => {
    onSearch(searchQuery, filters);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setFilters({
      location: "all",
      department: "all",
      deadline: "all"
    });
    onSearch("", {
      location: "all",
      department: "all",
      deadline: "all"
    });
  };

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
    onSearch(value, filters);
  };

  return (
    <section className="bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-700 mb-4">
            Find Your Next Government Job
          </h1>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            Discover the latest government job openings with real-time updates from official sources
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-neutral-400" size={18} />
            </div>
            <Input 
              type="text" 
              placeholder="Search jobs by title, department, or location..."
              className="w-full pl-12 pr-4 py-4 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-lg"
              value={searchQuery}
              onChange={(e) => handleInputChange(e.target.value)}
              data-testid="input-search"
            />
            <Button 
              onClick={handleSearch}
              disabled={isLoading}
              className="absolute inset-y-0 right-0 px-6 bg-primary text-white rounded-r-xl hover:bg-primary/90 transition-colors"
              data-testid="button-search"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Select value={filters.location} onValueChange={(value) => {
            const newFilters = { ...filters, location: value };
            setFilters(newFilters);
            onSearch(searchQuery, newFilters);
          }}>
            <SelectTrigger className="w-48" data-testid="select-location">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Washington DC">Washington DC</SelectItem>
              <SelectItem value="New York">New York</SelectItem>
              <SelectItem value="California">California</SelectItem>
              <SelectItem value="Atlanta">Atlanta</SelectItem>
              <SelectItem value="Chicago">Chicago</SelectItem>
              <SelectItem value="Denver">Denver</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filters.department} onValueChange={(value) => {
            const newFilters = { ...filters, department: value };
            setFilters(newFilters);
            onSearch(searchQuery, newFilters);
          }}>
            <SelectTrigger className="w-56" data-testid="select-department">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Department of Health">Department of Health</SelectItem>
              <SelectItem value="Department of Education">Department of Education</SelectItem>
              <SelectItem value="Department of Defense">Department of Defense</SelectItem>
              <SelectItem value="Department of Technology">Department of Technology</SelectItem>
              <SelectItem value="Department of Treasury">Department of Treasury</SelectItem>
              <SelectItem value="Department of Homeland Security">Department of Homeland Security</SelectItem>
              <SelectItem value="Environmental Protection Agency">Environmental Protection Agency</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filters.deadline} onValueChange={(value) => {
            const newFilters = { ...filters, deadline: value };
            setFilters(newFilters);
            onSearch(searchQuery, newFilters);
          }}>
            <SelectTrigger className="w-48" data-testid="select-deadline">
              <SelectValue placeholder="All Deadlines" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Deadlines</SelectItem>
              <SelectItem value="This Week">This Week</SelectItem>
              <SelectItem value="This Month">This Month</SelectItem>
              <SelectItem value="Next Month">Next Month</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            onClick={handleClearFilters}
            className="px-4 py-2 text-primary border-primary hover:bg-primary/5"
            data-testid="button-clear-filters"
          >
            <X className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        </div>
      </div>
    </section>
  );
}
