import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTenderRequestSchema, tenderRequestValidationSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  const apiRouter = express.Router();
  
  // GET /api/tenders - Get all tenders
  apiRouter.get("/tenders", async (_req, res) => {
    try {
      const tenders = await storage.getTenders();
      res.json(tenders);
    } catch (error) {
      console.error("Error fetching tenders:", error);
      res.status(500).json({ message: "Error fetching tenders" });
    }
  });

  // GET /api/tenders/:id - Get a specific tender
  apiRouter.get("/tenders/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid tender ID" });
      }
      
      const tender = await storage.getTender(id);
      if (!tender) {
        return res.status(404).json({ message: "Tender not found" });
      }
      
      res.json(tender);
    } catch (error) {
      console.error("Error fetching tender:", error);
      res.status(500).json({ message: "Error fetching tender" });
    }
  });

  // GET /api/testimonials - Get all testimonials
  apiRouter.get("/testimonials", async (_req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Error fetching testimonials" });
    }
  });

  // POST /api/tender-requests - Create a new tender request
  apiRouter.post("/tender-requests", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = tenderRequestValidationSchema.parse(req.body);
      
      // Create the tender request
      const tenderRequest = await storage.createTenderRequest(validatedData);
      
      res.status(201).json({ 
        message: "Tender request submitted successfully",
        tenderRequest 
      });
    } catch (error) {
      console.error("Error creating tender request:", error);
      
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.details 
        });
      }
      
      res.status(500).json({ message: "Error submitting tender request" });
    }
  });

  // Use the API router with /api prefix
  app.use("/api", apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
