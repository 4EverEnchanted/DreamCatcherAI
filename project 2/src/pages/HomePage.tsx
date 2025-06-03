import React from 'react';
import { Link } from 'react-router-dom';
import { useDreamContext } from '../context/DreamContext';
import DreamCard from '../components/DreamCard';
import { Sparkles } from 'lucide-react';

export default function HomePage() {
  const { dreams } = useDreamContext();
  const recentDreams = dreams.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-indigo-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-purple-600 rounded-full opacity-20 blur-[100px]"></div>
          <div className="absolute top-40 -left-10 w-80 h-80 bg-indigo-600 rounded-full opacity-20 blur-[100px]"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-pink-600 rounded-full opacity-20 blur-[100px]"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-sm font-medium text-white/90">Transform your dreams into art</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 text-transparent bg-clip-text">
                Capture Your Dreams,
              </span>
              <br />
              See Them Come To Life
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Dream Catcher transforms your subconscious adventures into stunning psychedelic artwork. 
              Document, visualize, and share your dreams with the world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/create" 
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:from-purple-500 hover:to-indigo-500 transition-all hover:shadow-lg hover:shadow-purple-600/20"
              >
                Generate Dream Art
              </Link>
              <Link 
                to="/gallery" 
                className="px-8 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium hover:bg-white/20 transition-all"
              >
                Explore Dream Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Recent Dreams Section */}
      {recentDreams.length > 0 && (
        <section className="py-16 px-4 bg-gradient-to-b from-indigo-950 to-black">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold text-white">Recent Dreams</h2>
              <Link 
                to="/gallery" 
                className="text-indigo-400 hover:text-indigo-300 font-medium"
              >
                View all dreams →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentDreams.map(dream => (
                <DreamCard key={dream.id} dream={dream} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* How It Works Section */}
      <section className="py-20 px-4 bg-black relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <h2 className="text-3xl font-bold text-white text-center mb-16">How Dream Catcher Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 transition-transform hover:translate-y-[-5px]">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-600/20 text-purple-400 mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Record Your Dream</h3>
              <p className="text-white/70">
                Write down the details of your dream while they're still fresh in your mind.
                Include emotions, colors, characters, and anything else you remember.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 transition-transform hover:translate-y-[-5px]">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-600/20 text-indigo-400 mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Generate Dream Art</h3>
              <p className="text-white/70">
                Our AI analyzes your dream description and transforms it into a unique piece of
                psychedelic artwork that captures the essence of your subconscious.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 transition-transform hover:translate-y-[-5px]">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-600/20 text-pink-400 mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Save & Share</h3>
              <p className="text-white/70">
                Add your dream and its artwork to your personal collection. Share your dreams with
                friends or keep them private in your dream journal.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-purple-950">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to visualize your dreams?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Join thousands of dreamers who've transformed their subconscious journeys into beautiful art.
          </p>
          <Link 
            to="/create" 
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:from-purple-500 hover:to-indigo-500 transition-all hover:shadow-lg hover:shadow-purple-600/20"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Bolt.new Badge */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 transition-transform hover:scale-105 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 backdrop-blur-sm p-2 rounded-lg">
        <a
          href="https://bolt.new"
          target="_blank"
          rel="noopener"
          className="block"
          aria-label="Built with Bolt.new"
        >
          <span className="text-white/80 hover:text-white/100 transition-colors font-psychedelic text-sm">
            Built with Bolt.new
          </span>
        </a>
      </div>
    </div>
  );
}