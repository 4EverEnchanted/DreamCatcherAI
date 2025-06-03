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
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  subscription: SubscriptionTier;
  generationsLeft: number;
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