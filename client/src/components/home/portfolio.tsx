import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPinIcon, CalendarIcon, DollarIcon } from "@/components/ui/icons";
import { motion } from "framer-motion";
import type { Tender } from "@shared/schema";

const Portfolio = () => {
  const { data: tenders, isLoading, error } = useQuery<Tender[]>({
    queryKey: ["/api/tenders"],
  });

  if (error) {
    console.error("Error loading tenders:", error);
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50" id="portfolio">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Projects Portfolio</h2>
          <p className="section-subtitle">
            Explore our successful infrastructure projects across India
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Skeleton className="h-56 w-full" />
                <div className="p-6">
                  <Skeleton className="h-8 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-1/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="flex justify-between">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tenders?.map((tender, index) => (
              <motion.div
                key={tender.id}
                className="bg-white rounded-lg shadow-md overflow-hidden card-hover"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={tender.imageUrl}
                    alt={tender.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {tender.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    <span className="text-sm">{tender.location}</span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {tender.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex items-center text-gray-700">
                      <DollarIcon className="h-4 w-4 mr-1 text-primary" />
                      <span className="text-sm">{tender.value}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CalendarIcon className="h-4 w-4 mr-1 text-primary" />
                      <span className="text-sm">{tender.completionDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <span className="text-sm font-medium text-gray-700">
                      Client: {tender.clientName}
                    </span>
                    <Button variant="outline" size="sm" className="text-primary border-primary">
                      View Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/tenders">
              <a>View All Projects</a>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
