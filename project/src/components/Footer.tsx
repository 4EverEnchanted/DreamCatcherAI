import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Github, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black/70 backdrop-blur-md border-t border-white/10 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Moon className="w-6 h-6 text-indigo-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 text-transparent bg-clip-text">
                Dream Catcher
              </span>
            </Link>
            <p className="text-white/70 mb-6">
              Transform your subconscious adventures into psychedelic artwork.
              Document, visualize, and share your dreams with the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/70 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/create" className="text-white/70 hover:text-white transition-colors">Create Dream</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-white/70 hover:text-white transition-colors">Dream Gallery</Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-white transition-colors">About</Link>
              </li>
            </ul>
          </div>
          
          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Cookie Policy</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Dream Catcher. All rights reserved.
          </p>
          <p className="text-white/60 text-sm">
            Made with ✨ imagination and 🧠 AI technology
          </p>
        </div>
      </div>
    </footer>
  );
}