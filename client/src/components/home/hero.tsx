import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative">
      {/* Hero background */}
      <div className="absolute inset-0 z-0 bg-gray-800 opacity-70"></div>
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1920&h=1080')",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Hero content */}
      <div className="container relative z-10 py-24 md:py-32">
        <div className="max-w-3xl">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Building Tomorrow's Infrastructure Today
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-200 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            With over 15 years of excellence in infrastructure development, Dhiya Infrastructure delivers innovative and sustainable solutions for commercial, residential, and public projects across India.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-6">
              <Link href="/tenders">
                <a>Explore Our Projects</a>
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white hover:bg-gray-100 text-primary border-primary px-6">
              <Link href="/tender-request">
                <a>Request a Tender</a>
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
