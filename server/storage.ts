import { 
  User, 
  InsertUser, 
  Tender, 
  InsertTender, 
  TenderRequest, 
  InsertTenderRequest,
  Testimonial,
  InsertTestimonial
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Tender methods
  getTenders(): Promise<Tender[]>;
  getTender(id: number): Promise<Tender | undefined>;
  createTender(tender: InsertTender): Promise<Tender>;
  
  // Tender Request methods
  getTenderRequests(): Promise<TenderRequest[]>;
  getTenderRequest(id: number): Promise<TenderRequest | undefined>;
  createTenderRequest(tenderRequest: InsertTenderRequest): Promise<TenderRequest>;
  
  // Testimonial methods
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private tenders: Map<number, Tender>;
  private tenderRequests: Map<number, TenderRequest>;
  private testimonials: Map<number, Testimonial>;
  
  private currentUserId: number;
  private currentTenderId: number;
  private currentTenderRequestId: number;
  private currentTestimonialId: number;

  constructor() {
    this.users = new Map();
    this.tenders = new Map();
    this.tenderRequests = new Map();
    this.testimonials = new Map();
    
    this.currentUserId = 1;
    this.currentTenderId = 1;
    this.currentTenderRequestId = 1;
    this.currentTestimonialId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample tenders
    const sampleTenders: InsertTender[] = [
      {
        title: "Downtown Office Complex",
        description: "A state-of-the-art office complex featuring modern amenities, eco-friendly design, and smart building technology. The project included 3 towers with a total of 150,000 square feet of office space.",
        location: "Bangalore, Karnataka",
        clientName: "TechSpace Developers Ltd.",
        value: "₹250 Crores",
        completionDate: "January 2023",
        imageUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&h=500",
      },
      {
        title: "Metro Rail Extension Project",
        description: "Extended the city's metro line by 12 kilometers, including 8 new stations with modern design and accessibility features. The project improved transportation for over 100,000 daily commuters.",
        location: "Chennai, Tamil Nadu",
        clientName: "Chennai Metro Rail Corporation",
        value: "₹750 Crores",
        completionDate: "March 2022",
        imageUrl: "https://images.unsplash.com/photo-1585155770447-2f66e2a397b5?auto=format&fit=crop&w=800&h=500",
      },
      {
        title: "Urban Housing Development",
        description: "Constructed 500 residential units across 10 apartment buildings, complete with community amenities, green spaces, and sustainable infrastructure solutions.",
        location: "Hyderabad, Telangana",
        clientName: "Urban Living Developers",
        value: "₹175 Crores",
        completionDate: "October 2022",
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&h=500",
      },
      {
        title: "Highway Expansion Project",
        description: "Widened and reconstructed 45 kilometers of national highway, including 3 new bridges and 5 interchanges to reduce congestion and improve safety standards.",
        location: "Mumbai-Pune Expressway",
        clientName: "National Highways Authority of India",
        value: "₹420 Crores",
        completionDate: "December 2021",
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&h=500",
      },
    ];

    // Sample testimonials
    const sampleTestimonials: InsertTestimonial[] = [
      {
        name: "Rajesh Sharma",
        company: "TechSpace Developers Ltd.",
        content: "Dhiya Infrastructure delivered our office complex project ahead of schedule and within budget. Their attention to detail and quality workmanship impressed our entire team.",
        rating: 5,
        imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      {
        name: "Priya Patel",
        company: "Chennai Metro Rail Corporation",
        content: "Working with Dhiya Infrastructure on our metro expansion was a smooth experience. Their expertise in large-scale projects is unmatched in the industry.",
        rating: 5,
        imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
      },
      {
        name: "Vikram Reddy",
        company: "Urban Living Developers",
        content: "The housing development project was executed perfectly. Dhiya's commitment to sustainability and modern design elements set them apart from other contractors.",
        rating: 4,
        imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
      },
    ];

    // Add sample tenders
    sampleTenders.forEach(tender => {
      this.createTender(tender);
    });

    // Add sample testimonials
    sampleTestimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Tender methods
  async getTenders(): Promise<Tender[]> {
    return Array.from(this.tenders.values());
  }

  async getTender(id: number): Promise<Tender | undefined> {
    return this.tenders.get(id);
  }

  async createTender(insertTender: InsertTender): Promise<Tender> {
    const id = this.currentTenderId++;
    const tender: Tender = { ...insertTender, id };
    this.tenders.set(id, tender);
    return tender;
  }

  // Tender Request methods
  async getTenderRequests(): Promise<TenderRequest[]> {
    return Array.from(this.tenderRequests.values());
  }

  async getTenderRequest(id: number): Promise<TenderRequest | undefined> {
    return this.tenderRequests.get(id);
  }

  async createTenderRequest(insertTenderRequest: InsertTenderRequest): Promise<TenderRequest> {
    const id = this.currentTenderRequestId++;
    const tenderRequest: TenderRequest = { 
      ...insertTenderRequest, 
      id, 
      createdAt: new Date(),
      status: "pending" 
    };
    this.tenderRequests.set(id, tenderRequest);
    return tenderRequest;
  }

  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
}

export const storage = new MemStorage();
