import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const Orders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;
            setError(null);
            try {
                const q = query(
                    collection(db, "orders"),
                    where("userId", "==", user.uid),
                    orderBy("createdAt", "desc")
                );
                const querySnapshot = await getDocs(q);
                const ordersData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setOrders(ordersData);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    return (
        <div className="w-full min-h-screen pt-24 bg-gray-50 flex flex-col">
            <div className="flex-1 max-w-screen-xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-10">
                    <h1 className="text-3xl font-classic font-bold text-gray-900 mb-2">My Orders</h1>
                    <p className="text-gray-500">Track and manage your recent orders.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-800"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                        <p className="text-red-800 font-medium mb-4">Unable to load orders.</p>
                        <p className="text-sm text-red-600 mb-6">{error}</p>
                        <p className="text-xs text-gray-500">If you see a link above, click it to automatically create the required Firestore index.</p>
                    </div>
                ) : orders.length > 0 ? (
                    <div className="space-y-8">
                        {orders.map(order => (
                            <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                                    <div className="flex gap-8">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Order Placed</p>
                                            <p className="text-sm font-medium">{order.createdAt?.toDate().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Amount</p>
                                            <p className="text-sm font-medium">₹{order.total?.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Token Number</p>
                                            <p className="text-sm font-medium font-mono text-amber-800">{order.orderId}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="space-y-6">
                                        {order.items?.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-4">
                                                <img src={item.imgsrc} alt={item.title} className="w-20 h-24 object-cover rounded bg-gray-50 border" />
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">{item.title}</h4>
                                                    <p className="text-sm text-gray-500 mb-1">Quantity: {item.quantity}</p>
                                                    <p className="text-sm font-medium text-amber-800">{item.price}</p>
                                                </div>
                                                <div className="hidden sm:block">
                                                    <Link to={`/product/${item.id}`} className="text-xs font-medium text-amber-700 hover:underline">View Product</Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 pt-6 border-t flex flex-wrap justify-between items-center gap-4">
                                        <div className="text-sm text-gray-600">
                                            <span className="font-medium">Shipping to:</span> {order.shippingAddress?.fullName}, {order.shippingAddress?.address}
                                        </div>
                                        <button className="px-6 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-amber-800 transition-colors">
                                            Track Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">📦</span>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h2>
                        <p className="text-gray-500 mb-8">You haven't placed any orders yet. Start shopping to see them here!</p>
                        <Link to="/" className="inline-block px-8 py-3 bg-amber-800 text-white rounded-lg font-medium hover:bg-amber-900 transition-colors">
                            Browse Products
                        </Link>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Orders;
