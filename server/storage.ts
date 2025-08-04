import { type QuoteRequest, type InsertQuoteRequest, type Testimonial, type InsertTestimonial } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Quote Requests
  createQuoteRequest(request: InsertQuoteRequest): Promise<QuoteRequest>;
  getQuoteRequest(id: string): Promise<QuoteRequest | undefined>;
  getAllQuoteRequests(): Promise<QuoteRequest[]>;
  
  // Testimonials
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getAllTestimonials(): Promise<Testimonial[]>;
  getFeaturedTestimonials(): Promise<Testimonial[]>;
}

export class MemStorage implements IStorage {
  private quoteRequests: Map<string, QuoteRequest>;
  private testimonials: Map<string, Testimonial>;

  constructor() {
    this.quoteRequests = new Map();
    this.testimonials = new Map();
    
    // Seed testimonials data
    this.seedTestimonials();
  }

  private seedTestimonials() {
    const testimonialData = [
      {
        name: "Sarah Mitchell",
        company: "Mitchell Construction",
        rating: "5",
        content: "Master Signs transformed our fleet with stunning vehicle wraps that have generated countless leads. Their attention to detail and professional service exceeded our expectations.",
        avatar: "SM",
        featured: "true"
      },
      {
        name: "David Rodriguez",
        company: "Casa Bella Restaurant",
        rating: "5",
        content: "The LED sign Master Signs created for our restaurant has been a game-changer. Customer traffic increased significantly, and the quality is exceptional.",
        avatar: "DR",
        featured: "true"
      },
      {
        name: "Lisa Kim",
        company: "Pinnacle Awards",
        rating: "5",
        content: "From design to installation, Master Signs delivered excellence. Their laser engraved awards are beautiful, and their team is incredibly professional.",
        avatar: "LK",
        featured: "true"
      },
      {
        name: "Michael Johnson",
        company: "Johnson Pharmacy",
        rating: "5",
        content: "Master Signs helped us rebrand our entire storefront with beautiful architectural signage. The faith-driven approach and family values really show in their work.",
        avatar: "MJ",
        featured: "true"
      },
      {
        name: "Amanda Chen",
        company: "Grand Opening Events",
        rating: "5",
        content: "Outstanding service and quality! Our custom banners were exactly what we envisioned, and the team went above and beyond to meet our tight deadline.",
        avatar: "AC",
        featured: "true"
      },
      {
        name: "Robert Thompson",
        company: "Wellness Medical Center",
        rating: "5",
        content: "Master Signs created a comprehensive wayfinding system for our medical complex. Their professionalism and commitment to excellence is unmatched in the industry.",
        avatar: "RT",
        featured: "true"
      }
    ];

    testimonialData.forEach(data => {
      const id = randomUUID();
      const testimonial: Testimonial = { ...data, id };
      this.testimonials.set(id, testimonial);
    });
  }

  async createQuoteRequest(insertRequest: InsertQuoteRequest): Promise<QuoteRequest> {
    const id = randomUUID();
    const request: QuoteRequest = {
      ...insertRequest,
      id,
      status: "pending",
      createdAt: new Date(),
    };
    this.quoteRequests.set(id, request);
    return request;
  }

  async getQuoteRequest(id: string): Promise<QuoteRequest | undefined> {
    return this.quoteRequests.get(id);
  }

  async getAllQuoteRequests(): Promise<QuoteRequest[]> {
    return Array.from(this.quoteRequests.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(t => t.featured === "true");
  }
}

export const storage = new MemStorage();
