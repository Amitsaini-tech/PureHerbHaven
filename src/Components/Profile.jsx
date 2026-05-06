import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Footer from './Footer';
import { MdPerson, MdSettings, MdNotifications, MdSecurity, MdPalette, MdLanguage } from 'react-icons/md';

const Profile = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    
    // Settings state
    const [settings, setSettings] = useState({
        emailNotifications: true,
        orderUpdates: true,
        darkMode: false,
        language: 'English',
        currency: 'INR'
    });

    if (!user) return null;

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="w-full min-h-screen pt-24 bg-gray-50 flex flex-col">
            <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
                
                <div className="flex flex-col md:flex-row gap-8">
                    
                    {/* Sidebar Tabs */}
                    <aside className="w-full md:w-64 space-y-2">
                        <button 
                            onClick={() => setActiveTab('overview')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'overview' ? 'bg-amber-800 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-amber-50 hover:text-amber-800 border border-gray-100'}`}
                        >
                            <MdPerson className="text-xl" />
                            Overview
                        </button>
                        <button 
                            onClick={() => setActiveTab('settings')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'settings' ? 'bg-amber-800 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-amber-50 hover:text-amber-800 border border-gray-100'}`}
                        >
                            <MdSettings className="text-xl" />
                            Settings
                        </button>
                    </aside>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            {/* Banner */}
                            <div className="h-32 bg-gradient-to-r from-amber-700 to-amber-900 relative">
                                <div className="absolute -bottom-10 left-8 w-20 h-20 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center">
                                    <span className="text-2xl font-bold text-amber-800">{user.initials}</span>
                                </div>
                            </div>

                            <div className="pt-14 pb-10 px-8">
                                
                                {activeTab === 'overview' ? (
                                    <div className="animate-fade-in">
                                        <div className="mb-8">
                                            <h1 className="text-2xl font-classic font-bold text-gray-900">{user.name}</h1>
                                            <p className="text-gray-500">{user.email}</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t pt-8">
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">Account Information</h3>
                                                <div className="space-y-5">
                                                    <div>
                                                        <label className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Full Name</label>
                                                        <p className="text-gray-800 font-medium">{user.name}</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Email Address</label>
                                                        <p className="text-gray-800 font-medium">{user.email}</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Status</label>
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 mt-1">
                                                            Verified {user.isAdmin && '• Admin'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">Recent Activity</h3>
                                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                    <p className="text-sm text-gray-600">No recent activity to show.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="animate-fade-in">
                                        <div className="mb-8">
                                            <h1 className="text-2xl font-classic font-bold text-gray-900">Account Settings</h1>
                                            <p className="text-gray-500">Manage your preferences and account security.</p>
                                        </div>

                                        <div className="space-y-8 border-t pt-8">
                                            {/* Notifications */}
                                            <section>
                                                <div className="flex items-center gap-2 mb-4">
                                                    <MdNotifications className="text-amber-800 text-xl" />
                                                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                                                </div>
                                                <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="font-medium text-gray-800">Email Notifications</p>
                                                            <p className="text-xs text-gray-500">Receive newsletters and promotional offers.</p>
                                                        </div>
                                                        <button 
                                                            onClick={() => toggleSetting('emailNotifications')}
                                                            className={`w-12 h-6 rounded-full transition-colors relative ${settings.emailNotifications ? 'bg-amber-800' : 'bg-gray-300'}`}
                                                        >
                                                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.emailNotifications ? 'right-1' : 'left-1'}`} />
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                                        <div>
                                                            <p className="font-medium text-gray-800">Order Updates</p>
                                                            <p className="text-xs text-gray-500">Get real-time updates on your order status.</p>
                                                        </div>
                                                        <button 
                                                            onClick={() => toggleSetting('orderUpdates')}
                                                            className={`w-12 h-6 rounded-full transition-colors relative ${settings.orderUpdates ? 'bg-amber-800' : 'bg-gray-300'}`}
                                                        >
                                                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.orderUpdates ? 'right-1' : 'left-1'}`} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </section>

                                            {/* Appearance */}
                                            <section>
                                                <div className="flex items-center gap-2 mb-4">
                                                    <MdPalette className="text-amber-800 text-xl" />
                                                    <h3 className="font-semibold text-gray-900">Appearance & Localization</h3>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                                                        <span className="text-sm font-medium">Dark Mode</span>
                                                        <button 
                                                            onClick={() => toggleSetting('darkMode')}
                                                            className={`w-10 h-5 rounded-full transition-colors relative ${settings.darkMode ? 'bg-amber-800' : 'bg-gray-300'}`}
                                                        >
                                                            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${settings.darkMode ? 'right-0.5' : 'left-0.5'}`} />
                                                        </button>
                                                    </div>
                                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <MdLanguage className="text-gray-400" />
                                                            <span className="text-sm font-medium">Language</span>
                                                        </div>
                                                        <select className="bg-transparent text-sm font-medium outline-none text-amber-800">
                                                            <option>English</option>
                                                            <option>Hindi</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </section>

                                            {/* Security */}
                                            <section>
                                                <div className="flex items-center gap-2 mb-4">
                                                    <MdSecurity className="text-amber-800 text-xl" />
                                                    <h3 className="font-semibold text-gray-900">Security</h3>
                                                </div>
                                                <div className="flex flex-col gap-3">
                                                    <button className="flex items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-xl hover:bg-amber-50 transition-colors">
                                                        <span className="text-sm font-medium">Change Password</span>
                                                        <span className="text-gray-400 text-xl">›</span>
                                                    </button>
                                                    <button className="flex items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-xl hover:bg-red-50 transition-colors group">
                                                        <span className="text-sm font-medium group-hover:text-red-600">Delete Account</span>
                                                        <span className="text-gray-400 text-xl">›</span>
                                                    </button>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default Profile;
