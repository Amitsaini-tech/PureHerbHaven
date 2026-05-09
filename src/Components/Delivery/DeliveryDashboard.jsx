import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { MdNavigation, MdPhone, MdCheckCircle, MdDirectionsCar } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';

const DeliveryDashboard = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    
    // For COD
    const [codConfirmed, setCodConfirmed] = useState({});

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            // Ideally use 'in' query for Dispatched and Out for Delivery, but need index.
            // Let's fetch all and filter for now to avoid needing composite indexes right away.
            const q = query(collection(db, "orders"));
            const snapshot = await getDocs(q);
            const allOrders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            
            const activeTasks = allOrders.filter(o => o.status === 'Dispatched' || o.status === 'Out for Delivery');
            setTasks(activeTasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateTaskStatus = async (taskId, newStatus) => {
        setUpdating(true);
        try {
            const taskRef = doc(db, "orders", taskId);
            await updateDoc(taskRef, { status: newStatus });
            
            if (newStatus === 'Delivered') {
                // Remove from active tasks
                setTasks(tasks.filter(t => t.id !== taskId));
            } else {
                setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status");
        } finally {
            setUpdating(false);
        }
    };

    const handleCodToggle = (taskId) => {
        setCodConfirmed(prev => ({
            ...prev,
            [taskId]: !prev[taskId]
        }));
    };

    // Calculate summary
    const pendingTasks = tasks.length;
    const cashToCollect = tasks.reduce((sum, t) => {
        if (t.paymentMethod === 'COD') return sum + (t.total || 0);
        return sum;
    }, 0);

    return (
        <div className="w-full min-h-screen bg-gray-100 flex flex-col pb-20">
            {/* Header (Mobile optimized sticky top) */}
            <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40 pt-16 pb-4 px-4">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Delivery Tasks</h1>
                        <p className="text-sm text-gray-500">{user?.name || 'Agent'}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-sm font-medium text-gray-700">Online</span>
                    </div>
                </div>
                
                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 text-center">
                        <p className="text-xs text-amber-800 uppercase font-semibold">Pending</p>
                        <p className="text-xl font-bold text-gray-900">{pendingTasks}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-100 text-center">
                        <p className="text-xs text-green-800 uppercase font-semibold">Cash to Collect</p>
                        <p className="text-xl font-bold text-gray-900">₹{cashToCollect.toFixed(0)}</p>
                    </div>
                </div>
            </div>

            {/* Task List */}
            <div className="flex-1 p-4 space-y-4">
                {loading ? (
                    <div className="flex justify-center py-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-800"></div>
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="text-center py-10 bg-white rounded-xl shadow-sm border border-gray-200">
                        <MdCheckCircle className="mx-auto text-4xl text-green-500 mb-2" />
                        <h2 className="text-lg font-medium text-gray-900">All caught up!</h2>
                        <p className="text-gray-500 text-sm">No pending deliveries right now.</p>
                    </div>
                ) : (
                    <AnimatePresence>
                        {tasks.map(task => (
                            <motion.div 
                                key={task.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
                            >
                                {/* Task Header */}
                                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                    <div className="font-mono text-sm font-bold text-gray-700">
                                        #{task.orderId || task.id.slice(0,8)}
                                    </div>
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${task.paymentMethod === 'COD' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                        {task.paymentMethod === 'COD' ? `COD: ₹${task.total?.toFixed(0)}` : 'PREPAID'}
                                    </span>
                                </div>

                                {/* Task Body */}
                                <div className="p-4 space-y-3">
                                    <div>
                                        <p className="font-bold text-gray-900 text-lg">{task.shippingAddress?.fullName}</p>
                                        <p className="text-gray-600 text-sm leading-snug mt-1">{task.shippingAddress?.address}, {task.shippingAddress?.city}</p>
                                    </div>
                                    
                                    {/* Order Items */}
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mt-3">
                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Order Items</h4>
                                        <ul className="space-y-2">
                                            {task.items?.map((item, idx) => (
                                                <li key={idx} className="flex justify-between items-center text-sm">
                                                    <span className="text-gray-800 line-clamp-1 flex-1 pr-2">{item.quantity}x {item.title}</span>
                                                    <span className="text-gray-600 font-medium whitespace-nowrap">{item.price}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div className="flex gap-2 pt-2">
                                        <a href={`tel:${task.shippingAddress?.phone}`} className="flex-1 flex justify-center items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2.5 rounded-lg font-medium text-sm transition-colors">
                                            <MdPhone size={18} /> Call
                                        </a>
                                        <a href={`https://maps.google.com/?q=${task.shippingAddress?.address},${task.shippingAddress?.city}`} target="_blank" rel="noreferrer" className="flex-1 flex justify-center items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2.5 rounded-lg font-medium text-sm transition-colors">
                                            <MdNavigation size={18} /> Navigate
                                        </a>
                                    </div>
                                </div>

                                {/* Task Footer Actions */}
                                <div className="p-4 bg-gray-50 border-t border-gray-100">
                                    {task.status === 'Dispatched' ? (
                                        <button 
                                            onClick={() => updateTaskStatus(task.id, 'Out for Delivery')}
                                            disabled={updating}
                                            className="w-full flex justify-center items-center gap-2 bg-amber-800 text-white py-3.5 rounded-lg font-bold shadow-md hover:bg-amber-900 transition-colors disabled:opacity-50"
                                        >
                                            <MdDirectionsCar size={20} />
                                            Start Delivery
                                        </button>
                                    ) : (
                                        <div className="space-y-4">
                                            {/* COD Verification Block */}
                                            {task.paymentMethod === 'COD' && (
                                                <label className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg cursor-pointer">
                                                    <input 
                                                        type="checkbox" 
                                                        className="mt-1 w-5 h-5 text-amber-800 rounded focus:ring-amber-800"
                                                        checked={!!codConfirmed[task.id]}
                                                        onChange={() => handleCodToggle(task.id)}
                                                    />
                                                    <div>
                                                        <span className="block font-bold text-red-800">Payment Received</span>
                                                        <span className="block text-xs text-red-600">I confirm that I have collected ₹{task.total?.toFixed(0)} from the customer.</span>
                                                    </div>
                                                </label>
                                            )}

                                            <button 
                                                onClick={() => updateTaskStatus(task.id, 'Delivered')}
                                                disabled={updating || (task.paymentMethod === 'COD' && !codConfirmed[task.id])}
                                                className={`w-full flex justify-center items-center gap-2 py-4 rounded-lg font-bold text-lg shadow-md transition-all ${task.paymentMethod === 'COD' && !codConfirmed[task.id] ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
                                            >
                                                <MdCheckCircle size={24} />
                                                Mark Delivered
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>

            {/* Bottom Navigation (Fixed) */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-3 pb-safe z-50">
                <button className="flex flex-col items-center text-amber-800">
                    <MdDirectionsCar size={24} />
                    <span className="text-[10px] font-bold mt-1">Tasks</span>
                </button>
                <button className="flex flex-col items-center text-gray-400">
                    <MdCheckCircle size={24} />
                    <span className="text-[10px] font-medium mt-1">History</span>
                </button>
            </div>
        </div>
    );
};

export default DeliveryDashboard;
