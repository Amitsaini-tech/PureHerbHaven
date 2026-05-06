import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, collection, getDocs, query, where, limit } from 'firebase/firestore';
import { useCart } from '../context/CartContext';
import { MdStar, MdStarHalf, MdOutlineLocalShipping, MdOutlineSecurity } from 'react-icons/md';
import { BiUndo } from 'react-icons/bi';
import Footer from '../Components/Footer';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('details');

    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const docRef = doc(db, "products", id);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    const productData = { id: docSnap.id, ...docSnap.data() };
                    setProduct(productData);
                    
                    // Fetch related products (same category, excluding current)
                    const q = query(
                        collection(db, "products"), 
                        where("categories", "==", productData.categories),
                        limit(5)
                    );
                    const querySnapshot = await getDocs(q);
                    const related = querySnapshot.docs
                        .map(doc => ({ id: doc.id, ...doc.data() }))
                        .filter(item => item.id !== id)
                        .slice(0, 4);
                    setRelatedProducts(related);
                } else {
                    console.log("No such product!");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div className="w-full h-screen flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-800"></div>
        </div>;
    }

    if (!product) {
        return <div className="w-full h-screen flex flex-col justify-center items-center">
            <p className="text-xl text-gray-600">Product not found.</p>
            <Link to="/" className="mt-4 text-amber-800 underline">Return to Home</Link>
        </div>;
    }

    return (
        <div className="w-full min-h-screen pt-20 flex flex-col bg-gray-50">
            <div className="flex-1 max-w-screen-xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {/* Breadcrumbs */}
                <nav className="text-sm text-gray-500 mb-8 flex gap-2">
                    <button onClick={() => navigate(-1)} className="hover:text-amber-700">Back</button>
                    <span>/</span>
                    <span className="text-gray-900 truncate">{product.title}</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-12 bg-white p-6 md:p-10 rounded-2xl shadow-sm">
                    {/* Image Gallery */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-4">
                        <div className="w-full aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden relative">
                            <img 
                                src={product.imgsrc} 
                                alt={product.title} 
                                className="w-full h-full object-cover object-center absolute inset-0"
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="w-full lg:w-1/2 flex flex-col">
                        <h1 className="text-3xl md:text-4xl font-classic font-semibold text-gray-900 mb-2 leading-tight">
                            {product.title}
                        </h1>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex text-amber-500 text-lg">
                                {[1, 2, 3, 4, 5].map(star => {
                                    const rating = product.rating || 4.5; // Fallback for mock
                                    if (rating >= star) return <MdStar key={star} />;
                                    if (rating >= star - 0.5) return <MdStarHalf key={star} />;
                                    return <MdStar key={star} className="text-gray-300" />;
                                })}
                            </div>
                            <span className="text-sm text-gray-500 hover:text-amber-700 cursor-pointer underline decoration-dotted">
                                {product.rating || 4.5} ({product.reviews?.length || 12} Reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <span className="text-3xl font-bold text-gray-900">{product.Price}</span>
                            <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
                        </div>

                        {/* Highlights */}
                        <div className="mb-8 p-4 bg-amber-50/50 rounded-lg border border-amber-100">
                            <h3 className="text-sm font-semibold text-amber-900 uppercase tracking-wider mb-2">Highlights</h3>
                            <p className="text-amber-800 capitalize leading-relaxed">{product.Highlight?.split('|').join(' • ') || 'Natural Ingredients • SLS-free • Paraben-free'}</p>
                        </div>

                        {/* Add to Cart Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-10 border-b pb-10">
                            <button 
                                onClick={() => addToCart(product)}
                                className="flex-1 bg-gray-900 hover:bg-amber-800 text-white py-4 rounded-lg transition-colors font-medium text-lg shadow-md hover:shadow-lg"
                            >
                                Add to Cart
                            </button>
                            <button 
                                onClick={() => {
                                    addToCart(product);
                                    navigate('/checkout');
                                }}
                                className="flex-1 border border-gray-300 hover:border-gray-900 text-gray-900 py-4 rounded-lg transition-colors font-medium text-lg"
                            >
                                Buy it Now
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                            <div className="flex items-center gap-3 text-gray-600">
                                <MdOutlineLocalShipping className="text-2xl text-amber-700" />
                                <span className="text-sm font-medium">Free Shipping<br/>Over ₹999</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <BiUndo className="text-2xl text-amber-700" />
                                <span className="text-sm font-medium">Easy 15-Day<br/>Returns</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <MdOutlineSecurity className="text-2xl text-amber-700" />
                                <span className="text-sm font-medium">100% Secure<br/>Checkout</span>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="mt-auto">
                            <div className="flex border-b">
                                {['details', 'ingredients', 'how to use', 'policies'].map(tab => (
                                    <button 
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-3 text-sm font-medium capitalize transition-colors relative ${activeTab === tab ? 'text-amber-700' : 'text-gray-500 hover:text-gray-900'}`}
                                    >
                                        {tab}
                                        {activeTab === tab && (
                                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-700"></span>
                                        )}
                                    </button>
                                ))}
                            </div>
                            <div className="py-6 text-gray-600 text-sm leading-relaxed min-h-[150px]">
                                {activeTab === 'details' && (
                                    <p>{product.description || "Experience the ultimate luxury with our carefully crafted formulation. Designed to deliver unparalleled results while being gentle on your skin. Supplier: PureHerbHaven Naturals Pvt. Ltd."}</p>
                                )}
                                {activeTab === 'ingredients' && (
                                    <p>100% Vegan, Cruelty-Free, Paraben-Free. Contains active botanical extracts, essential oils, and natural preservatives.</p>
                                )}
                                {activeTab === 'how to use' && (
                                    <p>Apply a small amount to clean, dry skin. Gently massage in upward circular motions until fully absorbed. Use daily for best results.</p>
                                )}
                                {activeTab === 'policies' && (
                                    <div>
                                        <p className="mb-2"><strong>Supplier:</strong> PureHerbHaven Naturals Pvt. Ltd.</p>
                                        <p><strong>Return Policy:</strong> We offer a 15-day return policy for unused and unopened products. Please contact customer support to initiate a return.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Below the main detail section */}
            <div className="max-w-screen-xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12 flex flex-col gap-12">
                {/* Related Products Section */}
                {relatedProducts.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-classic font-semibold mb-6 text-gray-900">You Might Also Like</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map(related => (
                                <div key={related.id} className="group flex flex-col bg-white rounded-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                                    <Link to={`/product/${related.id}`} className="relative h-64 overflow-hidden block">
                                        <img 
                                            src={related.imgsrc} 
                                            alt={related.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                    </Link>
                                    <div className="p-4 flex flex-col flex-1">
                                        <h3 className="text-sm font-medium line-clamp-2 min-h-[2.5rem] mb-1">
                                            <Link to={`/product/${related.id}`} className="hover:text-amber-700 transition-colors">
                                                {related.title}
                                            </Link>
                                        </h3>
                                        <div className="mt-auto flex items-center justify-between mt-2">
                                            <span className="text-lg font-semibold">{related.Price}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            
            <Footer />
        </div>
    );
};

export default ProductDetail;
