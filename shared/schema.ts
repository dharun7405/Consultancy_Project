import { pgTable, text, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Tender schema
export const tenders = pgTable("tenders", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  clientName: text("client_name").notNull(),
  value: text("value").notNull(),
  completionDate: text("completion_date").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const insertTenderSchema = createInsertSchema(tenders).pick({
  title: true,
  description: true,
  location: true,
  clientName: true,
  value: true,
  completionDate: true,
  imageUrl: true,
});

export type InsertTender = z.infer<typeof insertTenderSchema>;
export type Tender = typeof tenders.$inferSelect;

// Tender Request schema
export const tenderRequests = pgTable("tender_requests", {
  id: serial("id").primaryKey(),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  projectType: text("project_type").notNull(),
  projectLocation: text("project_location").notNull(),
  projectDescription: text("project_description").notNull(),
  estimatedBudget: text("estimated_budget"),
  preferredTimeline: text("preferred_timeline"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  status: text("status").default("pending").notNull(),
});

export const insertTenderRequestSchema = createInsertSchema(tenderRequests).pick({
  companyName: true,
  contactName: true,
  email: true,
  phone: true,
  projectType: true,
  projectLocation: true,
  projectDescription: true,
  estimatedBudget: true,
  preferredTimeline: true,
});

export const tenderRequestValidationSchema = insertTenderRequestSchema.extend({
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  projectDescription: z.string().min(20, "Project description must be at least 20 characters"),
});

export type InsertTenderRequest = z.infer<typeof insertTenderRequestSchema>;
export type TenderRequest = typeof tenderRequests.$inferSelect;

// Testimonials schema
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).pick({
  name: true,
  company: true,
  content: true,
  rating: true,
  imageUrl: true,
});

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
