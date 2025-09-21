export interface User {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  address?: string;
  ward?: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: 'roads' | 'sanitation' | 'water' | 'lighting';
  status: 'submitted' | 'in-progress' | 'resolved';
  date: string;
  image?: string;
  audio?: string;
  landmark?: string;
  upvotes: number;
  userId: string;
  location: { lat: number; lng: number };
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'status' | 'upvote' | 'info' | 'success';
  read?: boolean;
}

export interface AppState {
  user: User | null;
  issues: Issue[];
  notifications: Notification[];
  darkMode: boolean;
  language: 'en' | 'hi';
  isLoading: boolean;
}