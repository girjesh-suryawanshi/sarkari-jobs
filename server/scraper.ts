import { type InsertJob } from "@shared/schema";

// Mock HTML content simulating government job sites
const mockJobSites = [
  {
    url: "https://usajobs.gov",
    content: `
    <div class="job-listing">
      <h2>Data Scientist</h2>
      <div class="department">Department of Commerce</div>
      <div class="location">Seattle, WA</div>
      <div class="qualification">PhD in Statistics or Data Science</div>
      <div class="deadline">Jan 15, 2025</div>
      <a class="apply-link" href="https://usajobs.gov/job/DS001">Apply Now</a>
    </div>
    <div class="job-listing">
      <h2>Legal Advisor</h2>
      <div class="department">Department of Justice</div>
      <div class="location">Boston, MA</div>
      <div class="qualification">JD and Bar Admission</div>
      <div class="deadline">Dec 25, 2024</div>
      <a class="apply-link" href="https://usajobs.gov/job/LA002">Apply Now</a>
    </div>
    `
  },
  {
    url: "https://opm.gov",
    content: `
    <div class="position">
      <h3>Human Resources Manager</h3>
      <span class="org">Office of Personnel Management</span>
      <span class="loc">Phoenix, AZ</span>
      <span class="quals">Master's in HR Management</span>
      <span class="due">Jan 10, 2025</span>
      <a class="link" href="https://opm.gov/job/HR001">View Details</a>
    </div>
    `
  }
];

export async function scrapeJobs(): Promise<InsertJob[]> {
  const scrapedJobs: InsertJob[] = [];
  
  try {
    // Simulate scraping from multiple government job sites
    for (const site of mockJobSites) {
      // In a real implementation, you would use Cheerio or similar to parse HTML
      // For this MVP, we'll parse the mock HTML manually
      
      const jobs = parseJobsFromHTML(site.content, site.url);
      scrapedJobs.push(...jobs);
    }
    
    console.log(`Scraped ${scrapedJobs.length} jobs from ${mockJobSites.length} sources`);
    return scrapedJobs;
    
  } catch (error) {
    console.error("Error scraping jobs:", error);
    throw new Error("Failed to scrape jobs");
  }
}

function parseJobsFromHTML(html: string, sourceUrl: string): InsertJob[] {
  const jobs: InsertJob[] = [];
  
  // Simple regex-based parsing for the mock HTML
  // In a real implementation, use a proper HTML parser like Cheerio
  
  if (sourceUrl.includes('usajobs')) {
    const jobMatches = html.match(/<div class="job-listing">([\s\S]*?)<\/div>/g);
    
    if (jobMatches) {
      for (const match of jobMatches) {
        const title = extractText(match, /<h2>(.*?)<\/h2>/);
        const department = extractText(match, /<div class="department">(.*?)<\/div>/);
        const location = extractText(match, /<div class="location">(.*?)<\/div>/);
        const qualification = extractText(match, /<div class="qualification">(.*?)<\/div>/);
        const deadline = extractText(match, /<div class="deadline">(.*?)<\/div>/);
        const applyLink = extractText(match, /<a class="apply-link" href="(.*?)">/);
        
        if (title && department && location && qualification && deadline && applyLink) {
          jobs.push({
            title,
            department,
            location,
            qualification,
            deadline,
            applyLink,
            postedOn: "Today",
            sourceUrl,
            description: `Join ${department} as a ${title}. This is an excellent opportunity to serve the public in a meaningful role.`,
            status: "active"
          });
        }
      }
    }
  }
  
  if (sourceUrl.includes('opm')) {
    const positionMatches = html.match(/<div class="position">([\s\S]*?)<\/div>/g);
    
    if (positionMatches) {
      for (const match of positionMatches) {
        const title = extractText(match, /<h3>(.*?)<\/h3>/);
        const department = extractText(match, /<span class="org">(.*?)<\/span>/);
        const location = extractText(match, /<span class="loc">(.*?)<\/span>/);
        const qualification = extractText(match, /<span class="quals">(.*?)<\/span>/);
        const deadline = extractText(match, /<span class="due">(.*?)<\/span>/);
        const applyLink = extractText(match, /<a class="link" href="(.*?)">/);
        
        if (title && department && location && qualification && deadline && applyLink) {
          jobs.push({
            title,
            department,
            location,
            qualification,
            deadline,
            applyLink,
            postedOn: "Today",
            sourceUrl,
            description: `Opportunity to work with ${department} in ${location}. We are looking for qualified candidates to fill this ${title} position.`,
            status: "active"
          });
        }
      }
    }
  }
  
  return jobs;
}

function extractText(html: string, regex: RegExp): string {
  const match = html.match(regex);
  return match ? match[1].trim() : "";
}

// Schedule scraping to run daily (in production, use a proper scheduler like node-cron)
export function scheduleJobScraping() {
  // Run scraping every 24 hours
  setInterval(async () => {
    try {
      console.log("Running scheduled job scraping...");
      await scrapeJobs();
    } catch (error) {
      console.error("Scheduled scraping failed:", error);
    }
  }, 24 * 60 * 60 * 1000); // 24 hours
}
