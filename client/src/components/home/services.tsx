import { motion } from "framer-motion";
import {
  BuildingIcon,
  RoadIcon,
  BridgeIcon,
  HomeIcon,
  IndustrialIcon,
  ConstructionIcon,
} from "@/components/ui/icons";

const Services = () => {
  const services = [
    {
      title: "Commercial Construction",
      description: "Office buildings, shopping centers, hotels, and other commercial structures built to the highest standards.",
      icon: <BuildingIcon className="w-12 h-12 text-primary" />,
    },
    {
      title: "Infrastructure Development",
      description: "Roads, highways, and urban development projects that connect communities and drive economic growth.",
      icon: <RoadIcon className="w-12 h-12 text-primary" />,
    },
    {
      title: "Bridges & Flyovers",
      description: "Modern bridge construction using advanced engineering techniques to ensure safety and longevity.",
      icon: <BridgeIcon className="w-12 h-12 text-primary" />,
    },
    {
      title: "Residential Projects",
      description: "High-quality residential complexes, apartments, and townships that provide comfortable living spaces.",
      icon: <HomeIcon className="w-12 h-12 text-primary" />,
    },
    {
      title: "Industrial Construction",
      description: "Factories, warehouses, and industrial facilities designed for efficiency and functionality.",
      icon: <IndustrialIcon className="w-12 h-12 text-primary" />,
    },
    {
      title: "Renovation & Restoration",
      description: "Revitalizing existing structures while preserving their integrity and enhancing their functionality.",
      icon: <ConstructionIcon className="w-12 h-12 text-primary" />,
    },
  ];

  return (
    <section className="py-16 md:py-24" id="services">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            We offer a comprehensive range of infrastructure development services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md card-hover"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-gray-100 rounded-xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Why Choose Our Services?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">✓</span>
                  <span className="text-gray-700">
                    <strong>Experienced Team:</strong> Our professionals bring decades of combined experience
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">✓</span>
                  <span className="text-gray-700">
                    <strong>Quality Assurance:</strong> Rigorous quality control at every project stage
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">✓</span>
                  <span className="text-gray-700">
                    <strong>Timely Delivery:</strong> Proven track record of meeting project deadlines
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">✓</span>
                  <span className="text-gray-700">
                    <strong>Budget Compliance:</strong> Transparent financial management and cost control
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">✓</span>
                  <span className="text-gray-700">
                    <strong>Sustainable Practices:</strong> Environmentally conscious construction methods
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">✓</span>
                  <span className="text-gray-700">
                    <strong>Advanced Technology:</strong> Utilizing the latest construction technologies
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=400"
                alt="Professional office meeting"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-white p-4 rounded-lg shadow-lg hidden md:block">
                <p className="font-bold text-xl">15+ Years</p>
                <p className="text-sm">of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
