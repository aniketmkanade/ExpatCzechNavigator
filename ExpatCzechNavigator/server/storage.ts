import {
  type University, type Program, type Accommodation, type VisaStep,
  type CityGuide, type Event, type HealthcareProvider, type EmergencyContact, type JobPosting,
  type InsertUniversity, type InsertProgram, type InsertAccommodation, type InsertVisaStep,
  type InsertCityGuide, type InsertEvent, type InsertHealthcareProvider, type InsertEmergencyContact,
  type InsertJobPosting,
  type ChatMessage, type InsertChatMessage,
  type BlogPost, type BlogComment,
  type InsertBlogPost, type InsertBlogComment,
} from "@shared/schema";

export interface IStorage {
  // Existing methods
  getUniversities(): Promise<University[]>;
  getUniversityById(id: number): Promise<University | undefined>;
  getPrograms(filters?: Partial<Program>): Promise<Program[]>;
  getProgramById(id: number): Promise<Program | undefined>;
  getAccommodations(filters?: Partial<Accommodation>): Promise<Accommodation[]>;
  getAccommodationById(id: number): Promise<Accommodation | undefined>;
  getVisaSteps(): Promise<VisaStep[]>;

  // New methods for post-arrival features
  getCityGuides(): Promise<CityGuide[]>;
  getCityGuideByCity(city: string): Promise<CityGuide | undefined>;
  getEvents(filters?: Partial<Event>): Promise<Event[]>;
  getHealthcareProviders(filters?: Partial<HealthcareProvider>): Promise<HealthcareProvider[]>;
  getEmergencyContacts(): Promise<EmergencyContact[]>;
  getJobPostings(filters?: Partial<JobPosting>): Promise<JobPosting[]>;

  // Chat methods
  getChatMessages(userId: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;

  // Blog methods
  getBlogPosts(filters?: { category?: string; isPremium?: boolean }): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPostComments(postId: number): Promise<BlogComment[]>;
  createBlogComment(comment: InsertBlogComment): Promise<BlogComment>;
}

export class MemStorage implements IStorage {
  private universities: Map<number, University>;
  private programs: Map<number, Program>;
  private accommodations: Map<number, Accommodation>;
  private visaSteps: Map<number, VisaStep>;
  private cityGuides: Map<number, CityGuide>;
  private events: Map<number, Event>;
  private healthcareProviders: Map<number, HealthcareProvider>;
  private emergencyContacts: Map<number, EmergencyContact>;
  private jobPostings: Map<number, JobPosting>;
  private chatMessages: Map<number, ChatMessage>;
  private nextChatId: number;
  private blogPosts: Map<number, BlogPost>;
  private blogComments: Map<number, BlogComment>;
  private nextBlogCommentId: number;

  constructor() {
    this.universities = new Map([
      [1, { id: 1, name: "Charles University", city: "Prague", type: "Public", website: "https://cuni.cz" }],
      [2, { id: 2, name: "Czech Technical University", city: "Prague", type: "Public", website: "https://cvut.cz" }],
    ]);

    this.programs = new Map([
      [1, {
        id: 1,
        universityId: 1,
        name: "Computer Science",
        level: "Bachelor",
        subject: "Computer Science",
        language: "English",
        duration: 3,
        tuition: 3000,
        deadline: "2024-04-30",
        formOfStudy: "Full-time"
      }],
    ]);

    this.accommodations = new Map([
      [1, {
        id: 1,
        title: "Student Dormitory Strahov",
        type: "Dormitory",
        city: "Prague",
        price: 200,
        amenities: ["WiFi", "Shared Kitchen", "Laundry"],
        description: "Budget-friendly student accommodation"
      }],
    ]);

    this.visaSteps = new Map([
      [1, {
        id: 1,
        title: "Gather Required Documents",
        description: "Collect all necessary documents for your visa application",
        documents: ["Passport", "Photos", "Proof of Accommodation"],
        order: 1
      }],
    ]);

    this.cityGuides = new Map([
      [1, {
        id: 1,
        city: "Prague",
        overview: "Prague, the capital city of the Czech Republic, is known for its rich history and beautiful architecture.",
        transportation: {
          metro: ["Line A", "Line B", "Line C"],
          tram: "Extensive network covering the city",
          bus: "Night services available",
          passes: {
            monthly: "550 CZK",
            student_discount: "Available with ISIC"
          }
        },
        customs: {
          greetings: "Formal greetings are common",
          tipping: "10% in restaurants",
          business_hours: "Shops typically close early on weekends"
        },
        costOfLiving: {
          rent: "12000-20000 CZK/month",
          food: "4000-6000 CZK/month",
          transport: "550 CZK/month",
          entertainment: "2000-4000 CZK/month"
        }
      }]
    ]);

    this.events = new Map([
      [1, {
        id: 1,
        title: "International Student Meetup",
        description: "Monthly gathering for international students to meet and socialize",
        date: new Date("2024-03-15T18:00:00"),
        location: "Prague Beer Garden",
        type: "networking",
        organizer: "ESN Charles University"
      }]
    ]);

    this.healthcareProviders = new Map([
      [1, {
        id: 1,
        name: "Canadian Medical Care",
        type: "clinic",
        address: "Veleslavínská 1/30, Prague 6",
        city: "Prague",
        phone: "+420 235 360 133",
        languages: ["English", "Czech", "Russian"],
        specialties: ["General Practice", "Pediatrics", "Gynecology"]
      }]
    ]);

    this.emergencyContacts = new Map([
      [1, {
        id: 1,
        name: "Emergency Medical Service",
        category: "ambulance",
        phone: "155",
        description: "24/7 emergency medical service"
      }],
      [2, {
        id: 2,
        name: "Police",
        category: "police",
        phone: "158",
        description: "Emergency police service"
      }]
    ]);

    this.jobPostings = new Map([
      [1, {
        id: 1,
        title: "English Teacher",
        company: "Language School Prague",
        location: "Prague",
        type: "part_time",
        description: "Teaching English to Czech students",
        requirements: ["Native English speaker", "Teaching experience", "Bachelor's degree"],
        salary: 25000,
        contactEmail: "jobs@languageschool.cz",
        postedAt: new Date("2024-02-20")
      }]
    ]);
    this.chatMessages = new Map();
    this.nextChatId = 1;
    this.blogPosts = new Map([
      [1, {
        id: 1,
        title: "Guide to Czech Student Visa Application",
        slug: "czech-student-visa-guide",
        content: "A comprehensive guide to applying for a student visa in the Czech Republic...",
        category: "Visa Guide",
        isPremium: false,
        authorId: 1,
        publishedAt: new Date("2024-02-01"),
        updatedAt: new Date("2024-02-01"),
      }],
      [2, {
        id: 2,
        title: "Living in Prague: An International Student's Experience",
        slug: "living-in-prague-student-experience",
        content: "Personal insights and tips for making the most of your stay in Prague...",
        category: "Living in Prague",
        isPremium: true,
        authorId: 1,
        publishedAt: new Date("2024-02-15"),
        updatedAt: new Date("2024-02-15"),
      }],
    ]);

    this.blogComments = new Map();
    this.nextBlogCommentId = 1;
  }

