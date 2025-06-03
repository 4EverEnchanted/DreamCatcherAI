import React, { memo, useState, useCallback } from 'react';
import { Dream } from '../types';
import { Link } from 'react-router-dom';
import { Share2, Heart, X, Mail, Twitter, Github, Instagram } from 'lucide-react';
import LazyImage from './LazyImage';

interface DreamCardProps {
  dream: Dream;
}

const DreamCard = memo(({ dream }: DreamCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  
  const formattedDate = new Date(dream.createdAt).toLocaleDateString();
  
  const handleShare = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowShareMenu(prev => !prev);
  }, []);

  const handleSharePlatform = useCallback((e: React.MouseEvent, platform: string) => {
    e.preventDefault();
    e.stopPropagation();

    const shareUrl = window.location.origin + `/dream/${dream.id}`;
    const shareText = `Check out this dream: ${dream.title}`;
    
    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'github':
        url = `https://github.com/login?return_to=${encodeURIComponent(shareUrl)}`;
        break;
      case 'instagram':
        url = 'https://instagram.com';
        break;
      case 'email':
        url = `mailto:?subject=${encodeURIComponent(`Dream: ${dream.title}`)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
        break;
    }

    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    setShowShareMenu(false);
  }, [dream]);

  const handleCopyLink = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const shareUrl = window.location.origin + `/dream/${dream.id}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
    setShowShareMenu(false);
  }, [dream.id]);
  
  return (
    <div 
      className="relative rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/dream/${dream.id}`} className="block h-full">
        <div className="relative aspect-square overflow-hidden">
          <LazyImage 
            src={dream.imageUrl} 
            alt={dream.title}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
          
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-60'
          }`}></div>
          
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {dream.tags.slice(0, 2).map((tag) => (
              <span 
                key={tag} 
                className="px-2 py-1 text-xs rounded-full bg-purple-600/80 text-white backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-500">
            <h3 className="text-xl font-bold text-white mb-1">{dream.title}</h3>
            <p className="text-white/80 text-sm line-clamp-2 mb-2">
              {dream.description}
            </p>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/60">
                {formattedDate}
              </span>
              
              <div className="flex space-x-2">
                <button className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white">
                  <Heart size={14} />
                </button>
                <button 
                  onClick={handleShare}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white relative"
                >
                  <Share2 size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Share Menu */}
      {showShareMenu && (
        <div className="absolute bottom-16 right-4 bg-black/90 backdrop-blur-md rounded-lg shadow-xl border border-white/10 p-2 min-w-[200px] z-50">
          {/* Share menu content */}
        </div>
      )}
    </div>
  );
});

DreamCard.displayName = 'DreamCard';
export default DreamCard;