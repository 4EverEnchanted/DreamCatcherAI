import React from 'react';
import { useDreamContext } from '../context/DreamContext';
import { useUserContext } from '../context/UserContext';
import { analyzeDreams } from '../services/dreamAnalysis';
import { TrendingUp, TrendingDown, Minus, Brain, BarChart as ChartBar, Hash } from 'lucide-react';

export default function DreamAnalysis() {
  const { dreams } = useDreamContext();
  const { user } = useUserContext();

  const userDreams = dreams.filter(dream => dream.userId === user?.id);
  const analysis = analyzeDreams(userDreams);

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

  return (
    <div className="space-y-8">
      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {analysis.insights.map((insight, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">{insight.title}</h3>
              {getTrendIcon(insight.trend)}
            </div>
            <p className="text-white/70">{insight.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mood Trends */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <div className="flex items-center mb-6">
            <Brain className="w-5 h-5 text-purple-400 mr-2" />
            <h3 className="text-xl font-semibold text-white">Mood Trends</h3>
          </div>
          <div className="space-y-4">
            {analysis.moodTrends.map((mood, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <ChartBar className="w-4 h-4 text-purple-400 mr-2" />
                  <span className="text-white/90 capitalize">{mood.emotion}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-white/70 mr-2">{mood.frequency}x</span>
                  {getTrendIcon(mood.trend)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recurring Themes */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <div className="flex items-center mb-6">
            <Hash className="w-5 h-5 text-purple-400 mr-2" />
            <h3 className="text-xl font-semibold text-white">Recurring Themes</h3>
          </div>
          <div className="space-y-4">
            {analysis.recurringThemes.map((theme, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white/90 capitalize">{theme.theme}</span>
                  <span className="text-white/70">{theme.frequency}x</span>
                </div>
                {theme.relatedTags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {theme.relatedTags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}