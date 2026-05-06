import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useCart } from '../context/CartContext';
import Footer from '../Components/Footer';
import { CATEGORIES, FINISHES, SKIN_TYPES } from '../utils/constants';

// A reusable accordion filter section component
const FilterSection = ({ title, options, selectedOptions = [], onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="w-full py-4 border-b">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-lg font-medium flex items-center justify-between w-full capitalize hover:text-amber-700 transition-colors"
            >
                <span>{title}</span>
                {isOpen ? <MdOutlineKeyboardArrowUp className="text-xl" /> : <MdOutlineKeyboardArrowDown className="text-xl" />}
            </button>
            {isOpen && (
                <div className="mt-4 space-y-2">
                    {options.map((option, index) => (
                        <label key={index} className="flex items-center space-x-3 cursor-pointer group">
                            <input 
                                type="checkbox" 
                                checked={selectedOptions.includes(option)}
                                onChange={() => onChange(title.toLowerCase().replace(' ', ''), option)}
                                className="form-checkbox h-4 w-4 text-amber-700 rounded border-gray-300 focus:ring-amber-500" 
                            />
                            <span className="text-gray-600 group-hover:text-amber-900 transition-colors">{option}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

const CategoryPage = () => {
    const { categoryName } = useParams();
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFilters, setSelectedFilters] = useState({
        categories: [],
        finish: [],
        coverage: [],
        skintone: [],
        formulation: [],
        skintype: [],
        preference: []
    });
    const [sortType, setSortType] = useState('default');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const productsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Filter Options
    const filterOptions = {
        categories: CATEGORIES,
        finish: FINISHES,
        skintype: SKIN_TYPES,
        preference: ['Vegan', 'Cruelty Free', 'Organic', 'Paraben Free']
    };

    const handleFilterChange = (filterCategory, option) => {
        setSelectedFilters(prev => {
            const currentSelected = prev[filterCategory] || [];
            const isSelected = currentSelected.includes(option);
            const newSelected = isSelected 
                ? currentSelected.filter(item => item !== option)
                : [...currentSelected, option];
            
            return {
                ...prev,
                [filterCategory]: newSelected
            };
        });
    };

    // Derived State for Filtered and Sorted Products
    const filteredAndSortedProducts = React.useMemo(() => {
        let result = [...products];

        // Apply URL category filter if present
        if (categoryName) {
            const urlCat = categoryName.toLowerCase();
            if (urlCat !== 'shop-all') {
                result = result.filter(p => {
                    const pCat = p.categories?.toLowerCase() || '';
                    if (urlCat === 'skincare') return pCat === 'skincare' || pCat === 'skin';
                    if (urlCat === 'haircare') return pCat === 'haircare' || pCat === 'hair';
                    
                    // Default slug matching
                    return pCat.replace(/ & /g, '-').replace(/ /g, '-') === urlCat;
                });
            }
        }

        // Apply sidebar filters
        Object.keys(selectedFilters).forEach(filterKey => {
            const selectedOptions = selectedFilters[filterKey];
            if (selectedOptions.length > 0) {
                result = result.filter(product => {
                    const productValue = product[filterKey];
                    if (!productValue) return false; 
                    
                    const pValue = productValue.toString().toLowerCase();
                    return selectedOptions.some(option => {
                        const opt = option.toLowerCase();
                        if (filterKey === 'categories') {
                            if (opt === 'skincare') return pValue === 'skincare' || pValue === 'skin';
                            if (opt === 'haircare') return pValue === 'haircare' || pValue === 'hair';
                        }
                        return pValue === opt;
                    });
                });
            }
        });

        // Apply sorting
        if (sortType === 'price-low-high') {
            result.sort((a, b) => (a.priceNum || 0) - (b.priceNum || 0));
        } else if (sortType === 'price-high-low') {
            result.sort((a, b) => (b.priceNum || 0) - (a.priceNum || 0));
        } else if (sortType === 'a-z') {
            result.sort((a, b) => a.title.localeCompare(b.title));
        }

        return result;
    }, [products, selectedFilters, sortType, categoryName]);

    return (
        <div className="w-full min-h-screen flex flex-col pt-12">
            {/* Header Banner */}
            <div className="w-full h-48 bg-amber-50 flex items-center justify-center border-b mt-4">
                <h1 className="text-4xl font-classic font-semibold capitalize text-amber-900 tracking-wide">
                    {categoryName?.replace('-', ' ') || 'Category'}
                </h1>
            </div>

            <div className="w-full flex-1 flex flex-col md:flex-row max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                {/* Sidebar - Filters (Only visible on Shop All) */}
                {categoryName === 'shop-all' && (
                    <aside className="w-full md:w-64 flex-shrink-0 md:mr-8 mb-8 md:mb-0 animate-fade-in">
                        <h2 className="text-xl font-classic font-semibold mb-6">Filters</h2>
                        <div className="bg-white rounded-lg sticky top-32">
                            <FilterSection title="Categories" options={filterOptions.categories} selectedOptions={selectedFilters.categories} onChange={handleFilterChange} />
                            <FilterSection title="Finish" options={filterOptions.finish} selectedOptions={selectedFilters.finish} onChange={handleFilterChange} />
                            <FilterSection title="Skin Type" options={filterOptions.skintype} selectedOptions={selectedFilters.skintype} onChange={handleFilterChange} />
                            <FilterSection title="Preference" options={filterOptions.preference} selectedOptions={selectedFilters.preference} onChange={handleFilterChange} />
                        </div>
                    </aside>
                )}

                {/* Main Content */}
                <main className="flex-1 flex flex-col">
                    {/* Top Bar - Sort & Results */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b">
                        <span className="text-gray-600 mb-4 sm:mb-0">{filteredAndSortedProducts.length} Products Found</span>
                        
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">Sort by:</span>
                            <select 
                                value={sortType} 
                                onChange={(e) => setSortType(e.target.value)}
                                className="border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
                            >
                                <option value="default">Featured</option>
                                <option value="price-low-high">Price: Low to High</option>
                                <option value="price-high-low">Price: High to Low</option>
                                <option value="a-z">Alphabetical: A-Z</option>
                            </select>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredAndSortedProducts.map((product) => (
                            <div key={product.id} className="group flex flex-col bg-white rounded-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                                <Link to={`/product/${product.id}`} className="relative h-64 overflow-hidden block">
                                    <img 
                                        src={product.imgsrc} 
                                        alt={product.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                    />
                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="bg-white text-black px-4 py-2 rounded shadow font-medium text-sm">Quick View</span>
                                    </div>
                                </Link>
                                
                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="text-sm font-medium line-clamp-2 min-h-[2.5rem] mb-1">
                                        <Link to={`/product/${product.id}`} className="hover:text-amber-700 transition-colors">
                                            {product.title}
                                        </Link>
                                    </h3>
                                    <p className="text-xs text-amber-700 capitalize mb-3 line-clamp-1">{product.Highlight}</p>
                                    
                                    <div className="mt-auto flex items-center justify-between">
                                        <span className="text-lg font-semibold">{product.Price}</span>
                                    </div>
                                    
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="w-full mt-4 bg-gray-900 hover:bg-amber-700 text-white py-2 rounded transition-colors font-medium text-sm flex items-center justify-center gap-2"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>  
                        ))}
                    </div>
                    {filteredAndSortedProducts.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                            <p className="text-xl">No products found for the selected filters.</p>
                        </div>
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default CategoryPage;
