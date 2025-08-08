# SarkariJobsIndia 🇮🇳

A comprehensive government job portal for Indian job seekers, featuring the latest Sarkari job openings from various Indian ministries and departments.

## 🌟 Features

- **Latest Government Jobs**: 8+ authentic Indian government job listings
- **Smart Search**: Search by job title, department, or location
- **Advanced Filters**: Filter by Indian cities and government departments
- **Real-time Updates**: Only shows active jobs with future deadlines
- **Responsive Design**: Works perfectly on desktop and mobile
- **Professional UI**: Clean, government-themed interface

## 🏛️ Government Departments Covered

- Ministry of Electronics and IT
- Ministry of Health and Family Welfare
- Central Board of Direct Taxes
- Ministry of Home Affairs
- Ministry of Education
- Indian Railways
- Ministry of Environment and Forests
- State Bank of India

## 🎯 Job Categories

- Software Development
- Medical Services
- Tax & Finance
- Cyber Security
- Education
- Railway Operations
- Environmental Services
- Banking

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **TanStack Query** for state management
- **Wouter** for routing

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **Serverless Functions** for Vercel deployment

### Features
- **Search & Filter**: Real-time job filtering
- **Responsive Design**: Mobile-first approach
- **Type Safety**: Full TypeScript integration
- **Performance**: Optimized for fast loading

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The application will be available at `http://localhost:5000`

### Vercel Deployment

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/sarkari-jobs-india.git
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Use these settings:
     - **Build Command**: `cd client && npm run build`
     - **Output Directory**: `client/dist`
     - **Install Command**: `cd client && npm install`

3. **Your app will be live** at `https://your-project.vercel.app`

## 📁 Project Structure

```
├── api/                    # Vercel serverless functions
│   └── jobs/
│       ├── index.js       # Jobs API endpoint
│       └── [id].js        # Job details endpoint
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # App pages
│   │   └── lib/           # Utilities
│   └── package.json       # Frontend dependencies
├── server/                # Original Express server (Replit)
├── shared/                # Shared TypeScript types
├── vercel.json            # Vercel configuration
└── package.json           # Root dependencies
```

## 🎨 UI Components

- **JobCard**: Individual job listing display
- **SearchFilters**: Search input and filter dropdowns
- **Header**: Navigation and branding
- **Footer**: Site information and links

## 🔍 Search & Filter Features

### Search
- Job titles (e.g., "Software Developer", "Medical Officer")
- Departments (e.g., "Ministry of Health", "Indian Railways")
- Locations (e.g., "Delhi", "Mumbai", "Bangalore")

### Filters
- **Location**: Filter by Indian cities
- **Department**: Filter by government ministries
- **Sorting**: Sort by latest, deadline, or department

## 📱 Responsive Design

- **Mobile-first**: Optimized for mobile devices
- **Tablet-friendly**: Works great on tablets
- **Desktop**: Full-featured desktop experience

## 🔐 Features

- ✅ Real-time search and filtering
- ✅ Date validation (only future deadlines)
- ✅ Mobile-responsive design
- ✅ Professional government theme
- ✅ Type-safe API integration
- ✅ Fast loading and caching

## 🌐 API Endpoints

- `GET /api/jobs` - Get all active jobs
- `GET /api/jobs/:id` - Get specific job details
- `GET /api/jobs?search=query` - Search jobs
- `GET /api/jobs?location=city` - Filter by location
- `GET /api/jobs?department=ministry` - Filter by department

## 🚧 Future Enhancements

- Real government website scraping
- User authentication and saved jobs
- Email notifications for new jobs
- Advanced analytics dashboard
- Multi-language support
- Mobile app development

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues and questions, please open a GitHub issue or contact the development team.

---

**SarkariJobsIndia** - Your Gateway to Government Careers 🇮🇳