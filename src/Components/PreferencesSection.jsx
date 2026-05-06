import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const PreferencesSection = () => {
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchRecommended = async () => {
            setLoading(true);
            try {
                let q;
                // If user is logged in, try to fetch based on skin type (mocking preference for now)
                // In a real app, you'd store 'preference' in the user document
                if (user) {
                    q = query(collection(db, "products"), limit(4));
                } else {
                    q = query(collection(db, "products"), limit(4));
                }

                const querySnapshot = await getDocs(q);
                const products = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setRecommended(products);
            } catch (error) {
                console.error("Error fetching recommended products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommended();
    }, [user]);

    if (!loading && recommended.length === 0) return null;

    return (
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-amber-50/30">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
                <div>
                    <h2 className="text-3xl md:text-4xl font-classic font-bold text-gray-900">
                        {user ? `Personalized for ${user.name.split(' ')[0]}` : 'Recommended for You'}
                    </h2>
                    <p className="text-gray-600 mt-2">Based on your preferences and browsing history.</p>
                </div>
                <Link to="/category/all" className="mt-4 md:mt-0 text-amber-800 font-semibold hover:underline flex items-center">
                    View All Recommendations
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {loading ? (
                    Array(4).fill(0).map((_, i) => (
                        <div key={i} className="animate-pulse bg-white rounded-xl h-80 border border-gray-100"></div>
                    ))
                ) : (
                    recommended.map((product) => (
                        <motion.div 
                            key={product.id}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group transition-all"
                        >
                            <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
                                <img src={product.imgsrc} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                {product.isNew && (
                                    <span className="absolute top-3 left-3 bg-amber-800 text-white text-[10px] uppercase font-bold px-2 py-1 rounded">New</span>
                                )}
                            </Link>
                            <div className="p-4">
                                <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{product.title}</h3>
                                <p className="text-xs text-gray-500 mt-1">{product.categories}</p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-amber-900 font-bold">{product.Price}</span>
                                    <button className="text-xs font-bold text-amber-800 hover:text-amber-900 uppercase tracking-wider">
                                        Add +
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PreferencesSection;
