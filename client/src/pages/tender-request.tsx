import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TenderRequestForm from "@/components/tenders/request-form";

const TenderRequest = () => {
  return (
    <div className="container py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Request a Tender</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Interested in working with Dhiya Infrastructure? Fill out the form below to submit your tender request. Our team will review your requirements and get back to you.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tender Request Form</CardTitle>
            <CardDescription>
              Provide details about your infrastructure project needs for a prompt response from our team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TenderRequestForm />
          </CardContent>
        </Card>

        <div className="mt-10 bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-bold mb-4">What Happens Next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                <span className="text-primary font-bold">1</span>
              </div>
              <h4 className="font-medium mb-2">Review</h4>
              <p className="text-gray-600 text-sm">
                Our team will review your project requirements within 2 business days.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                <span className="text-primary font-bold">2</span>
              </div>
              <h4 className="font-medium mb-2">Consultation</h4>
              <p className="text-gray-600 text-sm">
                We'll schedule a consultation to discuss your project in detail.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                <span className="text-primary font-bold">3</span>
              </div>
              <h4 className="font-medium mb-2">Proposal</h4>
              <p className="text-gray-600 text-sm">
                You'll receive a detailed proposal with timeline and cost estimates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenderRequest;
