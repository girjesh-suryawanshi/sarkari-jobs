import { Briefcase } from "lucide-react";
import { FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Briefcase className="text-white text-sm" size={16} />
              </div>
              <span className="text-xl font-bold text-neutral-700">GovtJobsNow</span>
            </div>
            <p className="text-neutral-500 mb-4 max-w-md">
              Your trusted source for the latest government job openings with real-time updates from official sources.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-neutral-600 transition-colors" data-testid="link-twitter">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-neutral-600 transition-colors" data-testid="link-linkedin">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-neutral-600 transition-colors" data-testid="link-facebook">
                <FaFacebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-neutral-700 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-500 hover:text-neutral-700 transition-colors" data-testid="link-browse-jobs">Browse Jobs</a></li>
              <li><a href="#" className="text-neutral-500 hover:text-neutral-700 transition-colors" data-testid="link-job-alerts">Job Alerts</a></li>
              <li><a href="#" className="text-neutral-500 hover:text-neutral-700 transition-colors" data-testid="link-career-guide">Career Guide</a></li>
              <li><a href="#" className="text-neutral-500 hover:text-neutral-700 transition-colors" data-testid="link-faq">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-neutral-700 mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-500 hover:text-neutral-700 transition-colors" data-testid="link-contact-us">Contact Us</a></li>
              <li><a href="#" className="text-neutral-500 hover:text-neutral-700 transition-colors" data-testid="link-help-center">Help Center</a></li>
              <li><a href="#" className="text-neutral-500 hover:text-neutral-700 transition-colors" data-testid="link-privacy-policy">Privacy Policy</a></li>
              <li><a href="#" className="text-neutral-500 hover:text-neutral-700 transition-colors" data-testid="link-terms-of-service">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-200 mt-8 pt-8 text-center">
          <p className="text-neutral-400 text-sm">
            © 2024 GovtJobsNow. All rights reserved. Data sourced from official government websites.
          </p>
        </div>
      </div>
    </footer>
  );
}
