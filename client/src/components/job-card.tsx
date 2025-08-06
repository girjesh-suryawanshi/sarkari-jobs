import { MapPin, GraduationCap, Calendar, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Job } from "@shared/schema";
import { Link } from "wouter";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const getStatusBadge = (status: string, deadline: string) => {
    if (status === "closing_soon") {
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100" data-testid={`status-${job.id}`}>Closing Soon</Badge>;
    }
    
    // Check if deadline is soon (within 5 days)
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 5) {
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100" data-testid={`status-${job.id}`}>Closing Soon</Badge>;
    }
    
    return <Badge className="bg-green-100 text-green-800 hover:bg-green-100" data-testid={`status-${job.id}`}>Active</Badge>;
  };

  const getDeadlineColor = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 3) return "text-red-600";
    if (diffDays <= 7) return "text-orange-600";
    return "text-neutral-500";
  };

  return (
    <Link href={`/job/${job.id}`}>
      <Card className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-shadow cursor-pointer border border-neutral-200" data-testid={`card-job-${job.id}`}>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-neutral-700 mb-2" data-testid={`title-${job.id}`}>
                {job.title}
              </h3>
              <p className="text-primary font-medium" data-testid={`department-${job.id}`}>
                {job.department}
              </p>
            </div>
            {getStatusBadge(job.status || "active", job.deadline)}
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-neutral-500">
              <MapPin className="w-4 h-4 mr-2" />
              <span data-testid={`location-${job.id}`}>{job.location}</span>
            </div>
            <div className="flex items-center text-sm text-neutral-500">
              <GraduationCap className="w-4 h-4 mr-2" />
              <span data-testid={`qualification-${job.id}`}>{job.qualification}</span>
            </div>
            <div className="flex items-center text-sm text-neutral-500">
              <Calendar className="w-4 h-4 mr-2" />
              <span>
                Deadline: <span className={`font-medium ${getDeadlineColor(job.deadline)}`} data-testid={`deadline-${job.id}`}>{job.deadline}</span>
              </span>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-neutral-100">
            <span className="text-xs text-neutral-400" data-testid={`posted-${job.id}`}>Posted {job.postedOn}</span>
            <Button 
              className="bg-primary text-white hover:bg-primary/90 text-sm font-medium"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(job.applyLink, '_blank');
              }}
              data-testid={`button-apply-${job.id}`}
            >
              Apply Now
              <ExternalLink className="ml-2 h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
