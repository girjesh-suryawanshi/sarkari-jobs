import { type User, type InsertUser, type Job, type InsertJob } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Job methods
  getAllJobs(): Promise<Job[]>;
  getJobById(id: string): Promise<Job | undefined>;
  createJob(job: InsertJob): Promise<Job>;
  updateJob(id: string, updates: Partial<InsertJob>): Promise<Job | undefined>;
  deleteJob(id: string): Promise<boolean>;
  searchJobs(query: string, filters?: { location?: string; department?: string; deadline?: string }): Promise<Job[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private jobs: Map<string, Job>;

  constructor() {
    this.users = new Map();
    this.jobs = new Map();
    this.initializeMockJobs();
  }

  private initializeMockJobs() {
    const mockJobs: InsertJob[] = [
      {
        title: "Software Developer - Grade A",
        department: "Ministry of Electronics and IT",
        location: "New Delhi, India",
        qualification: "B.Tech/BE in Computer Science + 2 years experience",
        deadline: "Dec 15, 2025",
        applyLink: "https://ssc.nic.in/job/dev001",
        postedOn: "2 days ago",
        sourceUrl: "https://ssc.nic.in",
        description: "Develop and maintain government software applications for digital India initiatives. Work on e-governance projects and citizen services platforms.",
        status: "active"
      },
      {
        title: "Medical Officer - MBBS",
        department: "Ministry of Health and Family Welfare",
        location: "Mumbai, Maharashtra",
        qualification: "MBBS degree with valid registration",
        deadline: "Nov 10, 2025",
        applyLink: "https://aiims.edu/job/med001",
        postedOn: "1 day ago",
        sourceUrl: "https://aiims.edu",
        description: "Provide medical services in government hospitals. Work with healthcare teams to deliver quality medical care to citizens.",
        status: "active"
      },
      {
        title: "Income Tax Officer",
        department: "Central Board of Direct Taxes",
        location: "Bangalore, Karnataka",
        qualification: "Bachelor's degree with 60% marks",
        deadline: "Oct 25, 2025",
        applyLink: "https://incometax.gov.in/job/tax001",
        postedOn: "3 days ago",
        sourceUrl: "https://incometax.gov.in",
        description: "Handle income tax assessments and investigations. Ensure compliance with tax laws and regulations.",
        status: "active"
      },
      {
        title: "Cyber Security Analyst",
        department: "Ministry of Home Affairs",
        location: "Hyderabad, Telangana",
        qualification: "B.Tech in IT/CSE + Cyber Security certification",
        deadline: "Sep 15, 2025",
        applyLink: "https://mha.gov.in/job/cyber001",
        postedOn: "1 day ago",
        sourceUrl: "https://mha.gov.in",
        description: "Monitor and protect government digital infrastructure from cyber threats. Implement security protocols and incident response.",
        status: "active"
      },
      {
        title: "Education Officer",
        department: "Ministry of Education",
        location: "Chennai, Tamil Nadu",
        qualification: "Master's in Education + B.Ed degree",
        deadline: "Sep 30, 2025",
        applyLink: "https://education.gov.in/job/edu001",
        postedOn: "4 days ago",
        sourceUrl: "https://education.gov.in",
        description: "Develop and implement education policies. Oversee government school programs and teacher training initiatives.",
        status: "active"
      },
      {
        title: "Railway Traffic Inspector",
        department: "Indian Railways",
        location: "Kolkata, West Bengal",
        qualification: "12th pass + Railway training certification",
        deadline: "Oct 20, 2025",
        applyLink: "https://indianrailways.gov.in/job/rail001",
        postedOn: "5 days ago",
        sourceUrl: "https://indianrailways.gov.in",
        description: "Ensure safe railway operations and traffic management. Monitor train schedules and coordinate with station masters.",
        status: "active"
      },
      {
        title: "Forest Officer - IFS",
        department: "Ministry of Environment and Forests",
        location: "Dehradun, Uttarakhand",
        qualification: "Bachelor's degree + UPSC Civil Services qualification",
        deadline: "Nov 15, 2025",
        applyLink: "https://moef.gov.in/job/forest001",
        postedOn: "1 week ago",
        sourceUrl: "https://moef.gov.in",
        description: "Protect and conserve forest resources. Implement environmental policies and wildlife conservation programs.",
        status: "active"
      },
      {
        title: "Bank Probationary Officer",
        department: "State Bank of India",
        location: "Pune, Maharashtra",
        qualification: "Graduate degree in any discipline",
        deadline: "Oct 18, 2025",
        applyLink: "https://sbi.co.in/job/po001",
        postedOn: "6 days ago",
        sourceUrl: "https://sbi.co.in",
        description: "Handle banking operations and customer service. Manage loan processing and financial transactions in government bank.",
        status: "active"
      }
    ];

    mockJobs.forEach(job => {
      this.createJob(job);
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Job methods
  async getAllJobs(): Promise<Job[]> {
    const jobs = Array.from(this.jobs.values());
    return this.filterActiveJobs(jobs);
  }

  private filterActiveJobs(jobs: Job[]): Job[] {
    const currentDate = new Date();
    return jobs.filter(job => {
      try {
        const deadlineDate = new Date(job.deadline);
        if (isNaN(deadlineDate.getTime())) {
          return true; // Include the job if we can't parse the date
        }
        return deadlineDate >= currentDate;
      } catch (error) {
        return true; // Include the job if there's an error
      }
    });
  }

  async getJobById(id: string): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const id = randomUUID();
    const job: Job = { 
      ...insertJob,
      description: insertJob.description || null,
      status: insertJob.status || null,
      id, 
      createdAt: new Date() 
    };
    this.jobs.set(id, job);
    return job;
  }

  async updateJob(id: string, updates: Partial<InsertJob>): Promise<Job | undefined> {
    const existingJob = this.jobs.get(id);
    if (!existingJob) return undefined;
    
    const updatedJob = { ...existingJob, ...updates };
    this.jobs.set(id, updatedJob);
    return updatedJob;
  }

  async deleteJob(id: string): Promise<boolean> {
    return this.jobs.delete(id);
  }

  async searchJobs(query: string, filters?: { location?: string; department?: string; deadline?: string }): Promise<Job[]> {
    let jobs = Array.from(this.jobs.values());
    
    // First filter out expired jobs
    jobs = this.filterActiveJobs(jobs);

    // Filter by search query
    if (query) {
      const searchTerm = query.toLowerCase();
      jobs = jobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm) ||
        job.department.toLowerCase().includes(searchTerm) ||
        job.location.toLowerCase().includes(searchTerm) ||
        job.qualification.toLowerCase().includes(searchTerm)
      );
    }

    // Apply filters
    if (filters) {
      if (filters.location && filters.location !== 'all') {
        jobs = jobs.filter(job => job.location.includes(filters.location!));
      }
      if (filters.department && filters.department !== 'all') {
        jobs = jobs.filter(job => job.department === filters.department);
      }
      if (filters.deadline && filters.deadline !== 'all') {
        // Simple deadline filtering logic
        const now = new Date();
        jobs = jobs.filter(job => {
          const deadline = new Date(job.deadline);
          if (filters.deadline === 'This Week') {
            const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
            return deadline <= weekFromNow;
          }
          if (filters.deadline === 'This Month') {
            const monthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
            return deadline <= monthFromNow;
          }
          return true;
        });
      }
    }

    return jobs;
  }
}

export const storage = new MemStorage();
