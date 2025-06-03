import React from 'react';
import { useUserContext } from '../context/UserContext';
import { useDreamContext } from '../context/DreamContext';
import { analyzeDreams } from '../services/dreamAnalysis';
import { TrendingUp, TrendingDown, Minus, Brain, Users, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CommunityInsights() {
  const { dreams } = useDreamContext();
  const { user } = useUserContext();

  // Get all public insights from premium users
  const publicInsights = dreams
    .filter(dream => dream.isPublic && dream.shareInsights)
    .reduce((acc, dream) => {
      if (!acc[dream.userId!]) {
        acc[dream.userId!] = [];
      }
      acc[dream.userId!].push(dream);
      return acc;
    }, {} as Record<string, typeof dreams>);

  const communityAnalyses = Object.values(publicInsights).map(userDreams => 
    analyzeDreams(userDreams)
  );

  const getTrendIcon = (trend?: 'increasing' | 'decreasing' | 'stable') => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'decreasing':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  // Aggregate community trends
  const aggregatedMoods = new Map();
  const aggregatedThemes = new Map();

  communityAnalyses.forEach(analysis => {
    analysis.moodTrends.forEach(mood => {
      if (!aggregatedMoods.has(mood.emotion)) {
        aggregatedMoods.set(mood.emotion, { count: 0, increasing: 0, decreasing: 0 });
      }
      const current = aggregatedMoods.get(mood.emotion);
      current.count++;
      if (mood.trend === 'increasing') current.increasing++;
      if (mood.trend === 'decreasing') current.decreasing++;
    });

    analysis.recurringThemes.forEach(theme => {
      if (!aggregatedThemes.has(theme.theme)) {
        aggregatedThemes.set(theme.theme, 0);
      }
      aggregatedThemes.set(theme.theme, aggregatedThemes.get(theme.theme) + 1);
    });
  });

  const topCommunityMoods = Array.from(aggregatedMoods.entries())
    .map(([emotion, data]) => ({
      emotion,
      count: data.count,
      trend: data.increasing > data.decreasing ? 'increasing' : 
             data.decreasing > data.increasing ? 'decreasing' : 'stable'
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const topCommunityThemes = Array.from(aggregatedThemes.entries())
    .map(([theme, count]) => ({ theme, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  if (!user?.subscription === 'premium') {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl font-semibold text-white mb-2">
          Premium Feature
        </h3>
        <p className="text-white/70 mb-6">
          Upgrade to Premium to access community insights and contribute your own dream patterns.
        </p>
        <Link
          to="/dashboard"
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 transition-all"
        >
          Upgrade to Premium
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Users className="w-6 h-6 text-purple-400 mr-2" />
          <h2 className="text-2xl font-bold text-white">Community Insights</h2>
        </div>
        <a
          href="https://www.mentalhealth.gov/get-help"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
        >
          Mental Health Resources
          <ExternalLink className="w-4 h-4 ml-1" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Community Mood Trends */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <div className="flex items-center mb-6">
            <Brain className="w-5 h-5 text-purple-400 mr-2" />
            <h3 className="text-xl font-semibold text-white">Community Mood Trends</h3>
          </div>
          <div className="space-y-4">
            {topCommunityMoods.map((mood, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-white/90 capitalize">{mood.emotion}</span>
                <div className="flex items-center">
                  <span className="text-white/70 mr-2">{mood.count} dreamers</span>
                  {getTrendIcon(mood.trend)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Themes */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <div className="flex items-center mb-6">
            <Users className="w-5 h-5 text-purple-400 mr-2" />
            <h3 className="text-xl font-semibold text-white">Popular Dream Themes</h3>
          </div>
          <div className="space-y-4">
            {topCommunityThemes.map((theme, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-white/90 capitalize">{theme.theme}</span>
                <span className="text-white/70">{theme.count} dreamers</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-white/60 text-sm">
        All insights are anonymized and aggregated from users who have opted to share their dream patterns.
      </div>
    </div>
  );
}