  async getUniversities(): Promise<University[]> {
    return Array.from(this.universities.values());
  }

  async getUniversityById(id: number): Promise<University | undefined> {
    return this.universities.get(id);
  }

  async getPrograms(filters?: Partial<Program>): Promise<Program[]> {
    let programs = Array.from(this.programs.values());
    if (filters) {
      programs = programs.filter(program => {
        return Object.entries(filters).every(([key, value]) => {
          return program[key as keyof Program] === value;
        });
      });
    }
    return programs;
  }

  async getProgramById(id: number): Promise<Program | undefined> {
    return this.programs.get(id);
  }

  async getAccommodations(filters?: Partial<Accommodation>): Promise<Accommodation[]> {
    let accommodations = Array.from(this.accommodations.values());
    if (filters) {
      accommodations = accommodations.filter(accommodation => {
        return Object.entries(filters).every(([key, value]) => {
          return accommodation[key as keyof Accommodation] === value;
        });
      });
    }
    return accommodations;
  }

  async getAccommodationById(id: number): Promise<Accommodation | undefined> {
    return this.accommodations.get(id);
  }

  async getVisaSteps(): Promise<VisaStep[]> {
    return Array.from(this.visaSteps.values())
      .sort((a, b) => a.order - b.order);
  }

  async getCityGuides(): Promise<CityGuide[]> {
    return Array.from(this.cityGuides.values());
  }

  async getCityGuideByCity(city: string): Promise<CityGuide | undefined> {
    return Array.from(this.cityGuides.values())
      .find(guide => guide.city.toLowerCase() === city.toLowerCase());
  }

  async getEvents(filters?: Partial<Event>): Promise<Event[]> {
    let events = Array.from(this.events.values());
    if (filters) {
      events = events.filter(event => {
        return Object.entries(filters).every(([key, value]) => {
          return event[key as keyof Event] === value;
        });
      });
    }
    return events;
  }

  async getHealthcareProviders(filters?: Partial<HealthcareProvider>): Promise<HealthcareProvider[]> {
    let providers = Array.from(this.healthcareProviders.values());
    if (filters) {
      providers = providers.filter(provider => {
        return Object.entries(filters).every(([key, value]) => {
          return provider[key as keyof HealthcareProvider] === value;
        });
      });
    }
    return providers;
  }

  async getEmergencyContacts(): Promise<EmergencyContact[]> {
    return Array.from(this.emergencyContacts.values());
  }

  async getJobPostings(filters?: Partial<JobPosting>): Promise<JobPosting[]> {
    let jobs = Array.from(this.jobPostings.values());
    if (filters) {
      jobs = jobs.filter(job => {
        return Object.entries(filters).every(([key, value]) => {
          return job[key as keyof JobPosting] === value;
        });
      });
    }
    return jobs;
  }

  async getChatMessages(userId: number): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(message => message.userId === userId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.nextChatId++;
    const message: ChatMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.chatMessages.set(id, message);
    return message;
  }

  async getBlogPosts(filters?: { category?: string; isPremium?: boolean }): Promise<BlogPost[]> {
    let posts = Array.from(this.blogPosts.values());

    if (filters) {
      posts = posts.filter(post => {
        if (filters.category && post.category !== filters.category) return false;
        if (filters.isPremium !== undefined && post.isPremium !== filters.isPremium) return false;
        return true;
      });
    }

    return posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async getBlogPostComments(postId: number): Promise<BlogComment[]> {
    return Array.from(this.blogComments.values())
      .filter(comment => comment.postId === postId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createBlogComment(comment: InsertBlogComment): Promise<BlogComment> {
    const id = this.nextBlogCommentId++;
    const newComment: BlogComment = {
      ...comment,
      id,
      createdAt: new Date(),
    };
    this.blogComments.set(id, newComment);
    return newComment;
  }
}

export const storage = new MemStorage();