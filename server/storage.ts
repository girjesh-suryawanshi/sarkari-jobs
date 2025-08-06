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
        title: "Senior Software Developer",
        department: "Department of Technology",
        location: "Washington, DC",
        qualification: "Bachelor's in Computer Science",
        deadline: "Dec 15, 2024",
        applyLink: "https://usajobs.gov/job/123456",
        postedOn: "2 days ago",
        sourceUrl: "https://usajobs.gov",
        description: "We are seeking a highly skilled Senior Software Developer to join our team at the Department of Technology. The successful candidate will be responsible for developing and maintaining critical government software systems.",
        status: "active"
      },
      {
        title: "Public Health Analyst",
        department: "Department of Health",
        location: "Atlanta, GA",
        qualification: "Master's in Public Health",
        deadline: "Dec 10, 2024",
        applyLink: "https://usajobs.gov/job/123457",
        postedOn: "1 day ago",
        sourceUrl: "https://usajobs.gov",
        description: "Join our public health team to analyze health data and support policy development for better community health outcomes.",
        status: "active"
      },
      {
        title: "Financial Analyst",
        department: "Department of Treasury",
        location: "New York, NY",
        qualification: "Bachelor's in Finance/Economics",
        deadline: "Dec 20, 2024",
        applyLink: "https://usajobs.gov/job/123458",
        postedOn: "3 days ago",
        sourceUrl: "https://usajobs.gov",
        description: "Analyze financial data and support budget planning and fiscal policy decisions for the Department of Treasury.",
        status: "active"
      },
      {
        title: "Cybersecurity Specialist",
        department: "Department of Homeland Security",
        location: "Washington, DC",
        qualification: "Bachelor's in Computer Science + Security Clearance",
        deadline: "Jan 5, 2025",
        applyLink: "https://usajobs.gov/job/123459",
        postedOn: "1 day ago",
        sourceUrl: "https://usajobs.gov",
        description: "Protect critical infrastructure and secure government systems from cyber threats.",
        status: "active"
      },
      {
        title: "Education Policy Specialist",
        department: "Department of Education",
        location: "Chicago, IL",
        qualification: "Master's in Education or Public Policy",
        deadline: "Dec 18, 2024",
        applyLink: "https://usajobs.gov/job/123460",
        postedOn: "4 days ago",
        sourceUrl: "https://usajobs.gov",
        description: "Develop and implement education policies to improve learning outcomes nationwide.",
        status: "active"
      },
      {
        title: "Environmental Engineer",
        department: "Environmental Protection Agency",
        location: "Denver, CO",
        qualification: "Bachelor's in Environmental Engineering",
        deadline: "Dec 8, 2024",
        applyLink: "https://usajobs.gov/job/123461",
        postedOn: "1 week ago",
        sourceUrl: "https://usajobs.gov",
        description: "Design and implement environmental protection measures and ensure compliance with regulations.",
        status: "closing_soon"
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
    return Array.from(this.jobs.values());
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
