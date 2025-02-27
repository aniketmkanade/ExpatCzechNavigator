import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const universities = pgTable("universities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  city: text("city").notNull(),
  type: text("type").notNull(),
  website: text("website").notNull(),
});

export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  universityId: integer("university_id").notNull(),
  name: text("name").notNull(),
  level: text("level").notNull(),
  subject: text("subject").notNull(),
  language: text("language").notNull(),
  duration: integer("duration").notNull(),
  tuition: integer("tuition").notNull(),
  deadline: text("deadline").notNull(),
  formOfStudy: text("form_of_study").notNull(),
});

export const accommodations = pgTable("accommodations", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  city: text("city").notNull(),
  price: integer("price").notNull(),
  amenities: text("amenities").array().notNull(),
  description: text("description").notNull(),
});

export const visaSteps = pgTable("visa_steps", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  documents: jsonb("documents").notNull(),
  order: integer("order").notNull(),
});

export const cityGuides = pgTable("city_guides", {
  id: serial("id").primaryKey(),
  city: text("city").notNull(),
  overview: text("overview").notNull(),
  transportation: jsonb("transportation").notNull(),
  customs: jsonb("customs").notNull(),
  costOfLiving: jsonb("cost_of_living").notNull(),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  location: text("location").notNull(),
  type: text("type").notNull(),
  organizer: text("organizer").notNull(),
});

export const healthcareProviders = pgTable("healthcare_providers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  phone: text("phone").notNull(),
  languages: text("languages").array().notNull(),
  specialties: text("specialties").array().notNull(),
});

export const emergencyContacts = pgTable("emergency_contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  phone: text("phone").notNull(),
  description: text("description").notNull(),
});

export const jobPostings = pgTable("job_postings", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  location: text("location").notNull(),
  type: text("type").notNull(),
  description: text("description").notNull(),
  requirements: text("requirements").array().notNull(),
  salary: integer("salary"),
  contactEmail: text("contact_email").notNull(),
  postedAt: timestamp("posted_at").notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  isPremium: boolean("is_premium").default(false).notNull(),
  authorId: integer("author_id").notNull(),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const blogComments = pgTable("blog_comments", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull(),
  userId: integer("user_id").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  hashedPassword: text("hashed_password").notNull(),
  isPremium: boolean("is_premium").default(false).notNull(),
  trialEndsAt: timestamp("trial_ends_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  status: text("status").notNull(), 
  planType: text("plan_type").notNull(), 
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  stripeSubscriptionId: text("stripe_subscription_id"),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  role: text("role").notNull(), 
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUniversitySchema = createInsertSchema(universities);
export const insertProgramSchema = createInsertSchema(programs);
export const insertAccommodationSchema = createInsertSchema(accommodations);
export const insertVisaStepSchema = createInsertSchema(visaSteps);
export const insertCityGuideSchema = createInsertSchema(cityGuides);
export const insertEventSchema = createInsertSchema(events);
export const insertHealthcareProviderSchema = createInsertSchema(healthcareProviders);
export const insertEmergencyContactSchema = createInsertSchema(emergencyContacts);
export const insertJobPostingSchema = createInsertSchema(jobPostings);

export const insertUserSchema = createInsertSchema(users).omit({ 
  id: true,
  createdAt: true 
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).omit({ 
  id: true 
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({ 
  id: true,
  createdAt: true 
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({ 
  id: true,
  publishedAt: true,
  updatedAt: true 
});

export const insertBlogCommentSchema = createInsertSchema(blogComments).omit({ 
  id: true,
  createdAt: true 
});

export type University = typeof universities.$inferSelect;
export type Program = typeof programs.$inferSelect;
export type Accommodation = typeof accommodations.$inferSelect;
export type VisaStep = typeof visaSteps.$inferSelect;
export type CityGuide = typeof cityGuides.$inferSelect;
export type Event = typeof events.$inferSelect;
export type HealthcareProvider = typeof healthcareProviders.$inferSelect;
export type EmergencyContact = typeof emergencyContacts.$inferSelect;
export type JobPosting = typeof jobPostings.$inferSelect;
export type User = typeof users.$inferSelect;
export type Subscription = typeof subscriptions.$inferSelect;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type BlogComment = typeof blogComments.$inferSelect;

export type InsertUniversity = z.infer<typeof insertUniversitySchema>;
export type InsertProgram = z.infer<typeof insertProgramSchema>;
export type InsertAccommodation = z.infer<typeof insertAccommodationSchema>;
export type InsertVisaStep = z.infer<typeof insertVisaStepSchema>;
export type InsertCityGuide = z.infer<typeof insertCityGuideSchema>;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type InsertHealthcareProvider = z.infer<typeof insertHealthcareProviderSchema>;
export type InsertEmergencyContact = z.infer<typeof insertEmergencyContactSchema>;
export type InsertJobPosting = z.infer<typeof insertJobPostingSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type InsertBlogComment = z.infer<typeof insertBlogCommentSchema>;