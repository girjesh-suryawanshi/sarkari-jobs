import { useQuery } from "@tanstack/react-query";
import { MapPin, GraduationCap, Calendar, Clock, ExternalLink, Bookmark, Share, ArrowLeft } from "lucide-react";
import { Link, useParams } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { type Job } from "@shared/schema";

export default function JobDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  
  const { data: job, isLoading, error } = useQuery<Job>({
    queryKey: ["/api/jobs", id],
    enabled: !!id,
  });

  const handleSaveJob = () => {
    // In a real app, this would save to user's profile
    toast({
      title: "Job Saved",
      description: "This job has been saved to your profile.",
    });
  };

  const handleShareJob = async () => {
    try {
      await navigator.share({
        title: job?.title || "Government Job",
        text: `Check out this government job: ${job?.title} at ${job?.department}`,
        url: window.location.href,
      });
    } catch (err) {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Job link has been copied to your clipboard.",
      });
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-100">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-neutral-700 mb-4">Job Not Found</h1>
            <p className="text-neutral-500 mb-6">The job you're looking for doesn't exist or has been removed.</p>
            <Link href="/">
              <Button data-testid="button-back-home">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Jobs
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4" data-testid="button-back">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Jobs
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6 border-b pb-6">
                <div className="flex-1">
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <Skeleton className="h-6 w-1/2" />
                </div>
                <Skeleton className="h-6 w-6" />
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <Skeleton className="h-6 w-32 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <Skeleton className="h-6 w-40 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <Skeleton className="h-6 w-24 mb-4" />
                    <div className="space-y-3">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex items-start space-x-3">
                          <Skeleton className="h-4 w-4 mt-1" />
                          <div>
                            <Skeleton className="h-3 w-16 mb-1" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : job ? (
          <Card className="bg-white">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6 border-b border-neutral-200 pb-6">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-neutral-700 mb-2" data-testid="text-job-title">
                    {job.title}
                  </h1>
                  <p className="text-lg text-primary font-medium" data-testid="text-job-department">
                    {job.department}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-700 mb-3">Job Description</h3>
                    <div className="prose text-neutral-600" data-testid="text-job-description">
                      {job.description ? (
                        <div dangerouslySetInnerHTML={{ __html: job.description.replace(/\n/g, '<br>') }} />
                      ) : (
                        <p>
                          Join {job.department} as a {job.title}. This is an excellent opportunity to serve the public in a meaningful role.
                        </p>
                      )}
                      
                      <h4 className="font-semibold mt-6 mb-3 text-neutral-700">Key Responsibilities:</h4>
                      <ul className="list-disc list-inside space-y-1 text-neutral-600">
                        <li>Contribute to important government initiatives and public service</li>
                        <li>Collaborate with experienced professionals in your field</li>
                        <li>Maintain high standards of integrity and public accountability</li>
                        <li>Support the mission and goals of {job.department}</li>
                      </ul>

                      <h4 className="font-semibold mt-6 mb-3 text-neutral-700">Requirements:</h4>
                      <ul className="list-disc list-inside space-y-1 text-neutral-600">
                        <li>{job.qualification}</li>
                        <li>Strong communication and analytical skills</li>
                        <li>Commitment to public service excellence</li>
                        <li>Ability to work in a team environment</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <Card className="bg-neutral-50">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-neutral-700 mb-4">Job Details</h3>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <MapPin className="text-neutral-400 mt-1 h-4 w-4" />
                          <div>
                            <p className="text-sm text-neutral-500">Location</p>
                            <p className="font-medium" data-testid="text-job-location">{job.location}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <GraduationCap className="text-neutral-400 mt-1 h-4 w-4" />
                          <div>
                            <p className="text-sm text-neutral-500">Qualification</p>
                            <p className="font-medium" data-testid="text-job-qualification">{job.qualification}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Calendar className="text-neutral-400 mt-1 h-4 w-4" />
                          <div>
                            <p className="text-sm text-neutral-500">Application Deadline</p>
                            <p className="font-medium" data-testid="text-job-deadline">{job.deadline}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Clock className="text-neutral-400 mt-1 h-4 w-4" />
                          <div>
                            <p className="text-sm text-neutral-500">Posted</p>
                            <p className="font-medium" data-testid="text-job-posted">{job.postedOn}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-primary text-white hover:bg-primary/90 font-medium"
                      onClick={() => window.open(job.applyLink, '_blank')}
                      data-testid="button-apply-official"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Apply on Official Site
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full font-medium"
                      onClick={handleSaveJob}
                      data-testid="button-save-job"
                    >
                      <Bookmark className="mr-2 h-4 w-4" />
                      Save Job
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full font-medium"
                      onClick={handleShareJob}
                      data-testid="button-share-job"
                    >
                      <Share className="mr-2 h-4 w-4" />
                      Share Job
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </main>
      
      <Footer />
    </div>
  );
}
