import React, { createContext, useContext, useState, useEffect } from 'react';
import { Dream } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface DreamContextType {
  dreams: Dream[];
  addDream: (dream: Omit<Dream, 'id' | 'createdAt'>) => void;
  getDream: (id: string) => Dream | undefined;
  loading: boolean;
}

const DreamContext = createContext<DreamContextType | undefined>(undefined);

export function useDreamContext() {
  const context = useContext(DreamContext);
  if (context === undefined) {
    throw new Error('useDreamContext must be used within a DreamProvider');
  }
  return context;
}

interface DreamProviderProps {
  children: React.ReactNode;
}

export function DreamProvider({ children }: DreamProviderProps) {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedDreams = localStorage.getItem('dreams');
    if (storedDreams) {
      setDreams(JSON.parse(storedDreams));
    } else {
      setDreams(sampleDreams);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('dreams', JSON.stringify(dreams));
    }
  }, [dreams, loading]);

  const addDream = (dreamData: Omit<Dream, 'id' | 'createdAt'>) => {
    const newDream: Dream = {
      ...dreamData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };

    setDreams((prevDreams) => [newDream, ...prevDreams]);
  };

  const getDream = (id: string) => {
    return dreams.find((dream) => dream.id === id);
  };

  return (
    <DreamContext.Provider value={{ dreams, addDream, getDream, loading }}>
      {children}
    </DreamContext.Provider>
  );
}

const sampleDreams: Dream[] = [
  {
    id: '1',
    title: 'Flying Over Mountains',
    description: 'I dreamt I was flying over purple mountains, feeling completely free and weightless. The sky was filled with stars even though it was daytime.',
    imageUrl: 'https://images.pexels.com/photos/4577790/pexels-photo-4577790.jpeg',
    tags: ['flying', 'mountains', 'freedom'],
    emotions: ['joy', 'freedom', 'peace'],
    createdAt: '2025-01-15T12:00:00Z',
    isPublic: true,
  },
  {
    id: '2',
    title: 'Underwater City',
    description: 'I discovered a city beneath the ocean where people lived in bubble-like structures. The buildings were made of coral and glowed with bioluminescent light.',
    imageUrl: 'https://images.pexels.com/photos/7021429/pexels-photo-7021429.jpeg',
    tags: ['underwater', 'city', 'exploration'],
    emotions: ['wonder', 'curiosity', 'surreal'],
    createdAt: '2025-01-10T15:30:00Z',
    isPublic: true,
  },
  {
    id: '3',
    title: 'Time Loop',
    description: 'I was trapped in a time loop, experiencing the same day over and over. Each time I noticed different details that helped me understand how to break free.',
    imageUrl: 'https://images.pexels.com/photos/1097930/pexels-photo-1097930.jpeg',
    tags: ['time', 'loop', 'puzzle'],
    emotions: ['confusion', 'determination', 'anxiety'],
    createdAt: '2025-01-05T09:45:00Z',
    isPublic: true,
  },
];