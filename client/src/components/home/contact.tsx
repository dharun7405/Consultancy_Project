import { PhoneIcon, EmailIcon, MapPinIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Contact = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50" id="contact">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">
            Get in touch with our team to discuss your infrastructure needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1 lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md h-full">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Get In Touch
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPinIcon className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-800">Our Office</h4>
                    <p className="text-gray-600">
                      NO.9, Deivanayaki Nagar 4th Street, <br />
                      Sanganoor Road, Coimbatore, <br />
                      Tamil Nadu, India - 641006
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <EmailIcon className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-800">Email Us</h4>
                    <a 
                      href="mailto:info@dhiyainfra.com" 
                      className="text-gray-600 hover:text-primary"
                    >
                      info@dhiyainfra.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <PhoneIcon className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-800">Call Us</h4>
                    <a 
                      href="tel:+917899887766" 
                      className="text-gray-600 hover:text-primary"
                    >
                      +91 8148170052
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-medium text-gray-800 mb-3">Business Hours</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>9:00 AM - 1:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="col-span-1 lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md h-full">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Location Map
              </h3>
              
              <div className="rounded-lg overflow-hidden h-80 bg-gray-100">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296514!2d77.49085452863511!3d12.95396421631447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sus!4v1661499030465!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Dhiya Infrastructure Office Location"
                ></iframe>
              </div>
              
              <div className="mt-6">
                <p className="text-gray-600 mb-6">
                  Ready to start your infrastructure project? Contact our team for a consultation or submit a formal tender request.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild>
                    <Link href="/tender-request">
                      <a>Submit Tender Request</a>
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="tel:+917899887766">
                      Call for Immediate Assistance
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
