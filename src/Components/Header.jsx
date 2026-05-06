import React, { useState, useEffect } from 'react';
import { IoIosSearch } from "react-icons/io";
import { MdShoppingBasket, MdMenu, MdClose } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';

const navLinks = [
  { name: 'Skin', path: '/category/skin' },
  { name: 'Hair', path: '/category/hair' },
  { name: 'Bath & Body', path: '/category/bath-body' },
  { name: 'Natural Makeup', path: '/category/natural-makeup' },
  { name: 'Pure Fragrances', path: '/category/pure-fragrances' },
  { name: 'Offers', path: '/category/offers' },
  { name: 'Gifting', path: '/category/gifting' },
  { name: 'Build a Box', path: '/category/build-a-box' },
  { name: 'Beauty Sale', path: '/category/beauty-sale' },
];

const Header = () => {
  const { toggleCart, getCartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Search state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsProfileOpen(false);
  }, [navigate]);

  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.trim() === '') {
        setSearchResults([]);
        return;
      }
      try {
        const q = query(collection(db, "products")); // Simplified, could use more complex search logic
        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(item => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.Highlight?.toLowerCase().includes(searchQuery.toLowerCase())
          );
        setSearchResults(results);
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    const timeoutId = setTimeout(searchProducts, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <>
      <header className={`fixed top-[36px] w-full z-30 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-white py-4'}`}>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 -ml-2 text-gray-700 hover:text-amber-700"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <MdMenu className="text-2xl" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-amber-900 font-classic text-2xl md:text-3xl font-bold tracking-tight">
                PureHerbHaven
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1 lg:space-x-4">
              {navLinks.slice(0, 5).map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className="text-gray-800 hover:text-amber-700 px-2 py-2 rounded-md text-sm font-medium uppercase tracking-wide transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="hidden lg:flex space-x-4">
                  {navLinks.slice(5).map((link) => (
                    <Link 
                      key={link.name} 
                      to={link.path}
                      className="text-gray-800 hover:text-amber-700 px-2 py-2 rounded-md text-sm font-medium uppercase tracking-wide transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
              </div>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-700 hover:text-amber-700 transition-colors"
              >
                <IoIosSearch className="text-2xl" />
              </button>
              
              <button 
                onClick={toggleCart}
                className="p-2 text-gray-700 hover:text-amber-700 transition-colors relative"
              >
                <MdShoppingBasket className="text-2xl" />
                {getCartCount() > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-amber-700 rounded-full">
                    {getCartCount()}
                  </span>
                )}
              </button>

              {user ? (
                <div className="relative ml-2">
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold border border-amber-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {user.initials}
                  </button>
                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50"
                      >
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{user.name || 'User'}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email || 'user@example.com'}</p>
                        </div>
                        <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-900">My Profile</Link>
                        <Link to="/orders" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-900">My Orders</Link>
                        <Link to="/admin" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 text-sm font-medium text-amber-700 hover:bg-amber-50">Admin Dashboard</Link>
                        <button 
                          onClick={() => {
                            setIsProfileOpen(false);
                            logout();
                            navigate('/');
                          }} 
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link to="/login" className="hidden sm:block ml-2 px-4 py-1.5 text-sm font-medium text-amber-900 border border-amber-700 rounded-full hover:bg-amber-50 transition-colors">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
              />
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-white shadow-xl z-50 md:hidden flex flex-col"
              >
                <div className="p-4 flex items-center justify-between border-b">
                  <span className="font-classic text-xl font-bold text-amber-800">Menu</span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                    <MdClose className="text-2xl" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto py-4">
                  <div className="px-4 pb-4 mb-4 border-b">
                    {!user && (
                      <div className="flex gap-2">
                          <Link to="/login" className="flex-1 text-center py-2 bg-amber-50 text-amber-900 rounded-md font-medium">Login</Link>
                          <Link to="/signup" className="flex-1 text-center py-2 bg-amber-800 text-white rounded-md font-medium">Sign Up</Link>
                      </div>
                    )}
                    {user && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg">
                          {user.initials}
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <nav className="px-2 space-y-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className="block px-3 py-3 rounded-md text-base font-medium text-gray-900 hover:bg-amber-50 hover:text-amber-800"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Search Fullscreen Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-50 overflow-y-auto pt-8 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-screen-xl mx-auto flex flex-col h-full">
              {/* Search Bar */}
              <div className="flex items-center border-b-2 border-gray-200 pb-4">
                <IoIosSearch className="text-3xl text-gray-400 mr-4" />
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Search for products, categories..." 
                  className="flex-1 text-2xl md:text-4xl font-light outline-none text-gray-800 placeholder-gray-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="ml-4 p-2 text-gray-500 hover:bg-gray-100 rounded-full transition"
                >
                  <MdClose className="text-3xl" />
                </button>
              </div>

              {/* Results */}
              <div className="flex-1 py-8">
                {searchQuery && searchResults.length === 0 && (
                  <div className="text-center text-gray-500 mt-10">
                    <p className="text-xl">No results found for "{searchQuery}"</p>
                  </div>
                )}
                {searchResults.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-6 uppercase tracking-wider">Products</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {searchResults.map((product) => (
                        <Link 
                          key={product.id} 
                          to={`/product/${product.id}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-center gap-4 group p-2 hover:bg-gray-50 rounded-lg transition"
                        >
                          <img src={product.imgsrc} alt={product.title} className="w-16 h-20 object-cover rounded" />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-amber-700 line-clamp-2">{product.title}</h4>
                            <p className="text-xs text-gray-500 mt-1">{product.Price}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;