import { Link } from "wouter";
import { PhoneIcon, EmailIcon, MapPinIcon } from "@/components/ui/icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <Link href="/">
              <a className="flex items-center space-x-2">
                <div className="bg-primary text-white font-bold text-xl px-2 py-1 rounded">DI</div>
                <span className="font-bold text-xl">Dhiya Infrastructure</span>
              </a>
            </Link>
            <p className="mt-4 text-gray-400">
              Building the future with innovative infrastructure solutions for more than 15 years.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-gray-400 hover:text-white transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/tenders">
                  <a className="text-gray-400 hover:text-white transition-colors">Our Tenders</a>
                </Link>
              </li>
              <li>
                <Link href="/tender-request">
                  <a className="text-gray-400 hover:text-white transition-colors">Tender Request</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Commercial Construction</li>
              <li className="text-gray-400">Infrastructure Development</li>
              <li className="text-gray-400">Residential Projects</li>
              <li className="text-gray-400">Industrial Construction</li>
              <li className="text-gray-400">Renovation & Restoration</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPinIcon className="h-5 w-5 mr-3 text-primary shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  NO.9, Deivanayaki Nagar 4th Street, <br />
                  Sanganoor Road, Coimbatore, <br />
                  Tamil Nadu, India - 641006
                </span>
              </li>
              <li className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-3 text-primary shrink-0" />
                <a href="tel:+917899887766" className="text-gray-400 hover:text-white">
                  +91 8148170052
                </a>
              </li>
              <li className="flex items-center">
                <EmailIcon className="h-5 w-5 mr-3 text-primary shrink-0" />
                <a href="mailto:info@dhiyainfra.com" className="text-gray-400 hover:text-white">
                  info@dhiyainfra.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Dhiya Infrastructure. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
