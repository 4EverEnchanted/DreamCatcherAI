import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Moon, MenuIcon, X, User, LogOut } from 'lucide-react';
import { useUserContext } from '../context/UserContext';
import NotificationCenter from './NotificationCenter';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, logout, isAuthenticated } = useUserContext();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <header className="fixed w-full z-10 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Moon className="w-8 h-8 text-indigo-400" />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 text-transparent bg-clip-text">
            Dream Catcher
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/create">Create Dream</NavLink>
          <NavLink to="/gallery">Dream Gallery</NavLink>
          <NavLink to="/about">About</NavLink>
          {isAuthenticated ? (
            <>
              {user?.subscription === 'premium' && <NotificationCenter />}
              <Link 
                to="/dashboard" 
                className="flex items-center px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <User className="w-4 h-4 mr-2" />
                {user?.subscription === 'free' ? `${user.generationsLeft} left` : 'Dashboard'}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center text-white/90 hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="flex items-center px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Link>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          {isAuthenticated && user?.subscription === 'premium' && <NotificationCenter />}
          <button 
            className="text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-black/90 to-purple-900/90 backdrop-blur-lg">
          <nav className="flex flex-col px-4 py-4 space-y-4">
            <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink to="/create" onClick={() => setIsMenuOpen(false)}>Create Dream</MobileNavLink>
            <MobileNavLink to="/gallery" onClick={() => setIsMenuOpen(false)}>Dream Gallery</MobileNavLink>
            <MobileNavLink to="/about" onClick={() => setIsMenuOpen(false)}>About</MobileNavLink>
            {isAuthenticated ? (
              <>
                <MobileNavLink to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {user?.subscription === 'free' ? `${user.generationsLeft} generations left` : 'Dashboard'}
                  </div>
                </MobileNavLink>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center text-white/90 hover:text-white py-2"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <MobileNavLink to="/auth" onClick={() => setIsMenuOpen(false)}>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </div>
              </MobileNavLink>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link 
      to={to} 
      className="text-white/90 hover:text-white font-medium hover:underline decoration-indigo-400 underline-offset-4 transition-all"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, onClick, children }: { to: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className="text-white/90 hover:text-white font-medium text-lg py-2 block border-b border-white/10"
    >
      {children}
    </Link>
  );
}