import { User as FirebaseUser } from "firebase/auth";

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  firebaseUser: FirebaseUser;
}



export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  googleSignIn: () => Promise<void>;
  checkEmailVerification: () => Promise<boolean>;
}

export interface Organization {
  id: string;
  name: string;
  website: string;
  description: string;
  userId: string;
}

export interface WebPageChunk {
  id: string;
  content: string;
  confidence: number;
  source: string;
  keywords: string[];
  entityType?: 'product' | 'service' | 'about' | 'contact' | 'other';
  type?: 'text' | 'heading' | 'list';
}

export interface WebPage {
  id: string;
  url: string;
  status: 'pending' | 'scraped' | 'failed';
  progress?: number;
  chunks?: WebPageChunk[];
  metaData?: {
    title?: string;
    description?: string;
    language?: string;
    primaryTopic?: string;
  };
}

export interface OrganizationData {
  name: string;
  website: string;
  description: string;
  metaDescription?: string;
  industry?: string;
  keywords?: string[];
}

export interface WebsiteAnalysis {
  totalPages: number;
  scrapedPages: number;
  primaryTopics: string[];
  keywordFrequency: { [key: string]: number };
  estimatedTrainingCompletion: number;
}
