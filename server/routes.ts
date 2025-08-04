import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuoteRequestSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Quote Requests API
  app.post("/api/quote-requests", async (req, res) => {
    try {
      const validatedData = insertQuoteRequestSchema.parse(req.body);
      const quoteRequest = await storage.createQuoteRequest(validatedData);
      res.json(quoteRequest);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input data", errors: error.errors });
        return;
      }
      res.status(500).json({ message: "Failed to create quote request" });
    }
  });

  app.get("/api/quote-requests", async (req, res) => {
    try {
      const quoteRequests = await storage.getAllQuoteRequests();
      res.json(quoteRequests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quote requests" });
    }
  });

  app.get("/api/quote-requests/:id", async (req, res) => {
    try {
      const quoteRequest = await storage.getQuoteRequest(req.params.id);
      if (!quoteRequest) {
        res.status(404).json({ message: "Quote request not found" });
        return;
      }
      res.json(quoteRequest);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quote request" });
    }
  });

  // Testimonials API
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.get("/api/testimonials/featured", async (req, res) => {
    try {
      const testimonials = await storage.getFeaturedTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured testimonials" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
