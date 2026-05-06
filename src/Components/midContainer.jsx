import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../utils/constants';
import video from "../image/video.mp4"

const MidContainer = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([...CATEGORIES.slice(0, 4), 'Shop all']);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(query(collection(db, "products"), limit(100)));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData);
        
        // Extract unique categories if needed, but let's stick to defaults for now
        // const uniqueCategories = [...new Set(productsData.map(p => p.categories))];
        // if (uniqueCategories.length > 0) setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = products.filter(p => {
    const pCat = p.categories?.toLowerCase() || '';
    const selCat = selectedCategory.toLowerCase();
    
    if (selCat === 'shop all') {
      return true; // Show everything
    }
    if (selCat === 'skincare') {
      return pCat === 'skincare' || pCat === 'skin';
    }
    if (selCat === 'haircare') {
      return pCat === 'haircare' || pCat === 'hair';
    }
    return pCat === selCat;
  });

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 mb-10 border-b border-gray-200">
        {categories.map((category) => (
          <button
            key={category}
            className={`py-3 px-4 md:px-6 text-lg md:text-xl font-medium font-classic transition-colors relative ${selectedCategory === category ? 'text-amber-800' : 'text-gray-500 hover:text-gray-900'}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
            {selectedCategory === category && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-800"></span>
            )}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-800"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((post) => (
              <div
                key={post.id}
                className="group flex flex-col bg-white rounded-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <Link to={`/product/${post.id}`} className="relative aspect-[3/4] overflow-hidden block bg-gray-50">
                  <img 
                    src={post.imgsrc} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </Link>
                
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-sm font-medium line-clamp-2 min-h-[2.5rem] mb-1">
                    <Link to={`/product/${post.id}`} className="hover:text-amber-700 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-amber-700 capitalize mb-3 line-clamp-1">{post.Highlight}</p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-semibold">{post.Price}</span>
                  </div>
                  
                  <button
                    onClick={() => addToCart(post)}
                    className="w-full mt-4 bg-gray-900 hover:bg-amber-800 text-white py-2 rounded transition-colors font-medium text-sm flex items-center justify-center gap-2"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No products found in this category.
            </div>
          )}
        </div>
      )}

      {/* Video Section */}
      <div className="w-full rounded-2xl overflow-hidden shadow-lg mt-12 bg-black aspect-video relative">
        <video 
          src={video} 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default MidContainer;
