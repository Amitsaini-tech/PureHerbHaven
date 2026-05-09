import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, doc, updateDoc, query, where, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { MdNavigation, MdPhone, MdCheckCircle, MdDirectionsCar, MdEmail, MdLogout } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const statusColors = {
    'Dispatched': 'bg-indigo-100 text-indigo-800',
    'Out for Delivery': 'bg-purple-100 text-purple-800',
};

const DeliveryDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [codConfirmed, setCodConfirmed] = useState({});

    useEffect(() => {
        // Real-time listener for orders that are Dispatched or Out for Delivery
        const q = query(
            collection(db, 'orders'),
            where('status', 'in', ['Dispatched', 'Out for Delivery'])
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const orders = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            // Sort by createdAt descending
            orders.sort((a, b) => {
                const aTime = a.createdAt?.toMillis?.() || 0;
                const bTime = b.createdAt?.toMillis?.() || 0;
                return bTime - aTime;
            });
            setTasks(orders);
            setLoading(false);
        }, (error) => {
            console.error('Error fetching tasks:', error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const updateTaskStatus = async (taskId, newStatus) => {
        setUpdating(true);
        try {
            const taskRef = doc(db, 'orders', taskId);
            await updateDoc(taskRef, { status: newStatus });
            // onSnapshot will auto-update the task list
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status. Please try again.');
        } finally {
            setUpdating(false);
        }
    };

    const handleCodToggle = (taskId) => {
        setCodConfirmed(prev => ({ ...prev, [taskId]: !prev[taskId] }));
    };

    const handleLogout = async () => {
        await logout();
        navigate('/deliver/login', { replace: true });
    };

    const pendingTasks = tasks.length;
    const cashToCollect = tasks.reduce((sum, t) => {
        if (t.paymentMethod === 'COD') return sum + (t.total || 0);
        return sum;
    }, 0);

    return (
        <div className="w-full min-h-screen bg-gray-100 flex flex-col pb-24">
            {/* Sticky Header */}
            <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40 pt-4 pb-4 px-4">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Delivery Dashboard</h1>
                        <p className="text-sm text-gray-500">👋 {user?.name || 'Agent'}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-sm font-medium text-gray-700">Online</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            title="Logout"
                        >
                            <MdLogout size={20} />
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 text-center">
                        <p className="text-xs text-amber-800 uppercase font-semibold">Active Orders</p>
                        <p className="text-2xl font-bold text-gray-900">{pendingTasks}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-100 text-center">
                        <p className="text-xs text-green-800 uppercase font-semibold">COD to Collect</p>
                        <p className="text-2xl font-bold text-gray-900">₹{cashToCollect.toFixed(0)}</p>
                    </div>
                </div>
            </div>

            {/* Task List */}
            <div className="flex-1 p-4 space-y-4">
                {loading ? (
                    <div className="flex justify-center py-16">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-800"></div>
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200 mt-4">
                        <MdCheckCircle className="mx-auto text-5xl text-green-400 mb-3" />
                        <h2 className="text-lg font-semibold text-gray-900">All caught up!</h2>
                        <p className="text-gray-500 text-sm mt-1">No active deliveries right now. Check back soon.</p>
                    </div>
                ) : (
                    <AnimatePresence>
                        {tasks.map(task => (
                            <motion.div
                                key={task.id}
                                layout
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
                            >
                                {/* Card Header: Order ID + Status + Payment */}
                                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/60">
                                    <div>
                                        <span className="font-mono text-sm font-bold text-gray-800">
                                            #{task.orderId || task.id.slice(0, 8)}
                                        </span>
                                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[task.status] || 'bg-gray-100 text-gray-700'}`}>
                                            {task.status}
                                        </span>
                                    </div>
                                    <span className={`px-2.5 py-1 rounded text-xs font-bold ${task.paymentMethod === 'COD' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                        {task.paymentMethod === 'COD' ? `COD ₹${task.total?.toFixed(0)}` : 'PREPAID'}
                                    </span>
                                </div>

                                {/* Card Body: Buyer Details */}
                                <div className="p-4 space-y-3">
                                    {/* Buyer Info */}
                                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 space-y-1.5">
                                        <p className="font-bold text-gray-900 text-base">{task.shippingAddress?.fullName}</p>
                                        <p className="text-gray-600 text-sm leading-snug">
                                            {task.shippingAddress?.address}, {task.shippingAddress?.city}
                                            {task.shippingAddress?.postalCode ? ` - ${task.shippingAddress.postalCode}` : ''}
                                        </p>
                                        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-800 pt-1">
                                            <MdPhone size={15} className="text-blue-600" />
                                            <span>{task.shippingAddress?.phone || 'N/A'}</span>
                                        </div>
                                        {task.userEmail && (
                                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                                <MdEmail size={15} className="text-blue-500" />
                                                <span>{task.userEmail}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Order Items */}
                                    <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                            Order Items ({task.items?.length || 0})
                                        </h4>
                                        <ul className="space-y-1.5">
                                            {task.items?.map((item, idx) => (
                                                <li key={idx} className="flex justify-between items-center text-sm">
                                                    <span className="text-gray-800 line-clamp-1 flex-1 pr-2">
                                                        {item.quantity}× {item.title}
                                                    </span>
                                                    <span className="text-gray-600 font-medium whitespace-nowrap">{item.price}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between text-sm font-semibold">
                                            <span className="text-gray-700">Total</span>
                                            <span className="text-gray-900">₹{task.total?.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    {/* Call & Navigate buttons */}
                                    <div className="flex gap-2">
                                        <a
                                            href={`tel:${task.shippingAddress?.phone}`}
                                            className="flex-1 flex justify-center items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2.5 rounded-lg font-medium text-sm transition-colors"
                                        >
                                            <MdPhone size={18} /> Call
                                        </a>
                                        <a
                                            href={`https://maps.google.com/?q=${encodeURIComponent(`${task.shippingAddress?.address}, ${task.shippingAddress?.city}`)}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex-1 flex justify-center items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2.5 rounded-lg font-medium text-sm transition-colors"
                                        >
                                            <MdNavigation size={18} /> Navigate
                                        </a>
                                    </div>
                                </div>

                                {/* Card Footer: Status Action Buttons */}
                                <div className="p-4 bg-gray-50 border-t border-gray-100 space-y-3">
                                    {task.status === 'Dispatched' && (
                                        <button
                                            onClick={() => updateTaskStatus(task.id, 'Out for Delivery')}
                                            disabled={updating}
                                            className="w-full flex justify-center items-center gap-2 bg-amber-700 text-white py-3.5 rounded-lg font-bold shadow-sm hover:bg-amber-800 transition-colors disabled:opacity-50"
                                        >
                                            <MdDirectionsCar size={20} />
                                            Start Delivery (Out for Delivery)
                                        </button>
                                    )}

                                    {task.status === 'Out for Delivery' && (
                                        <>
                                            {task.paymentMethod === 'COD' && (
                                                <label className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="mt-0.5 w-5 h-5 rounded accent-amber-700"
                                                        checked={!!codConfirmed[task.id]}
                                                        onChange={() => handleCodToggle(task.id)}
                                                    />
                                                    <div>
                                                        <span className="block font-bold text-red-800">Confirm Payment Received</span>
                                                        <span className="block text-xs text-red-600 mt-0.5">
                                                            I confirm I collected ₹{task.total?.toFixed(0)} from the customer.
                                                        </span>
                                                    </div>
                                                </label>
                                            )}
                                            <button
                                                onClick={() => updateTaskStatus(task.id, 'Delivered')}
                                                disabled={updating || (task.paymentMethod === 'COD' && !codConfirmed[task.id])}
                                                className={`w-full flex justify-center items-center gap-2 py-4 rounded-lg font-bold text-lg shadow-sm transition-all
                                                    ${task.paymentMethod === 'COD' && !codConfirmed[task.id]
                                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                        : 'bg-green-600 text-white hover:bg-green-700'
                                                    }`}
                                            >
                                                <MdCheckCircle size={24} />
                                                Mark as Delivered
                                            </button>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
};

export default DeliveryDashboard;
