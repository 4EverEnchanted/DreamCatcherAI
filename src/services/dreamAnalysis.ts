import { Dream } from '../types';

interface DreamInsight {
  type: 'mood' | 'theme' | 'pattern';
  title: string;
  description: string;
  value?: number;
  trend?: 'increasing' | 'decreasing' | 'stable';
}

interface DreamAnalysis {
  insights: DreamInsight[];
  moodTrends: {
    emotion: string;
    frequency: number;
    trend: 'increasing' | 'decreasing' | 'stable';
  }[];
  recurringThemes: {
    theme: string;
    frequency: number;
    relatedTags: string[];
  }[];
}

export function analyzeDreams(dreams: Dream[]): DreamAnalysis {
  // Sort dreams by date for trend analysis
  const sortedDreams = [...dreams].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Analyze emotions
  const emotionFrequency = new Map<string, number>();
  sortedDreams.forEach(dream => {
    dream.emotions.forEach(emotion => {
      emotionFrequency.set(emotion, (emotionFrequency.get(emotion) || 0) + 1);
    });
  });

  // Analyze themes through tags
  const tagFrequency = new Map<string, number>();
  const tagRelations = new Map<string, Set<string>>();
  sortedDreams.forEach(dream => {
    dream.tags.forEach(tag => {
      tagFrequency.set(tag, (tagFrequency.get(tag) || 0) + 1);
      // Track related tags
      dream.tags.forEach(relatedTag => {
        if (tag !== relatedTag) {
          if (!tagRelations.has(tag)) {
            tagRelations.set(tag, new Set());
          }
          tagRelations.get(tag)?.add(relatedTag);
        }
      });
    });
  });

  // Calculate mood trends
  const moodTrends = Array.from(emotionFrequency.entries())
    .map(([emotion, frequency]) => {
      // Calculate trend by comparing recent vs older dreams
      const recentEmotionCount = sortedDreams
        .slice(0, Math.floor(sortedDreams.length / 2))
        .filter(dream => dream.emotions.includes(emotion)).length;
      
      const olderEmotionCount = sortedDreams
        .slice(Math.floor(sortedDreams.length / 2))
        .filter(dream => dream.emotions.includes(emotion)).length;

      const trend = recentEmotionCount > olderEmotionCount 
        ? 'increasing' 
        : recentEmotionCount < olderEmotionCount 
          ? 'decreasing' 
          : 'stable';

      return {
        emotion,
        frequency,
        trend,
      };
    })
    .sort((a, b) => b.frequency - a.frequency);

  // Calculate recurring themes
  const recurringThemes = Array.from(tagFrequency.entries())
    .map(([theme, frequency]) => ({
      theme,
      frequency,
      relatedTags: Array.from(tagRelations.get(theme) || []),
    }))
    .sort((a, b) => b.frequency - a.frequency);

  // Generate insights
  const insights: DreamInsight[] = [];

  // Most common emotion
  const dominantMood = moodTrends[0];
  if (dominantMood) {
    insights.push({
      type: 'mood',
      title: 'Dominant Emotion',
      description: `Your dreams frequently express ${dominantMood.emotion}, appearing in ${dominantMood.frequency} dreams.`,
      value: dominantMood.frequency,
      trend: dominantMood.trend,
    });
  }

  // Most common theme
  const dominantTheme = recurringThemes[0];
  if (dominantTheme) {
    insights.push({
      type: 'theme',
      title: 'Recurring Theme',
      description: `"${dominantTheme.theme}" is a prominent theme in your dreams, often connected with ${dominantTheme.relatedTags.slice(0, 2).join(' and ')}.`,
      value: dominantTheme.frequency,
    });
  }

  // Emotional patterns
  const emotionalShift = moodTrends.find(mood => mood.trend !== 'stable');
  if (emotionalShift) {
    insights.push({
      type: 'pattern',
      title: 'Emotional Pattern',
      description: `Your dreams show a ${emotionalShift.trend} presence of ${emotionalShift.emotion}.`,
      trend: emotionalShift.trend,
    });
  }

  return {
    insights,
    moodTrends: moodTrends.slice(0, 5), // Top 5 moods
    recurringThemes: recurringThemes.slice(0, 5), // Top 5 themes
  };
}