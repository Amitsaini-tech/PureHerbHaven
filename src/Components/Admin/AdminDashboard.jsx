import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, orderBy, limit, deleteDoc, doc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import { CATEGORIES } from '../../utils/constants';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        categories: 0,
        recentUploads: []
    });
    const [loading, setLoading] = useState(true);
    const [allProducts, setAllProducts] = useState([]);
    const [filterCategory, setFilterCategory] = useState('All');
    const [sortBy, setSortBy] = useState('newest');

    const handleDelete = async (id, title) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            try {
                await deleteDoc(doc(db, "products", id));
                setAllProducts(allProducts.filter(p => p.id !== id));
                setStats(prev => ({ ...prev, totalProducts: prev.totalProducts - 1 }));
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("Failed to delete product.");
            }
        }
    };

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
                    recentUploads: products.slice(0, 5) // Initial top 5 for dashboard stats
                });
                setAllProducts(products.map(p => ({ id: p.id || Math.random().toString(), ...p })));
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const filteredAndSortedProducts = React.useMemo(() => {
        let result = [...allProducts];

        if (filterCategory !== 'All') {
            result = result.filter(p => {
                const cat = p.categories?.toLowerCase();
                const filter = filterCategory.toLowerCase();
                if (filter === 'skin') return cat === 'skin' || cat === 'skincare';
                if (filter === 'hair') return cat === 'hair' || cat === 'haircare';
                return cat === filter;
            });
        }

        if (sortBy === 'newest') {
            result.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        } else if (sortBy === 'oldest') {
            result.sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0));
        } else if (sortBy === 'price-low') {
            result.sort((a, b) => (a.priceNum || 0) - (b.priceNum || 0));
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => (b.priceNum || 0) - (a.priceNum || 0));
        } else if (sortBy === 'name') {
            result.sort((a, b) => a.title.localeCompare(b.title));
        }

        return result;
    }, [allProducts, filterCategory, sortBy]);

    return (
        <div className="w-full min-h-screen bg-gray-50 pt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8 flex justify-between items-center">
                    <h1 className="text-3xl font-classic font-bold text-gray-900">Admin Dashboard</h1>
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
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <h2 className="text-lg font-semibold text-gray-800">Manage Products</h2>
                        
                        <div className="flex flex-wrap gap-3">
                            <select 
                                value={filterCategory} 
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="border border-gray-300 rounded px-3 py-1.5 text-sm bg-white outline-none focus:ring-1 focus:ring-amber-500"
                            >
                                <option value="All">All Categories</option>
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>

                            <select 
                                value={sortBy} 
                                onChange={(e) => setSortBy(e.target.value)}
                                className="border border-gray-300 rounded px-3 py-1.5 text-sm bg-white outline-none focus:ring-1 focus:ring-amber-500"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="name">Name: A-Z</option>
                            </select>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Product</th>
                                    <th className="px-6 py-4 font-medium">Category</th>
                                    <th className="px-6 py-4 font-medium">Price</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredAndSortedProducts.map((product) => (
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
                                        <td className="px-6 py-4 text-right">
                                            <Link to={`/admin/edit-product/${product.id}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm mr-4">Edit</Link>
                                            <button onClick={() => handleDelete(product.id, product.title)} className="text-red-600 hover:text-red-800 font-medium text-sm">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredAndSortedProducts.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
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
