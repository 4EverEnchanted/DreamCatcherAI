import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDreamContext } from '../context/DreamContext';
import { Calendar, Clock, Tag, Share2, ArrowLeft } from 'lucide-react';

export default function DreamDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getDream } = useDreamContext();
  const navigate = useNavigate();
  const [dream, setDream] = useState(id ? getDream(id) : undefined);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  // If the dream isn't found, redirect to the gallery
  useEffect(() => {
    if (id && !dream) {
      navigate('/gallery');
    }
  }, [id, dream, navigate]);
  
  if (!dream) {
    return null;
  }
  
  const formattedDate = new Date(dream.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const formattedTime = new Date(dream.createdAt).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };
  
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
    setShowShareOptions(false);
  };
  
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-gradient-to-b from-black via-purple-950 to-indigo-950">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-8">
          <Link 
            to="/gallery" 
            className="inline-flex items-center text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Gallery
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Dream Image */}
          <div className="relative group">
            <div className="overflow-hidden rounded-2xl shadow-xl border border-white/10">
              <img 
                src={dream.imageUrl} 
                alt={dream.title}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            <button 
              onClick={handleShare}
              className="absolute bottom-4 right-4 p-3 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 text-white transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
            
            {showShareOptions && (
              <div className="absolute bottom-16 right-4 bg-gray-800/95 backdrop-blur-md rounded-lg shadow-xl p-3 w-48 border border-white/10">
                <button
                  onClick={copyLinkToClipboard}
                  className="w-full text-left py-2 px-3 hover:bg-white/10 text-white/90 rounded-md"
                >
                  Copy link to clipboard
                </button>
                <a 
                  href={`https://twitter.com/intent/tweet?text=Check out this dream: ${dream.title}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-left py-2 px-3 hover:bg-white/10 text-white/90 rounded-md"
                >
                  Share on Twitter
                </a>
              </div>
            )}
          </div>
          
          {/* Dream Details */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {dream.title}
            </h1>
            
            <div className="flex flex-wrap gap-y-3 gap-x-6 text-white/70 text-sm mb-6">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                {formattedDate}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-purple-400" />
                {formattedTime}
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-white/90 leading-relaxed whitespace-pre-line">
                {dream.description}
              </p>
            </div>
            
            {dream.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="flex items-center text-white mb-3 font-medium">
                  <Tag className="w-4 h-4 mr-2 text-purple-400" />
                  Dream Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {dream.tags.map(tag => (
                    <Link
                      key={tag}
                      to={`/gallery?tag=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-white/90 text-sm transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            <div className="border-t border-white/10 pt-6 mt-6">
              <h3 className="text-white mb-4 font-medium">Dream Analysis</h3>
              <p className="text-white/80 mb-6">
                This psychedelic visualization captures the essence of your dream, 
                highlighting the subconscious themes and emotions through color and form.
              </p>
              
              <Link
                to="/create"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-500 hover:to-indigo-500 transition-all"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Record Another Dream
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}