import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertJobSchema } from "@shared/schema";
import { scrapeJobs } from "./scraper";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all jobs
  app.get("/api/jobs", async (req, res) => {
    try {
      const { search, location, department, deadline } = req.query;
      
      let jobs;
      if (search || location || department || deadline) {
        jobs = await storage.searchJobs(
          search as string || "",
          {
            location: location as string,
            department: department as string,
            deadline: deadline as string
          }
        );
      } else {
        jobs = await storage.getAllJobs();
      }
      
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch jobs" });
    }
  });

  // Get single job by ID
  app.get("/api/jobs/:id", async (req, res) => {
    try {
      const job = await storage.getJobById(req.params.id);
      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }
      res.json(job);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch job" });
    }
  });

  // Create new job (admin only for MVP)
  app.post("/api/jobs", async (req, res) => {
    try {
      const validatedJob = insertJobSchema.parse(req.body);
      const job = await storage.createJob(validatedJob);
      res.status(201).json(job);
    } catch (error) {
      res.status(400).json({ error: "Invalid job data" });
    }
  });

  // Trigger job scraping
  app.post("/api/jobs/scrape", async (req, res) => {
    try {
      const scrapedJobs = await scrapeJobs();
      const createdJobs = [];
      
      for (const jobData of scrapedJobs) {
        const job = await storage.createJob(jobData);
        createdJobs.push(job);
      }
      
      res.json({ 
        message: `Successfully scraped and added ${createdJobs.length} jobs`,
        jobs: createdJobs 
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to scrape jobs" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
