import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateChatResponse, UnauthorizedError } from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Universities and Programs
  app.get("/api/universities", async (_req, res) => {
    const universities = await storage.getUniversities();
    res.json(universities);
  });

  app.get("/api/universities/:id", async (req, res) => {
    const university = await storage.getUniversityById(parseInt(req.params.id));
    if (!university) return res.status(404).json({ message: "University not found" });
    res.json(university);
  });

  app.get("/api/programs", async (req, res) => {
    const filters = req.query as Partial<Program>;
    // Convert string values to numbers where needed
    if (filters.tuition) filters.tuition = parseInt(filters.tuition as string);
    if (filters.duration) filters.duration = parseInt(filters.duration as string);
    if (filters.universityId) filters.universityId = parseInt(filters.universityId as string);

    const programs = await storage.getPrograms(filters);
    res.json(programs);
  });

  // Accommodations
  app.get("/api/accommodations", async (req, res) => {
    const filters = req.query as Partial<any>;
    const accommodations = await storage.getAccommodations(filters);
    res.json(accommodations);
  });

  app.get("/api/accommodations/:id", async (req, res) => {
    const accommodation = await storage.getAccommodationById(parseInt(req.params.id));
    if (!accommodation) return res.status(404).json({ message: "Accommodation not found" });
    res.json(accommodation);
  });

  // Visa Steps
  app.get("/api/visa-steps", async (_req, res) => {
    const steps = await storage.getVisaSteps();
    res.json(steps);
  });

  // City Guides
  app.get("/api/city-guides", async (_req, res) => {
    const guides = await storage.getCityGuides();
    res.json(guides);
  });

  app.get("/api/city-guides/:city", async (req, res) => {
    const guide = await storage.getCityGuideByCity(req.params.city);
    if (!guide) return res.status(404).json({ message: "City guide not found" });
    res.json(guide);
  });

  // Events
  app.get("/api/events", async (req, res) => {
    const filters = req.query as Partial<any>;
    const events = await storage.getEvents(filters);
    res.json(events);
  });

  // Healthcare Providers
  app.get("/api/healthcare-providers", async (req, res) => {
    const filters = req.query as Partial<any>;
    const providers = await storage.getHealthcareProviders(filters);
    res.json(providers);
  });

  // Emergency Contacts
  app.get("/api/emergency-contacts", async (_req, res) => {
    const contacts = await storage.getEmergencyContacts();
    res.json(contacts);
  });

  // Job Postings
  app.get("/api/job-postings", async (req, res) => {
    const filters = req.query as Partial<any>;
    const jobs = await storage.getJobPostings(filters);
    res.json(jobs);
  });

  // Chat routes
  app.get("/api/chat/messages", async (req, res) => {
    // TODO: Get user from session
    const userId = 1; // Temporary for testing
    const messages = await storage.getChatMessages(userId);
    res.json(messages);
  });

  app.post("/api/chat/messages", async (req, res) => {
    try {
      // TODO: Get user from session
      const userId = 1; // Temporary for testing
      const isPremium = true; // Temporary for testing

      const { content } = req.body;
      if (!content) {
        return res.status(400).json({ message: "Message content is required" });
      }

      // Store user message
      const userMessage = await storage.createChatMessage({
        userId,
        role: "user",
        content,
      });

      // Generate AI response
      const messages = await storage.getChatMessages(userId);
      const aiResponse = await generateChatResponse(
        messages.map(m => ({ role: m.role, content: m.content })),
        isPremium
      );

      // Store AI response
      const assistantMessage = await storage.createChatMessage({
        userId,
        role: "assistant",
        content: aiResponse,
      });

      res.json(assistantMessage);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        res.status(403).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to process message" });
      }
    }
  });

  // Blog routes
  app.get("/api/blog/posts", async (req, res) => {
    const { category, isPremium } = req.query;
    const filters: { category?: string; isPremium?: boolean } = {};

    if (category) filters.category = category as string;
    if (isPremium) filters.isPremium = isPremium === 'true';

    const posts = await storage.getBlogPosts(filters);
    res.json(posts);
  });

  app.get("/api/blog/posts/:slug", async (req, res) => {
    const post = await storage.getBlogPostBySlug(req.params.slug);
    if (!post) return res.status(404).json({ message: "Blog post not found" });
    res.json(post);
  });

  app.get("/api/blog/posts/:postId/comments", async (req, res) => {
    const comments = await storage.getBlogPostComments(parseInt(req.params.postId));
    res.json(comments);
  });

  app.post("/api/blog/posts/:postId/comments", async (req, res) => {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Comment content is required" });
    }

    // TODO: Get user from session
    const userId = 1; // Temporary for testing

    const comment = await storage.createBlogComment({
      postId: parseInt(req.params.postId),
      userId,
      content,
    });

    res.json(comment);
  });

  const httpServer = createServer(app);
  return httpServer;
}