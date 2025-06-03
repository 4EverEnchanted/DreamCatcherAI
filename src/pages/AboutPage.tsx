import React from 'react';
import { Moon, CloudMoon, BrainCircuit, Paintbrush, Share2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-gradient-to-b from-black via-purple-950 to-indigo-950">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            About Dream Catcher
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Transforming the ethereal world of dreams into tangible visual art through the magic of AI.
          </p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 md:p-8 mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-indigo-600">
              <Moon className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-white/80 leading-relaxed">
              Dream Catcher was created with a simple yet profound mission: to help people visualize and preserve their dreams. 
              Dreams are fleeting experiences that often fade from memory shortly after waking. 
              By transforming these ephemeral moments into permanent artwork, we hope to help people 
              better understand their subconscious mind and create meaningful connections with their inner selves.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                <CloudMoon className="w-5 h-5 mr-2 text-purple-400" />
                The Science of Dreams
              </h3>
              <p className="text-white/80">
                Dreams have fascinated humans for millennia. Modern science tells us that dreams play a crucial role in 
                processing emotions, consolidating memories, and working through problems. By recording and visualizing 
                your dreams, you gain insight into your subconscious patterns and thought processes.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                <BrainCircuit className="w-5 h-5 mr-2 text-purple-400" />
                AI Visualization Technology
              </h3>
              <p className="text-white/80">
                Our platform uses advanced AI algorithms to analyze your dream descriptions and transform them into 
                unique psychedelic artwork. The AI considers emotional tone, themes, symbols, and narrative elements 
                to create a visual representation that captures the essence of your dream experience.
              </p>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">How to Use Dream Catcher</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-600/20 text-purple-400 mb-3">
                  <Paintbrush className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Create</h3>
                <p className="text-white/70 text-sm">
                  Record your dream while it's fresh in your memory. Include as many details as possible 
                  to create a more accurate visualization.
                </p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-600/20 text-indigo-400 mb-3">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Visualize</h3>
                <p className="text-white/70 text-sm">
                  Our AI transforms your dream description into a unique piece of psychedelic artwork 
                  that captures the essence and emotions of your dream.
                </p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-600/20 text-pink-400 mb-3">
                  <Share2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Share</h3>
                <p className="text-white/70 text-sm">
                  Save your dream to your personal collection, or share it with others to compare 
                  dream experiences and interpretations.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Ready to capture your dreams?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/create" 
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:from-purple-500 hover:to-indigo-500 transition-all hover:shadow-lg hover:shadow-purple-600/20"
            >
              Record a Dream
            </a>
            <a 
              href="/gallery" 
              className="px-8 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium hover:bg-white/20 transition-all"
            >
              Explore Dream Gallery
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}