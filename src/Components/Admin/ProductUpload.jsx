import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Footer from '../Footer';
import { CATEGORIES, FINISHES, SKIN_TYPES } from '../../utils/constants';

const ProductUpload = () => {
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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');
        
        try {
            const newProduct = {
                title: formData.title,
                Price: `MRP ₹${formData.price}.00`,
                priceNum: parseFloat(formData.price),
                Highlight: formData.highlight,
                categories: formData.category,
                finish: formData.finish,
                skintype: formData.skintype,
                imgsrc: formData.imgsrc || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                description: formData.description,
                path: '/',
                rating: 0,
                reviews: [],
                relatedIds: [],
                createdAt: serverTimestamp()
            };

            await addDoc(collection(db, 'products'), newProduct);
            
            setSuccessMessage(`Product "${formData.title}" uploaded successfully!`);
            
            // Reset form
            setFormData({
                title: '', price: '', highlight: '', category: 'Skincare', finish: 'Matte', skintype: 'All', imgsrc: '', description: ''
            });

            // Clear message after 3 seconds
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error("Error adding document: ", error);
            setErrorMessage('Failed to upload product. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col bg-gray-50 pt-16">
            <div className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
                    <div className="mb-8 border-b pb-4">
                        <h1 className="text-3xl font-classic font-bold text-gray-900">Upload Product</h1>
                        <p className="text-sm text-gray-500 mt-2">Add a new product to the PureHerbHaven catalog.</p>
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

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Product Name */}
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                                <input 
                                    type="text" required name="title" value={formData.title} onChange={handleChange}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 border p-2.5 outline-none bg-white"
                                    placeholder="e.g. Herb Enriched Face Wash"
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                                <input 
                                    type="number" required name="price" value={formData.price} onChange={handleChange}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 border p-2.5 outline-none bg-white"
                                    placeholder="e.g. 495"
                                />
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                <input 
                                    type="url" name="imgsrc" value={formData.imgsrc} onChange={handleChange}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 border p-2.5 outline-none bg-white"
                                    placeholder="Leave empty for placeholder"
                                />
                            </div>

                            {/* Highlights */}
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Highlights * (Separate with '|' )</label>
                                <input 
                                    type="text" required name="highlight" value={formData.highlight} onChange={handleChange}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 border p-2.5 outline-none bg-white"
                                    placeholder="e.g. SLS-free | Deep Cleansing | pH Balanced"
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
                                placeholder="Enter detailed product description..."
                            ></textarea>
                        </div>

                        <div className="flex justify-end pt-4 border-t">
                            <button 
                                type="button" 
                                onClick={() => setFormData({ title: '', price: '', highlight: '', category: 'Skincare', finish: 'Matte', skintype: 'All', imgsrc: '', description: '' })}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 mr-4 font-medium transition bg-white"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className={`px-6 py-2 bg-amber-800 text-white rounded-md font-medium transition shadow-sm ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-amber-900'}`}
                            >
                                {isSubmitting ? 'Uploading...' : 'Upload Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductUpload;
