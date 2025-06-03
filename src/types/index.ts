export interface Dream {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  emotions: string[];
  createdAt: string;
  userId?: string;
  isPublic: boolean;
  shareInsights?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  subscription: SubscriptionTier;
  generationsLeft: number;
  shareInsights: boolean;
}

export type SubscriptionTier = 'free' | 'premium';

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  generationsPerMonth: number;
}

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  createdAt: string;
  read: boolean;
  link?: string;
}

export interface CommunityInsight {
  id: string;
  userId: string;
  createdAt: string;
  moodTrends: {
    emotion: string;
    frequency: number;
    trend: 'increasing' | 'decreasing' | 'stable';
  }[];
  recurringThemes: {
    theme: string;
    frequency: number;
  }[];
  totalDreams: number;
}