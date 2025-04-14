import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPinIcon,
  CalendarIcon,
  DollarIcon,
  BuildingIcon,
  RoadIcon,
  BridgeIcon,
  HomeIcon,
  IndustrialIcon,
} from "@/components/ui/icons";
import { motion } from "framer-motion";
import type { Tender } from "@shared/schema";

const TendersPage = () => {
  const [filter, setFilter] = useState<string | null>(null);
  
  const { data: tenders, isLoading, error } = useQuery<Tender[]>({
    queryKey: ["/api/tenders"],
  });

  if (error) {
    console.error("Error loading tenders:", error);
  }

  const filterButtons = [
    { label: "All", icon: null, value: null },
    { label: "Commercial", icon: <BuildingIcon className="h-4 w-4" />, value: "commercial" },
    { label: "Infrastructure", icon: <RoadIcon className="h-4 w-4" />, value: "infrastructure" },
    { label: "Residential", icon: <HomeIcon className="h-4 w-4" />, value: "residential" },
    { label: "Industrial", icon: <IndustrialIcon className="h-4 w-4" />, value: "industrial" },
  ];

  const filteredTenders = filter
    ? tenders?.filter((tender) => 
        tender.title.toLowerCase().includes(filter) || 
        tender.description.toLowerCase().includes(filter)
      )
    : tenders;

  return (
    <div className="container py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Projects Portfolio</h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Explore our successful infrastructure projects across India, showcasing our expertise, innovation, and commitment to excellence.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {filterButtons.map((btn) => (
          <Button
            key={btn.value || "all"}
            variant={filter === btn.value ? "default" : "outline"}
            onClick={() => setFilter(btn.value)}
            className="flex items-center gap-2"
          >
            {btn.icon}
            {btn.label}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <Skeleton className="h-56 w-full rounded-t-lg" />
              <CardContent className="p-6">
                <Skeleton className="h-8 w-3/4 mb-3" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {filteredTenders && filteredTenders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTenders.map((tender, index) => (
                <motion.div
                  key={tender.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden h-full flex flex-col card-hover">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={tender.imageUrl}
                        alt={tender.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-6 flex-grow flex flex-col">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {tender.title}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-4">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        <span className="text-sm">{tender.location}</span>
                      </div>
                      <p className="text-gray-600 mb-4 flex-grow">
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
                      <div className="pt-2 border-t border-gray-200">
                        <span className="text-sm font-medium text-gray-700">
                          Client: {tender.clientName}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No projects found</h3>
              <p className="text-gray-500">
                No projects match your current filter. Please try a different category.
              </p>
              <Button 
                variant="outline" 
                onClick={() => setFilter(null)} 
                className="mt-4"
              >
                View All Projects
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TendersPage;
