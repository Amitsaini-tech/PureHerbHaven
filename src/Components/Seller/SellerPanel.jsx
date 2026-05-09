import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, doc, updateDoc, orderBy, query, where } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineLocalShipping, MdOutlineInventory2, MdOutlinePendingActions } from 'react-icons/md';
import { Link } from 'react-router-dom';

const SellerPanel = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(db, "orders"), 
                where("sellerIds", "array-contains", user.uid),
                orderBy("createdAt", "desc")
            );
            const snapshot = await getDocs(q);
            const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setOrders(ordersData);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        setUpdating(true);
        try {
            const orderRef = doc(db, "orders", orderId);
            await updateDoc(orderRef, { status: newStatus });
            // Update local state
            setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
            if (expandedOrder && expandedOrder.id === orderId) {
                setExpandedOrder({ ...expandedOrder, status: newStatus });
            }
        } catch (error) {
            console.error("Error updating order:", error);
            alert("Failed to update status");
        } finally {
            setUpdating(false);
        }
    };

    const getStatusBadge = (status) => {
        switch(status) {
            case 'Confirmed':
            case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Packed': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Dispatched': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            case 'Out for Delivery': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-classic font-bold text-gray-900">Seller Dashboard</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage orders and fulfillments</p>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                        <Link 
                            to="/seller/upload-product"
                            className="bg-amber-800 text-white px-5 py-2 rounded-lg hover:bg-amber-900 transition font-medium shadow-sm h-full flex items-center"
                        >
                            + Upload Product
                        </Link>
                        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 flex items-center gap-3">
                            <div className="p-2 bg-yellow-50 rounded-full text-yellow-600"><MdOutlinePendingActions size={20} /></div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Pending</p>
                                <p className="text-xl font-bold text-gray-900">{orders.filter(o => o.status === 'Confirmed' || o.status === 'Pending').length}</p>
                            </div>
                        </div>
                        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-full text-blue-600"><MdOutlineInventory2 size={20} /></div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Packed</p>
                                <p className="text-xl font-bold text-gray-900">{orders.filter(o => o.status === 'Packed').length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 items-start relative">
                    
                    {/* Main Table */}
                    <div className={`transition-all duration-300 w-full ${expandedOrder ? 'lg:w-2/3' : 'w-full'}`}>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
                            </div>
                            
                            {loading ? (
                                <div className="flex justify-center items-center py-20">
                                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-800"></div>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm whitespace-nowrap">
                                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th className="px-6 py-4 font-medium">Order ID</th>
                                                <th className="px-6 py-4 font-medium">Date</th>
                                                <th className="px-6 py-4 font-medium">Customer</th>
                                                <th className="px-6 py-4 font-medium">Items</th>
                                                <th className="px-6 py-4 font-medium">Total</th>
                                                <th className="px-6 py-4 font-medium">Payment</th>
                                                <th className="px-6 py-4 font-medium">Status</th>
                                                <th className="px-6 py-4 font-medium text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {orders.map(order => (
                                                <tr 
                                                    key={order.id} 
                                                    className={`hover:bg-amber-50/50 transition-colors cursor-pointer ${expandedOrder?.id === order.id ? 'bg-amber-50' : ''}`}
                                                    onClick={() => setExpandedOrder(order)}
                                                >
                                                    <td className="px-6 py-4 font-mono text-amber-800 font-medium">#{order.orderId || order.id.slice(0,8)}</td>
                                                    <td className="px-6 py-4 text-gray-600">{order.createdAt?.toDate().toLocaleDateString()}</td>
                                                    <td className="px-6 py-4 text-gray-900 font-medium">{order.shippingAddress?.fullName}</td>
                                                    <td className="px-6 py-4 text-gray-600">{order.items?.length || 0}</td>
                                                    <td className="px-6 py-4 font-semibold text-gray-900">₹{order.total?.toFixed(2)}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2.5 py-1 rounded text-xs font-medium border ${order.paymentMethod === 'COD' ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                                                            {order.paymentMethod || 'Prepaid'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(order.status)}`}>
                                                            {order.status || 'Pending'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button 
                                                            className="text-amber-700 hover:text-amber-900 font-medium text-sm"
                                                            onClick={(e) => { e.stopPropagation(); setExpandedOrder(order); }}
                                                        >
                                                            View
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {orders.length === 0 && (
                                                <tr>
                                                    <td colSpan="8" className="px-6 py-12 text-center text-gray-500">No orders found.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Side Panel for Detail View */}
                    <AnimatePresence>
                        {expandedOrder && (
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="w-full lg:w-1/3 bg-white rounded-xl shadow-lg border border-gray-200 sticky top-[100px] max-h-[calc(100vh-120px)] overflow-y-auto"
                            >
                                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/80 backdrop-blur-sm sticky top-0 z-10">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Order #{expandedOrder.orderId || expandedOrder.id.slice(0,8)}</h3>
                                        <p className="text-xs text-gray-500">{expandedOrder.createdAt?.toDate().toLocaleString()}</p>
                                    </div>
                                    <button onClick={() => setExpandedOrder(null)} className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
                                        <IoMdClose size={20} />
                                    </button>
                                </div>
                                
                                <div className="p-5 space-y-6">
                                    {/* Action Workflow */}
                                    <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                                        <h4 className="text-xs uppercase tracking-wider font-semibold text-amber-900 mb-3">Fulfillment Action</h4>
                                        
                                        {(expandedOrder.status === 'Confirmed' || expandedOrder.status === 'Pending') && (
                                            <button 
                                                onClick={() => updateOrderStatus(expandedOrder.id, 'Packed')}
                                                disabled={updating}
                                                className="w-full bg-amber-800 hover:bg-amber-900 text-white py-2.5 rounded-md font-medium text-sm transition-colors shadow-sm disabled:opacity-50"
                                            >
                                                Mark as Packed
                                            </button>
                                        )}
                                        
                                        {expandedOrder.status === 'Packed' && (
                                            <button 
                                                onClick={() => updateOrderStatus(expandedOrder.id, 'Dispatched')}
                                                disabled={updating}
                                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-md font-medium text-sm transition-colors shadow-sm disabled:opacity-50 flex justify-center items-center gap-2"
                                            >
                                                <MdOutlineLocalShipping size={18} />
                                                Handover to Logistics (Dispatch)
                                            </button>
                                        )}
                                        
                                        {['Dispatched', 'Out for Delivery', 'Delivered'].includes(expandedOrder.status) && (
                                            <div className="text-center p-3 bg-white/60 rounded border border-amber-100 text-sm text-amber-800 font-medium">
                                                Awaiting delivery partner update...
                                            </div>
                                        )}
                                    </div>

                                    {/* Purchaser Details */}
                                    <div>
                                        <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-3 border-b pb-1">Purchaser Details</h4>
                                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm">
                                            <p className="font-semibold text-gray-900 mb-1">{expandedOrder.shippingAddress?.fullName}</p>
                                            <p className="text-gray-600 mb-1">{expandedOrder.shippingAddress?.address}</p>
                                            <p className="text-gray-600 mb-1">{expandedOrder.shippingAddress?.city}, {expandedOrder.shippingAddress?.state} {expandedOrder.shippingAddress?.zip}</p>
                                            <p className="text-gray-800 font-medium mt-2 pt-2 border-t border-gray-200">📞 {expandedOrder.shippingAddress?.phone}</p>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div>
                                        {(() => {
                                            const sellerItems = expandedOrder.items?.filter(item => !item.sellerId || item.sellerId === user.uid) || [];
                                            return (
                                                <>
                                                    <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-3 border-b pb-1">Items ({sellerItems.length})</h4>
                                                    <div className="space-y-3">
                                                        {sellerItems.map((item, idx) => (
                                                            <div key={idx} className="flex gap-3">
                                                                <img src={item.imgsrc} alt={item.title} className="w-12 h-12 object-cover rounded bg-gray-100 border" />
                                                                <div className="flex-1">
                                                                    <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.title}</p>
                                                                    <p className="text-xs text-gray-500">Qty: {item.quantity} × {item.price}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>
                                            );
                                        })()}
                                    </div>

                                    {/* Payment Info */}
                                    <div>
                                        <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-3 border-b pb-1">Payment Details</h4>
                                        <div className="flex justify-between items-center text-sm mb-2">
                                            <span className="text-gray-600">Method</span>
                                            <span className="font-medium text-gray-900">{expandedOrder.paymentMethod || 'Prepaid'}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm font-bold text-gray-900 pt-2 border-t">
                                            <span>Total Amount</span>
                                            <span className="text-amber-800 text-lg">₹{expandedOrder.total?.toFixed(2)}</span>
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
};

export default SellerPanel;
