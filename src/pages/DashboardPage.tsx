import React from 'react';
import { useUserContext } from '../context/UserContext';
import { useDreamContext } from '../context/DreamContext';
import SubscriptionPlans from '../components/SubscriptionPlans';
import DreamAnalysis from '../components/DreamAnalysis';
import CommunityInsights from '../components/CommunityInsights';
import { User, Settings, Image, Lock, Share2 } from 'lucide-react';

export default function DashboardPage() {
  const { user, updateUser } = useUserContext();
  const { dreams } = useDreamContext();
  
  const userDreams = dreams.filter(dream => dream.userId === user?.id);

  const toggleShareInsights = () => {
    if (user) {
      updateUser({
        ...user,
        shareInsights: !user.shareInsights
      });
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-gradient-to-b from-black via-purple-950 to-indigo-950">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Dashboard
          </h1>
          <p className="text-white/70">
            Manage your account, subscription, and dream collection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center mb-4">
              <User className="w-5 h-5 text-purple-400 mr-2" />
              <h2 className="text-xl font-semibold text-white">Profile</h2>
            </div>
            <div className="space-y-2">
              <p className="text-white/80">{user?.name}</p>
              <p className="text-white/60">{user?.email}</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center mb-4">
              <Settings className="w-5 h-5 text-purple-400 mr-2" />
              <h2 className="text-xl font-semibold text-white">Subscription</h2>
            </div>
            <div className="space-y-2">
              <p className="text-white/80">
                {user?.subscription === 'premium' ? 'Premium Tier' : 'Free Tier'}
              </p>
              {user?.subscription === 'free' && (
                <p className="text-white/60">
                  {user?.generationsLeft} generations remaining
                </p>
              )}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center mb-4">
              <Image className="w-5 h-5 text-purple-400 mr-2" />
              <h2 className="text-xl font-semibold text-white">Dreams</h2>
            </div>
            <div className="space-y-2">
              <p className="text-white/80">{userDreams.length} dreams created</p>
              <p className="text-white/60">
                {userDreams.filter(d => d.isPublic).length} public dreams
              </p>
            </div>
          </div>
        </div>

        {/* Dream Analysis Section */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 md:p-8 border border-white/10 mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">
              Dream Analysis
            </h2>
            {user?.subscription === 'premium' && (
              <div className="flex items-center">
                <Share2 className="w-5 h-5 text-purple-400 mr-2" />
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={user.shareInsights}
                    onChange={toggleShareInsights}
                    className="sr-only"
                  />
                  <div className={`w-10 h-6 rounded-full transition-colors ${
                    user.shareInsights ? 'bg-purple-600' : 'bg-gray-600'
                  } mr-3 relative`}>
                    <div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                      user.shareInsights ? 'translate-x-5' : 'translate-x-1'
                    }`}></div>
                  </div>
                  <span className="text-white/90">Share anonymized insights</span>
                </label>
              </div>
            )}
          </div>
          
          {user?.subscription === 'premium' ? (
            userDreams.length > 0 ? (
              <DreamAnalysis />
            ) : (
              <div className="text-center py-8 text-white/70">
                Record your first dream to see advanced analysis and insights.
              </div>
            )
          ) : (
            <div className="text-center py-8">
              <Lock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Premium Feature
              </h3>
              <p className="text-white/70 mb-6">
                Upgrade to Premium to unlock advanced dream analysis, including mood trends,
                recurring themes, and personalized insights.
              </p>
              <button
                onClick={() => document.getElementById('subscription-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 transition-all"
              >
                Upgrade to Premium
              </button>
            </div>
          )}
        </div>

        {/* Community Insights Section */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 md:p-8 border border-white/10 mb-12">
          <CommunityInsights />
        </div>

        <div id="subscription-section" className="bg-white/5 backdrop-blur-lg rounded-xl p-6 md:p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-8">
            Subscription Plans
          </h2>
          <SubscriptionPlans />
        </div>
      </div>
    </div>
  );
}