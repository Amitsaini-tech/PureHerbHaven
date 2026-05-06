import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../Footer';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        categories: 0,
        recentUploads: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const productsSnapshot = await getDocs(collection(db, "products"));
                const products = productsSnapshot.docs.map(doc => doc.data());
                
                const uniqueCategories = [...new Set(products.map(p => p.categories))];
                
                const recentQuery = query(collection(db, "products"), orderBy("createdAt", "desc"), limit(5));
                const recentSnapshot = await getDocs(recentQuery);
                const recent = recentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                setStats({
                    totalProducts: productsSnapshot.size,
                    categories: uniqueCategories.length,
                    recentUploads: recent
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="w-full min-h-screen bg-gray-50 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8 flex justify-between items-center">
                    <h1 className="text-3xl font-classic font-bold text-gray-900">Admin Dashboard</h1>
                    <Link 
                        to="/admin/upload-product"
                        className="bg-amber-800 text-white px-6 py-2 rounded-md hover:bg-amber-900 transition font-medium shadow-sm"
                    >
                        Upload New Product
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-800"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {/* Stats Cards */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                        >
                            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Products</h3>
                            <p className="text-4xl font-bold text-amber-900 mt-2">{stats.totalProducts}</p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                        >
                            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Active Categories</h3>
                            <p className="text-4xl font-bold text-amber-900 mt-2">{stats.categories}</p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                        >
                            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Recent Uploads</h3>
                            <p className="text-4xl font-bold text-amber-900 mt-2">{stats.recentUploads.length}</p>
                        </motion.div>
                    </div>
                )}

                {/* Recent Activity Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                        <h2 className="text-lg font-semibold text-gray-800">Recent Product Activity</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Product</th>
                                    <th className="px-6 py-4 font-medium">Category</th>
                                    <th className="px-6 py-4 font-medium">Price</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {stats.recentUploads.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <img src={product.imgsrc} alt="" className="h-10 w-10 rounded object-cover mr-3" />
                                                <span className="font-medium text-gray-900">{product.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{product.categories}</td>
                                        <td className="px-6 py-4 font-semibold text-gray-900">{product.Price}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full font-medium border border-green-100">
                                                Live
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {stats.recentUploads.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                                            No products uploaded yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminDashboard;
