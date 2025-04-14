import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { QuoteIcon, StarIcon } from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/skeleton";
import type { Testimonial } from "@shared/schema";

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
      <div className="mb-4">
        {[...Array(5)].map((_, i) => (
          <StarIcon 
            key={i} 
            className="inline-block w-5 h-5 text-yellow-500 mr-1" 
            filled={i < testimonial.rating} 
          />
        ))}
      </div>
      <div className="mb-6 flex-grow">
        <QuoteIcon className="w-8 h-8 text-primary/20 mb-2" />
        <p className="text-gray-700 italic">"{testimonial.content}"</p>
      </div>
      <div className="flex items-center">
        <img 
          src={testimonial.imageUrl} 
          alt={testimonial.name} 
          className="w-12 h-12 rounded-full mr-4 object-cover"
        />
        <div>
          <p className="font-medium text-gray-900">{testimonial.name}</p>
          <p className="text-sm text-gray-600">{testimonial.company}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  if (error) {
    console.error("Error loading testimonials:", error);
  }

  return (
    <section className="py-16 md:py-24" id="testimonials">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="section-title">Client Testimonials</h2>
          <p className="section-subtitle">
            Hear what our clients have to say about working with us
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <Skeleton className="h-5 w-24 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <div className="flex items-center">
                  <Skeleton className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Carousel 
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials?.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        )}

        <div className="mt-16 bg-primary/5 rounded-xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to Start Your Infrastructure Project?
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Join our growing list of satisfied clients. Whether you're planning a commercial building, residential complex, or any infrastructure project, we're ready to deliver excellence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-primary text-4xl mb-2">100+</h4>
              <p className="text-gray-600">Projects Completed</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-primary text-4xl mb-2">95%</h4>
              <p className="text-gray-600">Client Satisfaction</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-primary text-4xl mb-2">15+</h4>
              <p className="text-gray-600">Years of Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
