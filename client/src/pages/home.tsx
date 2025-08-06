import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SearchFiltersComponent, { type SearchFilters } from "@/components/search-filters";
import JobCard from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { type Job } from "@shared/schema";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    location: "all",
    department: "all",
    deadline: "all"
  });
  const [sortBy, setSortBy] = useState("latest");

  // Build query parameters
  const queryParams = new URLSearchParams();
  if (searchQuery) queryParams.set('search', searchQuery);
  if (filters.location !== 'all') queryParams.set('location', filters.location);
  if (filters.department !== 'all') queryParams.set('department', filters.department);
  if (filters.deadline !== 'all') queryParams.set('deadline', filters.deadline);
  
  const queryString = queryParams.toString();
  const apiUrl = `/api/jobs${queryString ? '?' + queryString : ''}`;

  const { data: jobs, isLoading, error } = useQuery<Job[]>({
    queryKey: [apiUrl],
    enabled: true,
  });



  const handleSearch = (query: string, newFilters: SearchFilters) => {
    setSearchQuery(query);
    setFilters(newFilters);
  };

  const sortedJobs = jobs ? [...jobs].sort((a, b) => {
    switch (sortBy) {
      case "deadline":
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      case "department":
        return a.department.localeCompare(b.department);
      case "latest":
      default:
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    }
  }) : [];

  return (
    <div className="min-h-screen bg-neutral-100">
      <Header />
      <SearchFiltersComponent onSearch={handleSearch} isLoading={isLoading} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-neutral-700">Latest Sarkari Job Openings</h2>
            <p className="text-neutral-500 mt-1" data-testid="text-results-count">
              {isLoading ? "Loading..." : `Showing ${sortedJobs.length} jobs`}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-neutral-500">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48" data-testid="select-sort">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest Posted</SelectItem>
                <SelectItem value="deadline">Deadline Soon</SelectItem>
                <SelectItem value="department">Department A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Job Cards Grid */}
        {isLoading ? (
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-neutral-200">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
                <div className="space-y-2 mb-4">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-neutral-100">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-neutral-500 mb-4">Failed to load jobs. Please try again.</p>
            <Button onClick={() => window.location.reload()} data-testid="button-retry">
              Retry
            </Button>
          </div>
        ) : sortedJobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-500 mb-4">No jobs found matching your criteria.</p>
            <Button onClick={() => handleSearch("", { location: "all", department: "all", deadline: "all" })} data-testid="button-clear-search">
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {sortedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {sortedJobs.length > 0 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <Button variant="ghost" className="p-3" data-testid="button-prev-page">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button className="px-4 py-2 bg-primary text-white" data-testid="button-page-1">
              1
            </Button>
            <Button variant="ghost" className="px-4 py-2" data-testid="button-page-2">
              2
            </Button>
            <Button variant="ghost" className="px-4 py-2" data-testid="button-page-3">
              3
            </Button>
            <Button variant="ghost" className="p-3" data-testid="button-next-page">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
