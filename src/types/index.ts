export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
}

export interface Organization {
  id: string;
  name: string;
  website: string;
  description: string;
  userId: string;
}

export interface WebPage {
  id: string;
  url: string;
  status: 'pending' | 'scraped' | 'failed';
  chunks: DataChunk[];
}

export interface DataChunk {
  id: string;
  content: string;
  type: 'text' | 'heading' | 'list';
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  googleSignIn: () => Promise<void>;
}