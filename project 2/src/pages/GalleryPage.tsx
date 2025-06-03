import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDreamContext } from '../context/DreamContext';
import DreamCard from '../components/DreamCard';
import { Search, Filter, Sparkles, Tag } from 'lucide-react';

const DREAM_CATEGORIES = {
  'Surreal': ['surreal', 'bizarre', 'strange', 'weird', 'abstract'],
  'Adventure': ['exploration', 'journey', 'quest', 'discovery', 'adventure'],
  'Emotional': ['joy', 'sadness', 'fear', 'anger', 'love', 'peace'],
  'Mystical': ['magic', 'spiritual', 'supernatural', 'cosmic', 'divine'],
  'Nature': ['mountains', 'ocean', 'forest', 'animals', 'landscape'],
  'Urban': ['city', 'buildings', 'streets', 'modern', 'urban']
};

export default function GalleryPage() {
  const { dreams, loading } = useDreamContext();
  const [filteredDreams, setFilteredDreams] = useState(dreams);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  
  const allTags = useMemo(() => 
    Array.from(new Set(dreams.flatMap(dream => dream.tags))).sort()
  , [dreams]);

  const dreamMatchesCategory = useCallback((dream: Dream, category: string) => {
    const categoryTags = DREAM_CATEGORIES[category as keyof typeof DREAM_CATEGORIES];
    return dream.tags.some(tag => categoryTags.includes(tag.toLowerCase())) ||
           dream.emotions.some(emotion => categoryTags.includes(emotion.toLowerCase()));
  }, []);
  
  const filterDreams = useCallback(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      let result = dreams;
      
      if (searchTerm) {
        const lowerSearchTerm = searchTerm.toLowerCase();
        result = result.filter(
          dream => 
            dream.title.toLowerCase().includes(lowerSearchTerm) ||
            dream.description.toLowerCase().includes(lowerSearchTerm)
        );
      }
      
      if (selectedTags.length > 0) {
        result = result.filter(dream => 
          selectedTags.every(tag => dream.tags.includes(tag))
        );
      }

      if (selectedCategories.length > 0) {
        result = result.filter(dream =>
          selectedCategories.some(category => dreamMatchesCategory(dream, category))
        );
      }
      
      setFilteredDreams(result);
      setIsAnimating(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [dreams, searchTerm, selectedTags, selectedCategories, dreamMatchesCategory]);
  
  useEffect(() => {
    filterDreams();
  }, [filterDreams]);
  
  const toggleTag = useCallback((tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  }, []);

  const toggleCategory = useCallback((category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  }, []);
  
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);
  
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-gradient-to-b from-black via-purple-950 to-indigo-950">
      <div className="container mx-auto">
        <div className="text-center mb-12 opacity-0 animate-[fadeInUp_0.6s_ease_forwards]">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Dream Art Gallery
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Explore a collection of dreams transformed into psychedelic artwork. 
            Each piece is a window into someone's subconscious world.
          </p>
        </div>
        
        <div className="mb-12 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-4 opacity-0 animate-[fadeInUp_0.6s_0.2s_ease_forwards]">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Search dreams..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
            </div>
            
            <div className="flex gap-4">
              <div className="relative w-full md:w-64">
                <details className="group w-full">
                  <summary className="flex justify-between items-center w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white cursor-pointer">
                    <div className="flex items-center">
                      <Tag className="w-5 h-5 mr-2 text-purple-400" />
                      <span>
                        {selectedTags.length 
                          ? `${selectedTags.length} tag${selectedTags.length > 1 ? 's' : ''} selected` 
                          : 'Filter by tags'}
                      </span>
                    </div>
                    <div className="border-l border-white/20 pl-2">
                      <svg width="20" height="20" className="transform group-open:rotate-180 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </summary>
                  <div className="absolute z-10 w-full mt-2 p-3 bg-gray-800/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl max-h-64 overflow-y-auto">
                    {allTags.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {allTags.map(tag => (
                          <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                              selectedTags.includes(tag)
                                ? 'bg-purple-600 text-white'
                                : 'bg-white/10 text-white/80 hover:bg-white/20'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-white/60 text-center py-2">No tags available</p>
                    )}
                  </div>
                </details>
              </div>

              <div className="relative w-full md:w-64">
                <details className="group w-full">
                  <summary className="flex justify-between items-center w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white cursor-pointer">
                    <div className="flex items-center">
                      <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
                      <span>
                        {selectedCategories.length 
                          ? `${selectedCategories.length} categor${selectedCategories.length > 1 ? 'ies' : 'y'} selected` 
                          : 'Dream Categories'}
                      </span>
                    </div>
                    <div className="border-l border-white/20 pl-2">
                      <svg width="20" height="20" className="transform group-open:rotate-180 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </summary>
                  <div className="absolute z-10 w-full mt-2 p-3 bg-gray-800/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl">
                    <div className="flex flex-wrap gap-2">
                      {Object.keys(DREAM_CATEGORIES).map(category => (
                        <button
                          key={category}
                          onClick={() => toggleCategory(category)}
                          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                            selectedCategories.includes(category)
                              ? 'bg-purple-600 text-white'
                              : 'bg-white/10 text-white/80 hover:bg-white/20'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>
          
          {/* Selected Filters Display */}
          {(selectedTags.length > 0 || selectedCategories.length > 0) && (
            <div className="mt-4 flex items-center">
              <span className="text-white/60 text-sm mr-3">Active filters:</span>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/30 text-white text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => toggleTag(tag)}
                      className="ml-1.5 text-white/70 hover:text-white"
                    >
                      &times;
                    </button>
                  </span>
                ))}
                {selectedCategories.map(category => (
                  <span
                    key={category}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/30 text-white text-sm"
                  >
                    {category}
                    <button
                      onClick={() => toggleCategory(category)}
                      className="ml-1.5 text-white/70 hover:text-white"
                    >
                      &times;
                    </button>
                  </span>
                ))}
                {(selectedTags.length > 0 || selectedCategories.length > 0) && (
                  <button
                    onClick={() => {
                      setSelectedTags([]);
                      setSelectedCategories([]);
                    }}
                    className="text-sm text-purple-400 hover:text-purple-300 ml-2"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredDreams.length > 0 ? (
          <div className="gallery-grid">
            {filteredDreams.map((dream, index) => (
              <div
                key={dream.id}
                className="gallery-item"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  opacity: isAnimating ? 0 : undefined
                }}
              >
                <DreamCard dream={dream} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 opacity-0 animate-[fadeInUp_0.6s_ease_forwards]">
            <h3 className="text-xl font-semibold text-white mb-2">No dreams found</h3>
            <p className="text-white/70 mb-6">
              {searchTerm || selectedTags.length > 0 || selectedCategories.length > 0
                ? "No dreams match your current filters. Try adjusting your search criteria."
                : "The dream gallery is empty. Be the first to add a dream!"}
            </p>
            {(searchTerm || selectedTags.length > 0 || selectedCategories.length > 0) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTags([]);
                  setSelectedCategories([]);
                }}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}