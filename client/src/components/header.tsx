import { Link } from "wouter";
import { Briefcase, Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2" data-testid="link-home">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Briefcase className="text-white text-sm" size={16} />
              </div>
              <span className="text-xl font-bold text-neutral-700">GovtJobsNow</span>
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-primary font-medium hover:text-primary/80 transition-colors" data-testid="link-jobs">
              Jobs
            </Link>
            <a href="#" className="text-neutral-500 hover:text-neutral-700 transition-colors" data-testid="link-about">
              About
            </a>
            <a href="#" className="text-neutral-500 hover:text-neutral-700 transition-colors" data-testid="link-contact">
              Contact
            </a>
            <Button className="bg-primary text-white hover:bg-primary/90" data-testid="button-alerts">
              <Bell className="mr-2 h-4 w-4" />
              Alerts
            </Button>
          </nav>

          {/* Mobile menu button */}
          <Button variant="ghost" className="md:hidden p-2" data-testid="button-mobile-menu">
            <Menu className="text-neutral-600" size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
}
