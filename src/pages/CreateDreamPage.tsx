import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDreamContext } from '../context/DreamContext';
import { useUserContext } from '../context/UserContext';
import { generateDreamArt } from '../services/artGenerator';
import { Sparkles, Loader, XCircle, Tag, ImageIcon, Heart, Lock } from 'lucide-react';

const EMOTIONS = [
  'joy', 'sadness', 'fear', 'anger', 'surprise',
  'love', 'peace', 'anxiety', 'confusion',
  'excitement', 'wonder', 'surreal', 'nostalgia'
];

export default function CreateDreamPage() {
  const { user, canGenerateArt, decrementGenerations } = useUserContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [emotions, setEmotions] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  
  const [generatingArt, setGeneratingArt] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [error, setError] = useState('');
  
  const { addDream } = useDreamContext();
  const navigate = useNavigate();
  
  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const toggleEmotion = (emotion: string) => {
    setEmotions(prev => 
      prev.includes(emotion)
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    );
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description) {
      setError('Please provide both a title and description for your dream');
      return;
    }

    if (!canGenerateArt()) {
      setError('You have reached your generation limit. Please upgrade to premium for unlimited generations.');
      return;
    }
    
    try {
      setGeneratingArt(true);
      setError('');
      
      const imageUrl = await generateDreamArt(description);
      setGeneratedImageUrl(imageUrl);
      
      decrementGenerations();
      
      addDream({
        title,
        description,
        imageUrl,
        tags,
        emotions,
        isPublic,
        userId: user?.id,
      });
      
      navigate('/gallery');
      
    } catch (err) {
      setError('Failed to generate dream art. Please try again.');
      console.error(err);
    } finally {
      setGeneratingArt(false);
    }
  };
  
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-gradient-to-b from-black via-purple-950 to-indigo-950">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Capture Your Dream
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Describe your dream in detail, and our AI will transform it into a unique piece of psychedelic artwork.
          </p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center text-white">
                <XCircle className="w-5 h-5 mr-2 text-red-400" />
                {error}
              </div>
            )}
            
            <div className="mb-6">
              <label htmlFor="title" className="block text-white/90 mb-2 font-medium">
                Dream Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                placeholder="Enter a title for your dream..."
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="description" className="block text-white/90 mb-2 font-medium">
                Dream Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                placeholder="Describe your dream in as much detail as possible. Include colors, emotions, scenes, characters, and anything else you remember..."
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-white/90 mb-2 font-medium">
                Dream Emotions
              </label>
              <div className="flex flex-wrap gap-2">
                {EMOTIONS.map((emotion) => (
                  <button
                    key={emotion}
                    type="button"
                    onClick={() => toggleEmotion(emotion)}
                    className={`px-4 py-2 rounded-full transition-colors flex items-center gap-2 ${
                      emotions.includes(emotion)
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${
                      emotions.includes(emotion) ? 'fill-current' : ''
                    }`} />
                    {emotion}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-white/90 mb-2 font-medium">
                Dream Tags
              </label>
              <div className="flex items-center space-x-2">
                <div className="flex-grow relative">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    placeholder="Add tags (themes, symbols, etc.)..."
                  />
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                </div>
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
              
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/30 text-white text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1.5 text-white/70 hover:text-white"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="mb-8">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={() => setIsPublic(!isPublic)}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors ${
                  isPublic ? 'bg-purple-600' : 'bg-gray-600'
                } mr-3 relative`}>
                  <div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                    isPublic ? 'translate-x-5' : 'translate-x-1'
                  }`}></div>
                </div>
                <span className="text-white/90">Make this dream public in the gallery</span>
              </label>
            </div>
            
            <div className="text-center">
              {!canGenerateArt() ? (
                <div className="mb-6 p-4 bg-purple-500/20 border border-purple-500/30 rounded-lg flex items-center justify-center text-white">
                  <Lock className="w-5 h-5 mr-2 text-purple-400" />
                  <span>
                    You've reached your free tier limit. 
                    <Link to="/dashboard\" className="ml-2 underline text-purple-400">
                      Upgrade to Premium
                    </Link>
                  </span>
                </div>
              ) : null}
              
              <button
                type="submit"
                disabled={generatingArt || !canGenerateArt()}
                className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:from-purple-500 hover:to-indigo-500 transition-all hover:shadow-lg hover:shadow-purple-600/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center w-full md:w-auto md:mx-auto"
              >
                {generatingArt ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Generating Dream Art...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Dream Art
                    {user?.subscription === 'free' && (
                      <span className="ml-2 text-sm opacity-80">
                        ({user.generationsLeft} left)
                      </span>
                    )}
                  </>
                )}
              </button>
            </div>
          </form>
          
          {(generatingArt || generatedImageUrl) && (
            <div className="mt-10 border-t border-white/10 pt-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <ImageIcon className="w-5 h-5 mr-2 text-purple-400" />
                Dream Visualization
              </h3>
              
              <div className="bg-white/5 rounded-lg p-4 flex items-center justify-center">
                {generatingArt ? (
                  <div className="py-16 flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-white/70">Visualizing your dream...</p>
                  </div>
                ) : generatedImageUrl ? (
                  <img
                    src={generatedImageUrl}
                    alt="Generated Dream Art"
                    className="rounded-lg max-h-[400px] w-auto shadow-lg"
                  />
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}