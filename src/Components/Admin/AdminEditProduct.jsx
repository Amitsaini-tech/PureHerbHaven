import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Footer from '../Footer';
import { CATEGORIES, FINISHES, SKIN_TYPES } from '../../utils/constants';

const AdminEditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        highlight: '',
        category: CATEGORIES[0],
        finish: FINISHES[0],
        skintype: SKIN_TYPES[0],
        imgsrc: '',
        description: ''
    });
    
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            try {
                const docRef = doc(db, 'products', id);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setFormData({
                        title: data.title || '',
                        price: data.priceNum || '',
                        highlight: data.Highlight || '',
                        category: data.categories || CATEGORIES[0],
                        finish: data.finish || FINISHES[0],
                        skintype: data.skintype || SKIN_TYPES[0],
                        imgsrc: data.imgsrc || '',
                        description: data.description || ''
                    });
                } else {
                    setErrorMessage('Product not found.');
                }
            } catch (error) {
                console.error("Error fetching product:", error);
                setErrorMessage('Failed to load product details.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');
        
        try {
            const productRef = doc(db, 'products', id);
            await updateDoc(productRef, {
                title: formData.title,
                Price: `MRP ₹${formData.price}.00`,
                priceNum: parseFloat(formData.price),
                Highlight: formData.highlight,
                categories: formData.category,
                finish: formData.finish,
                skintype: formData.skintype,
                imgsrc: formData.imgsrc,
                description: formData.description
            });
            
            setSuccessMessage(`Product "${formData.title}" updated successfully!`);
            
            // Clear message and navigate back after 2 seconds
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/admin');
            }, 2000);
        } catch (error) {
            console.error("Error updating document: ", error);
            setErrorMessage('Failed to update product. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-800"></div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen flex flex-col bg-gray-50 pt-16">
            <div className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
                
                <Link to="/admin" className="text-sm font-medium text-amber-700 hover:text-amber-900 mb-6 inline-block">
                    &larr; Back to Dashboard
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
                    <div className="mb-8 border-b pb-4">
                        <h1 className="text-3xl font-classic font-bold text-gray-900">Edit Product</h1>
                        <p className="text-sm text-gray-500 mt-2">Update details for the product.</p>
                    </div>

                    {successMessage && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 bg-green-50 text-green-800 p-4 rounded-md border border-green-200 font-medium"
                        >
                            {successMessage}
                        </motion.div>
                    )}

                    {errorMessage && (
                        <div className="mb-6 bg-red-50 text-red-800 p-4 rounded-md border border-red-200 font-medium">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Product Name */}
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                                <input 
                                    type="text" required name="title" value={formData.title} onChange={handleChange}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 border p-2.5 outline-none bg-white"
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                                <input 
                                    type="number" required name="price" value={formData.price} onChange={handleChange}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 border p-2.5 outline-none bg-white"
                                />
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                <input 
                                    type="url" name="imgsrc" value={formData.imgsrc} onChange={handleChange}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 border p-2.5 outline-none bg-white"
                                />
                            </div>

                            {/* Highlights */}
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Highlights * (Separate with '|' )</label>
                                <input 
                                    type="text" required name="highlight" value={formData.highlight} onChange={handleChange}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 border p-2.5 outline-none bg-white"
                                />
                            </div>

                            {/* Category Dropdown */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select 
                                    name="category" value={formData.category} onChange={handleChange}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 border p-2.5 outline-none bg-white"
                                >
                                    {CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Finish Dropdown */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Finish</label>
                                <select 
                                    name="finish" value={formData.finish} onChange={handleChange}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 border p-2.5 outline-none bg-white"
                                >
                                    {FINISHES.map(f => (
                                        <option key={f} value={f}>{f}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Skin Type Dropdown */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Skin Type</label>
                                <select 
                                    name="skintype" value={formData.skintype} onChange={handleChange}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 border p-2.5 outline-none bg-white"
                                >
                                    {SKIN_TYPES.map(s => (
                                        <option key={s} value={s}>{s === 'All' ? 'All Skin Types' : s}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
                            <textarea 
                                name="description" rows="4" value={formData.description} onChange={handleChange}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 border p-2.5 outline-none bg-white"
                            ></textarea>
                        </div>

                        <div className="flex justify-end pt-4 border-t">
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className={`px-6 py-2 bg-amber-800 text-white rounded-md font-medium transition shadow-sm ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-amber-900'}`}
                            >
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminEditProduct;
