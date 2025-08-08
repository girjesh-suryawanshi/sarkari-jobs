const { randomUUID } = require('crypto');

// Mock storage for Vercel serverless functions
class VercelStorage {
  constructor() {
    this.jobs = this.initializeMockJobs();
  }

  initializeMockJobs() {
    const mockJobs = [
      {
        id: randomUUID(),
        title: "Software Developer - Grade A",
        department: "Ministry of Electronics and IT",
        location: "New Delhi, India",
        qualification: "B.Tech/BE in Computer Science + 2 years experience",
        deadline: "Dec 15, 2025",
        applyLink: "https://ssc.nic.in/job/dev001",
        postedOn: "2 days ago",
        sourceUrl: "https://ssc.nic.in",
        description: "Develop and maintain government software applications for digital India initiatives. Work on e-governance projects and citizen services platforms.",
        status: "active",
        createdAt: new Date().toISOString()
      },
      {
        id: randomUUID(),
        title: "Medical Officer - MBBS",
        department: "Ministry of Health and Family Welfare",
        location: "Mumbai, Maharashtra",
        qualification: "MBBS degree with valid registration",
        deadline: "Nov 10, 2025",
        applyLink: "https://aiims.edu/job/med001",
        postedOn: "1 day ago",
        sourceUrl: "https://aiims.edu",
        description: "Provide medical services in government hospitals. Work with healthcare teams to deliver quality medical care to citizens.",
        status: "active",
        createdAt: new Date().toISOString()
      },
      {
        id: randomUUID(),
        title: "Income Tax Officer",
        department: "Central Board of Direct Taxes",
        location: "Bangalore, Karnataka",
        qualification: "Bachelor's degree with 60% marks",
        deadline: "Oct 25, 2025",
        applyLink: "https://incometax.gov.in/job/tax001",
        postedOn: "3 days ago",
        sourceUrl: "https://incometax.gov.in",
        description: "Handle income tax assessments and investigations. Ensure compliance with tax laws and regulations.",
        status: "active",
        createdAt: new Date().toISOString()
      },
      {
        id: randomUUID(),
        title: "Cyber Security Analyst",
        department: "Ministry of Home Affairs",
        location: "Hyderabad, Telangana",
        qualification: "B.Tech in IT/CSE + Cyber Security certification",
        deadline: "Sep 15, 2025",
        applyLink: "https://mha.gov.in/job/cyber001",
        postedOn: "1 day ago",
        sourceUrl: "https://mha.gov.in",
        description: "Monitor and protect government digital infrastructure from cyber threats. Implement security protocols and incident response.",
        status: "active",
        createdAt: new Date().toISOString()
      },
      {
        id: randomUUID(),
        title: "Education Officer",
        department: "Ministry of Education",
        location: "Chennai, Tamil Nadu",
        qualification: "Master's in Education + B.Ed degree",
        deadline: "Sep 30, 2025",
        applyLink: "https://education.gov.in/job/edu001",
        postedOn: "4 days ago",
        sourceUrl: "https://education.gov.in",
        description: "Develop and implement education policies. Oversee government school programs and teacher training initiatives.",
        status: "active",
        createdAt: new Date().toISOString()
      },
      {
        id: randomUUID(),
        title: "Railway Traffic Inspector",
        department: "Indian Railways",
        location: "Kolkata, West Bengal",
        qualification: "12th pass + Railway training certification",
        deadline: "Oct 20, 2025",
        applyLink: "https://indianrailways.gov.in/job/rail001",
        postedOn: "5 days ago",
        sourceUrl: "https://indianrailways.gov.in",
        description: "Ensure safe railway operations and traffic management. Monitor train schedules and coordinate with station masters.",
        status: "active",
        createdAt: new Date().toISOString()
      },
      {
        id: randomUUID(),
        title: "Forest Officer - IFS",
        department: "Ministry of Environment and Forests",
        location: "Dehradun, Uttarakhand",
        qualification: "Bachelor's degree + UPSC Civil Services qualification",
        deadline: "Nov 15, 2025",
        applyLink: "https://moef.gov.in/job/forest001",
        postedOn: "1 week ago",
        sourceUrl: "https://moef.gov.in",
        description: "Protect and conserve forest resources. Implement environmental policies and wildlife conservation programs.",
        status: "active",
        createdAt: new Date().toISOString()
      },
      {
        id: randomUUID(),
        title: "Bank Probationary Officer",
        department: "State Bank of India",
        location: "Pune, Maharashtra",
        qualification: "Graduate degree in any discipline",
        deadline: "Oct 18, 2025",
        applyLink: "https://sbi.co.in/job/po001",
        postedOn: "6 days ago",
        sourceUrl: "https://sbi.co.in",
        description: "Handle banking operations and customer service. Manage loan processing and financial transactions in government bank.",
        status: "active",
        createdAt: new Date().toISOString()
      }
    ];

    return mockJobs.filter(job => {
      const deadlineDate = new Date(job.deadline);
      return deadlineDate >= new Date();
    });
  }

  async getJobById(id) {
    return this.jobs.find(job => job.id === id);
  }
}

let storage;

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Initialize storage once
  if (!storage) {
    storage = new VercelStorage();
  }

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const job = await storage.getJobById(id);
      if (!job) {
        res.status(404).json({ error: 'Job not found' });
        return;
      }
      res.status(200).json(job);
    } catch (error) {
      console.error('Error fetching job:', error);
      res.status(500).json({ error: 'Failed to fetch job' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}