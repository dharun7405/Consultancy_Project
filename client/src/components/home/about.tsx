import { motion } from "framer-motion";
import {
  BuildingIcon,
  RoadIcon,
  BridgeIcon,
  ConstructionIcon,
} from "@/components/ui/icons";

const About = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50" id="about">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="section-title">About Dhiya Infrastructure</h2>
          <p className="section-subtitle">
            Delivering excellence in infrastructure for over 15 years
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Our Journey of Excellence
            </h3>
            <p className="text-gray-600 mb-4">
              Established in 2008, Dhiya Infrastructure has grown to become one
              of the most trusted names in the infrastructure development sector.
              We started with a small team of dedicated professionals and have
              now expanded to over 500 employees, including engineers,
              architects, project managers, and skilled laborers.
            </p>
            <p className="text-gray-600 mb-4">
              Our company specializes in a wide range of infrastructure projects,
              from commercial buildings and residential complexes to bridges,
              highways, and industrial facilities. With a strong focus on
              quality, innovation, and sustainability, we have successfully
              completed over 100 major projects across multiple states in India.
            </p>
            <p className="text-gray-600">
              At Dhiya Infrastructure, we believe in building not just
              structures, but relationships. Our client-centered approach and
              commitment to delivering projects on time and within budget have
              earned us a reputation for excellence and reliability in the
              industry.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md card-hover"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <BuildingIcon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Our Mission</h4>
              <p className="text-gray-600">
                To build sustainable infrastructure that enhances communities and
                improves lives while maintaining the highest standards of quality
                and safety.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-md card-hover"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <RoadIcon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Our Vision</h4>
              <p className="text-gray-600">
                To be the leading infrastructure development company known for
                innovation, reliability, and positive social impact across South
                Asia.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-md card-hover"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <BridgeIcon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Our Values</h4>
              <p className="text-gray-600">
                Integrity, excellence, innovation, sustainability, and client
                satisfaction form the foundation of everything we do.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-md card-hover"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <ConstructionIcon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Our Approach</h4>
              <p className="text-gray-600">
                We combine innovative technologies with proven methodologies to
                deliver infrastructure projects that exceed expectations.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Company Timeline */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-10">
            Our Timeline
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-10 md:text-right md:mb-0 mb-6">
                  <h4 className="text-lg font-semibold text-primary">2008</h4>
                  <p className="text-gray-700 font-medium">Company Founded</p>
                  <p className="text-gray-600">
                    Dhiya Infrastructure was established with a team of 10 professionals.
                  </p>
                </div>
                <div className="md:w-1/2 md:pl-10 hidden md:block"></div>
              </div>

              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-10 hidden md:block"></div>
                <div className="md:w-1/2 md:pl-10 md:text-left md:mb-0 mb-6">
                  <h4 className="text-lg font-semibold text-primary">2012</h4>
                  <p className="text-gray-700 font-medium">First Major Project</p>
                  <p className="text-gray-600">
                    Completed our first commercial office complex in Bangalore.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-10 md:text-right md:mb-0 mb-6">
                  <h4 className="text-lg font-semibold text-primary">2015</h4>
                  <p className="text-gray-700 font-medium">Expansion</p>
                  <p className="text-gray-600">
                    Expanded operations to multiple states across India.
                  </p>
                </div>
                <div className="md:w-1/2 md:pl-10 hidden md:block"></div>
              </div>

              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-10 hidden md:block"></div>
                <div className="md:w-1/2 md:pl-10 md:text-left md:mb-0 mb-6">
                  <h4 className="text-lg font-semibold text-primary">2018</h4>
                  <p className="text-gray-700 font-medium">Innovation Award</p>
                  <p className="text-gray-600">
                    Received national recognition for innovative construction techniques.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-10 md:text-right md:mb-0 mb-6">
                  <h4 className="text-lg font-semibold text-primary">2020</h4>
                  <p className="text-gray-700 font-medium">Sustainability Commitment</p>
                  <p className="text-gray-600">
                    Launched our green construction initiative for sustainable infrastructure.
                  </p>
                </div>
                <div className="md:w-1/2 md:pl-10 hidden md:block"></div>
              </div>

              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-10 hidden md:block"></div>
                <div className="md:w-1/2 md:pl-10 md:text-left">
                  <h4 className="text-lg font-semibold text-primary">Today</h4>
                  <p className="text-gray-700 font-medium">Leading Infrastructure Company</p>
                  <p className="text-gray-600">
                    Over 500 professionals, 100+ major projects completed, and a commitment to shaping India's future.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
