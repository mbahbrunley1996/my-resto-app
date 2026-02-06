"use client";

import React, { useState, useEffect } from 'react';
import { 
    FaUtensils, FaCalendarAlt, FaUsers, FaShoppingBag, FaPlus, FaEdit, FaTrash, 
    FaCheck, FaTimes, FaClock, FaChartLine, FaHome, FaSignOutAlt, FaSearch,
    FaMoneyBillWave, FaEye, FaFilter, FaImage, FaTag, FaBoxes, FaTruck,
    FaGoogle, FaGithub, FaEnvelope, FaUserCircle, FaSpinner, FaLock
} from 'react-icons/fa';
import { 
    getMenuItems, addMenuItem, updateMenuItem, deleteMenuItem, saveMenuItems,
    getReservations, updateReservation, deleteReservation,
    getOrders,
    getDashboardStats
} from '@/lib/localStorage';
import { getFirestoreUsers, deleteFirestoreUser } from '@/lib/firebase';
import { MenuData } from '@/data/menuData';
import Link from 'next/link';
import Image from 'next/image';

// Admin password - you can change this to any password you want
const ADMIN_PASSWORD = 'essence2024';

const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const [activeTab, setActiveTab] = useState('dashboard');
    const [menuItems, setMenuItems] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [stats, setStats] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [showMenuModal, setShowMenuModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [loadingUsers, setLoadingUsers] = useState(false);

    // Form state for menu items
    const [menuForm, setMenuForm] = useState({
        name: '',
        desc: '',
        price: '',
        category: 'BreakFast & Appetizers',
        tag: '',
        image: '/gallery/hot-tea.png',
        stock: 20,
        isToGo: false
    });

    const categories = [
        'BreakFast & Appetizers',
        'Day Dishes',
        'Desserts & Parties',
        'Drinks & Cocktail',
        'Juice & Beverages'
    ];

    const tags = ['', 'NEW', 'POPULAR', 'TRENDING', "CHEF'S SPECIAL", 'MUST TRY'];

    // Check if already authenticated from session
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const adminAuth = sessionStorage.getItem('essence_admin_auth');
            if (adminAuth === 'true') {
                setIsAuthenticated(true);
            }
        }
    }, []);

    // Load data on mount - must be before any conditional returns
    useEffect(() => {
        if (isAuthenticated) {
            loadData();
            loadFirebaseUsers();
        }
    }, [isAuthenticated]);

    const loadData = () => {
        // Initialize menu from MenuData if localStorage is empty
        let storedMenu = getMenuItems().filter(item => item !== null);
        if (storedMenu.length === 0) {
            // Use the default MenuData and save it to localStorage
            storedMenu = MenuData;
            saveMenuItems(storedMenu);
        }
        setMenuItems(storedMenu);
        setReservations(getReservations());
        setOrders(getOrders());
        setStats(getDashboardStats());
    };

    // Load users from Firebase
    const loadFirebaseUsers = async () => {
        setLoadingUsers(true);
        try {
            const firebaseUsers = await getFirestoreUsers();
            setUsers(firebaseUsers);
        } catch (error) {
            console.error('Error loading users:', error);
        }
        setLoadingUsers(false);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (passwordInput === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setPasswordError('');
            if (typeof window !== 'undefined') {
                sessionStorage.setItem('essence_admin_auth', 'true');
            }
        } else {
            setPasswordError('Incorrect password. Please try again.');
            setPasswordInput('');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        if (typeof window !== 'undefined') {
            sessionStorage.removeItem('essence_admin_auth');
        }
    };

    // Password Gate UI
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#1b0918] via-[#2d1225] to-[#1b0918] flex items-center justify-center px-4">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white/20 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaLock className="text-white text-2xl" />
                        </div>
                        <h1 className="text-2xl font-serif text-white mb-2">Admin Access</h1>
                        <p className="text-gray-400 text-sm">Enter the admin password to continue</p>
                    </div>
                    
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                placeholder="Enter password"
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                autoFocus
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                                <FaEye />
                            </button>
                        </div>
                        
                        {passwordError && (
                            <p className="text-red-400 text-sm text-center">{passwordError}</p>
                        )}
                        
                        <button
                            type="submit"
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition-colors"
                        >
                            Access Dashboard
                        </button>
                    </form>
                    
                    <div className="mt-6 text-center">
                        <Link href="/" className="text-amber-400 hover:text-amber-300 text-sm">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Menu CRUD
    const handleMenuSubmit = (e) => {
        e.preventDefault();
        const formData = {
            ...menuForm,
            price: Number(menuForm.price), // Ensure price is a number
            stock: Number(menuForm.stock)  // Ensure stock is a number
        };
        
        if (editingItem) {
            updateMenuItem(editingItem.id, formData);
        } else {
            addMenuItem(formData);
        }
        loadData();
        resetMenuForm();
    };

    const handleEditMenu = (item) => {
        setEditingItem(item);
        setMenuForm({
            name: item.name,
            desc: item.desc,
            price: item.price,
            category: item.category,
            tag: item.tag || '',
            image: item.image,
            stock: item.stock,
            isToGo: item.isToGo
        });
        setShowMenuModal(true);
    };

    const handleDeleteMenu = (id) => {
        if (confirm('Are you sure you want to delete this item?')) {
            deleteMenuItem(id);
            loadData();
        }
    };

    const resetMenuForm = () => {
        setMenuForm({
            name: '',
            desc: '',
            price: '',
            category: 'BreakFast & Appetizers',
            tag: '',
            image: '/gallery/hot-tea.png',
            stock: 20,
            isToGo: false
        });
        setEditingItem(null);
        setShowMenuModal(false);
    };

    // Reservation actions
    const handleReservationStatus = (id, status) => {
        updateReservation(id, { status });
        loadData();
    };

    const handleDeleteReservation = (id) => {
        if (confirm('Are you sure you want to delete this reservation?')) {
            deleteReservation(id);
            loadData();
        }
    };

    // User actions - Delete from Firebase
    const handleDeleteUser = async (id) => {
        if (confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteFirestoreUser(id);
                await loadFirebaseUsers(); // Reload users from Firebase
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Failed to delete user. Please try again.');
            }
        }
    };

    // Filter functions
    const filteredMenuItems = menuItems.filter(item => 
        item && (item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const filteredReservations = reservations.filter(r => {
        const matchesSearch = r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             r.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || r.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const filteredUsers = users.filter(u =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Render tabs
    const renderDashboard = () => (
        <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    icon={<FaUtensils />} 
                    title="Menu Items" 
                    value={stats.totalMenuItems || menuItems.length} 
                    color="bg-amber-500" 
                />
                <StatCard 
                    icon={<FaCalendarAlt />} 
                    title="Reservations" 
                    value={stats.totalReservations || 0}
                    subtitle={`${stats.pendingReservations || 0} pending`}
                    color="bg-blue-500" 
                />
                <StatCard 
                    icon={<FaUsers />} 
                    title="Registered Users" 
                    value={users.length} 
                    subtitle="from Firebase"
                    color="bg-green-500" 
                />
                <StatCard 
                    icon={<FaMoneyBillWave />} 
                    title="Total Revenue" 
                    value={`FCFA ${(stats.totalRevenue || 0).toLocaleString()}`} 
                    color="bg-purple-500" 
                />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Reservations */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FaCalendarAlt className="text-amber-500" /> Recent Reservations
                    </h3>
                    <div className="space-y-3">
                        {reservations.slice(0, 5).map(r => (
                            <div key={r.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium">{r.name}</p>
                                    <p className="text-xs text-gray-500">{r.date} at {r.time}</p>
                                </div>
                                <StatusBadge status={r.status} />
                            </div>
                        ))}
                        {reservations.length === 0 && (
                            <p className="text-gray-400 text-center py-4">No reservations yet</p>
                        )}
                    </div>
                </div>

                {/* Recent Users */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FaUsers className="text-green-500" /> Recent Users
                    </h3>
                    <div className="space-y-3">
                        {users.slice(0, 5).map(u => (
                            <div key={u.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    {u.photoURL ? (
                                        <img src={u.photoURL} alt={u.name} className="w-10 h-10 rounded-full object-cover" />
                                    ) : (
                                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold">
                                            {u.name?.charAt(0)?.toUpperCase() || u.email?.charAt(0)?.toUpperCase()}
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-medium">{u.name || 'User'}</p>
                                        <p className="text-xs text-gray-500">{u.email}</p>
                                    </div>
                                </div>
                                <span className="text-[10px] px-2 py-1 rounded-full bg-gray-200 text-gray-600 capitalize">{u.provider}</span>
                            </div>
                        ))}
                        {users.length === 0 && (
                            <p className="text-gray-400 text-center py-4">
                                {loadingUsers ? 'Loading users...' : 'No users yet'}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderMenuManagement = () => (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search menu items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                </div>
                <button
                    onClick={() => setShowMenuModal(true)}
                    className="flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-semibold"
                >
                    <FaPlus /> Add Menu Item
                </button>
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMenuItems.map(item => (
                    <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative h-40 bg-gray-100">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            {item.tag && (
                                <span className="absolute top-2 right-2 bg-amber-600 text-white text-[10px] px-2 py-1 rounded font-bold">
                                    {item.tag}
                                </span>
                            )}
                            {item.isToGo && (
                                <span className="absolute top-2 left-2 bg-green-600 text-white text-[10px] px-2 py-1 rounded font-bold">
                                    TO-GO
                                </span>
                            )}
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                <span className="text-amber-600 font-bold">FCFA {item.price}</span>
                            </div>
                            <p className="text-xs text-gray-500 mb-2 line-clamp-2">{item.desc}</p>
                            <p className="text-[10px] text-gray-400 mb-3">{item.category}</p>
                            <div className="flex items-center justify-between">
                                <span className={`text-xs ${item.stock > 5 ? 'text-green-600' : item.stock > 0 ? 'text-amber-600' : 'text-red-600'}`}>
                                    Stock: {item.stock}
                                </span>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => handleEditMenu(item)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteMenu(item.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Menu Modal - Beautifully Redesigned */}
            {showMenuModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-serif">
                                        {editingItem ? 'Edit Menu Item' : 'Add New Dish'}
                                    </h2>
                                    <p className="text-zinc-400 text-sm mt-1">
                                        {editingItem ? 'Update the details below' : 'Create a new culinary masterpiece'}
                                    </p>
                                </div>
                                <button 
                                    onClick={resetMenuForm}
                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleMenuSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left Column */}
                                <div className="space-y-5">
                                    {/* Name Input */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                            <FaUtensils className="text-amber-600" /> Dish Name
                                        </label>
                                        <input
                                            type="text"
                                            value={menuForm.name}
                                            onChange={(e) => setMenuForm({...menuForm, name: e.target.value})}
                                            placeholder="e.g. Grilled Salmon Teriyaki"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-0 transition-colors"
                                            required
                                        />
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                            <FaEdit className="text-amber-600" /> Description
                                        </label>
                                        <textarea
                                            value={menuForm.desc}
                                            onChange={(e) => setMenuForm({...menuForm, desc: e.target.value})}
                                            placeholder="Describe the dish, its flavors, and what makes it special..."
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-0 transition-colors resize-none"
                                            rows={4}
                                            required
                                        />
                                    </div>

                                    {/* Price & Stock */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                                <FaMoneyBillWave className="text-amber-600" /> Price
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">FCFA</span>
                                                <input
                                                    type="number"
                                                    value={menuForm.price}
                                                    onChange={(e) => setMenuForm({...menuForm, price: Number(e.target.value)})}
                                                    placeholder="0"
                                                    className="w-full pl-14 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-0 transition-colors"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                                <FaBoxes className="text-amber-600" /> Stock
                                            </label>
                                            <input
                                                type="number"
                                                value={menuForm.stock}
                                                onChange={(e) => setMenuForm({...menuForm, stock: Number(e.target.value)})}
                                                placeholder="0"
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-0 transition-colors"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-5">
                                    {/* Category */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                            <FaUtensils className="text-amber-600" /> Category
                                        </label>
                                        <select
                                            value={menuForm.category}
                                            onChange={(e) => setMenuForm({...menuForm, category: e.target.value})}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-0 transition-colors bg-white"
                                        >
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Tag */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                            <FaTag className="text-amber-600" /> Special Tag
                                        </label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {tags.map(tag => (
                                                <button
                                                    key={tag || 'none'}
                                                    type="button"
                                                    onClick={() => setMenuForm({...menuForm, tag: tag})}
                                                    className={`px-3 py-2 text-xs font-semibold rounded-lg border-2 transition-all ${
                                                        menuForm.tag === tag 
                                                            ? 'border-amber-500 bg-amber-50 text-amber-700' 
                                                            : 'border-gray-200 hover:border-gray-300 text-gray-600'
                                                    }`}
                                                >
                                                    {tag || 'None'}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Image Selection */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                            <FaImage className="text-amber-600" /> Image
                                        </label>
                                        
                                        {/* Quick Select from Gallery */}
                                        <div className="mb-3">
                                            <select
                                                value={menuForm.image.startsWith('/gallery/') ? menuForm.image : ''}
                                                onChange={(e) => {
                                                    if (e.target.value) {
                                                        setMenuForm({...menuForm, image: e.target.value});
                                                    }
                                                }}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-0 transition-colors bg-white"
                                            >
                                                <option value="">-- Select from gallery --</option>
                                                <option value="/gallery/hot-tea.png">Hot Tea</option>
                                                <option value="/gallery/black-coffee.png">Black Coffee</option>
                                                <option value="/gallery/delicious-burger.png">Delicious Burger</option>
                                                <option value="/gallery/pasta-plating.png">Pasta</option>
                                                <option value="/gallery/noddles.png">Noodles</option>
                                                <option value="/gallery/rice sauce.png">Rice & Sauce</option>
                                                <option value="/gallery/spaghetti-spark.png">Spaghetti</option>
                                                <option value="/gallery/ndolle-platain.png">Ndolé & Plantain</option>
                                                <option value="/gallery/eru-apark.png">Eru</option>
                                                <option value="/gallery/achu-spark.png">Achu</option>
                                                <option value="/gallery/friedplantain-beans.png">Fried Plantain & Beans</option>
                                                <option value="/gallery/vegetable-fufucorn.png">Vegetable Fufu Corn</option>
                                                <option value="/gallery/spark-eggs.png">Eggs</option>
                                                <option value="/gallery/toastedbread-tea.png">Toast & Tea</option>
                                                <option value="/gallery/dessert-trio.png">Dessert Trio</option>
                                                <option value="/gallery/fresh-oysters.png">Fresh Oysters</option>
                                                <option value="/gallery/natual juice.png">Natural Juice</option>
                                                <option value="/gallery/guinness.png">Guinness</option>
                                                <option value="/gallery/heeneken.png">Heineken</option>
                                                <option value="/gallery/smoked-drink.png">Smoked Drink</option>
                                                <option value="/gallery/redwine-collection.png">Red Wine</option>
                                                <option value="/gallery/whisky-collection.png">Whisky</option>
                                                <option value="/gallery/softdrink-collection.png">Soft Drinks</option>
                                            </select>
                                            <p className="text-xs text-gray-500 mt-1 text-center">or enter custom URL below</p>
                                        </div>
                                        
                                        {/* URL Input */}
                                        <input
                                            type="text"
                                            value={menuForm.image}
                                            onChange={(e) => setMenuForm({...menuForm, image: e.target.value})}
                                            placeholder="Enter image URL or path"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-0 transition-colors"
                                        />
                                        
                                        {/* Image Preview */}
                                        {menuForm.image && (
                                            <div className="mt-3 relative h-24 w-24 rounded-lg overflow-hidden border-2 border-gray-200">
                                                <img 
                                                    src={menuForm.image} 
                                                    alt="Preview" 
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => e.target.src = '/gallery/hot-tea.png'}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* To-Go Toggle */}
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                                                <FaTruck className="text-amber-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800">To-Go Available</p>
                                                <p className="text-xs text-gray-500">Can be ordered for takeaway</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={menuForm.isToGo}
                                                onChange={(e) => setMenuForm({...menuForm, isToGo: e.target.checked})}
                                                className="sr-only peer"
                                            />
                                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-amber-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={resetMenuForm}
                                    className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all font-semibold shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
                                >
                                    <FaPlus /> {editingItem ? 'Update Dish' : 'Add to Menu'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );

    const renderReservations = () => (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search reservations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <FaFilter className="text-gray-400" />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Reservations Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Guest</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date & Time</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Party Size</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredReservations.map(r => (
                                <tr key={r.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium text-gray-800">{r.name}</p>
                                            <p className="text-xs text-gray-500">{r.email}</p>
                                            <p className="text-xs text-gray-500">{r.phone}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-medium">{r.date}</p>
                                        <p className="text-xs text-gray-500">{r.time}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-medium">{r.guests} guests</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={r.status} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {r.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleReservationStatus(r.id, 'confirmed')}
                                                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                        title="Confirm"
                                                    >
                                                        <FaCheck />
                                                    </button>
                                                    <button
                                                        onClick={() => handleReservationStatus(r.id, 'cancelled')}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Cancel"
                                                    >
                                                        <FaTimes />
                                                    </button>
                                                </>
                                            )}
                                            <button
                                                onClick={() => handleDeleteReservation(r.id)}
                                                className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredReservations.length === 0 && (
                        <div className="text-center py-12 text-gray-400">
                            <FaCalendarAlt className="text-4xl mx-auto mb-4" />
                            <p>No reservations found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    const renderUsers = () => (
        <div className="space-y-6">
            {/* Header with Refresh Button */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                </div>
                <button
                    onClick={loadFirebaseUsers}
                    disabled={loadingUsers}
                    className="flex items-center gap-2 px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
                >
                    {loadingUsers ? <FaSpinner className="animate-spin" /> : <FaUsers />}
                    {loadingUsers ? 'Loading...' : 'Refresh Users'}
                </button>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-100 flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <FaEnvelope className="text-blue-600" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-800">{users.filter(u => u.provider === 'email').length}</p>
                        <p className="text-xs text-gray-500">Email Users</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100 flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <FaGoogle className="text-red-500" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-800">{users.filter(u => u.provider === 'google').length}</p>
                        <p className="text-xs text-gray-500">Google Users</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100 flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                        <FaGithub className="text-white" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-800">{users.filter(u => u.provider === 'github').length}</p>
                        <p className="text-xs text-gray-500">GitHub Users</p>
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {loadingUsers && (
                <div className="flex items-center justify-center py-12 bg-white rounded-xl">
                    <div className="flex flex-col items-center gap-4">
                        <FaSpinner className="text-4xl text-amber-500 animate-spin" />
                        <p className="text-gray-500">Loading users from Firebase...</p>
                    </div>
                </div>
            )}

            {/* Users Grid */}
            {!loadingUsers && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUsers.map(user => (
                        <div key={user.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                            {/* Header with Provider Badge */}
                            <div className="relative h-20 bg-gradient-to-r from-amber-500 to-amber-600">
                                {/* Provider Badge */}
                                <div className="absolute top-3 right-3">
                                    {user.provider === 'google' && (
                                        <span className="flex items-center gap-1 bg-white px-2 py-1 rounded-full text-[10px] font-bold text-gray-700">
                                            <FaGoogle className="text-red-500" /> Google
                                        </span>
                                    )}
                                    {user.provider === 'github' && (
                                        <span className="flex items-center gap-1 bg-gray-800 px-2 py-1 rounded-full text-[10px] font-bold text-white">
                                            <FaGithub /> GitHub
                                        </span>
                                    )}
                                    {user.provider === 'email' && (
                                        <span className="flex items-center gap-1 bg-blue-500 px-2 py-1 rounded-full text-[10px] font-bold text-white">
                                            <FaEnvelope /> Email
                                        </span>
                                    )}
                                </div>
                            </div>
                            
                            {/* Avatar */}
                            <div className="relative -mt-10 flex justify-center">
                                {user.photoURL ? (
                                    <img 
                                        src={user.photoURL} 
                                        alt={user.name} 
                                        className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
                                    />
                                ) : (
                                    <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white">
                                            {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase()}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* User Info */}
                            <div className="p-6 pt-4 text-center">
                                <h3 className="font-semibold text-lg text-gray-800">{user.name || 'Anonymous User'}</h3>
                                <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <div className="flex items-center justify-between text-xs text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <FaClock /> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                        </span>
                                        <span className="font-mono text-[10px]">ID: {user.uid?.slice(0, 8)}...</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-4 flex gap-2">
                                    <button
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="flex-1 flex items-center justify-center gap-2 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-sm"
                                    >
                                        <FaTrash className="text-xs" /> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loadingUsers && filteredUsers.length === 0 && (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                    <FaUserCircle className="text-6xl text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Users Found</h3>
                    <p className="text-gray-500 mb-6">Users will appear here when they sign up.</p>
                    <button
                        onClick={loadFirebaseUsers}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                    >
                        <FaUsers /> Refresh Users
                    </button>
                </div>
            )}
        </div>
    );

    const renderOrders = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Items</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.map(order => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-mono text-sm">{order.id}</td>
                                    <td className="px-6 py-4">{order.items?.length || 0} items</td>
                                    <td className="px-6 py-4 font-semibold text-amber-600">FCFA {order.total?.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={order.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {orders.length === 0 && (
                        <div className="text-center py-12 text-gray-400">
                            <FaShoppingBag className="text-4xl mx-auto mb-4" />
                            <p>No orders yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-zinc-900 text-white fixed h-full">
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-xl font-serif tracking-widest text-amber-500">THE ESSENCE</h1>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Admin Dashboard</p>
                </div>
                <nav className="p-4 space-y-2">
                    <SidebarItem 
                        icon={<FaChartLine />} 
                        label="Dashboard" 
                        active={activeTab === 'dashboard'}
                        onClick={() => { setActiveTab('dashboard'); setSearchTerm(''); }}
                    />
                    <SidebarItem 
                        icon={<FaUtensils />} 
                        label="Menu Items" 
                        active={activeTab === 'menu'}
                        onClick={() => { setActiveTab('menu'); setSearchTerm(''); }}
                    />
                    <SidebarItem 
                        icon={<FaCalendarAlt />} 
                        label="Reservations" 
                        badge={stats.pendingReservations}
                        active={activeTab === 'reservations'}
                        onClick={() => { setActiveTab('reservations'); setSearchTerm(''); setFilterStatus('all'); }}
                    />
                    <SidebarItem 
                        icon={<FaUsers />} 
                        label="Users" 
                        active={activeTab === 'users'}
                        onClick={() => { setActiveTab('users'); setSearchTerm(''); }}
                    />
                    <SidebarItem 
                        icon={<FaShoppingBag />} 
                        label="Orders" 
                        active={activeTab === 'orders'}
                        onClick={() => { setActiveTab('orders'); setSearchTerm(''); }}
                    />
                </nav>
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                    <Link href="/" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors py-2">
                        <FaHome /> Back to Website
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1 p-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 capitalize">{activeTab}</h2>
                    <p className="text-gray-500 text-sm">Manage your restaurant operations</p>
                </div>

                {activeTab === 'dashboard' && renderDashboard()}
                {activeTab === 'menu' && renderMenuManagement()}
                {activeTab === 'reservations' && renderReservations()}
                {activeTab === 'users' && renderUsers()}
                {activeTab === 'orders' && renderOrders()}
            </main>
        </div>
    );
};

// Helper Components
const StatCard = ({ icon, title, value, subtitle, color }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-4">
            <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white text-xl`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
                {subtitle && <p className="text-xs text-amber-600">{subtitle}</p>}
            </div>
        </div>
    </div>
);

const SidebarItem = ({ icon, label, active, badge, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
            active ? 'bg-amber-600 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
        }`}
    >
        <div className="flex items-center gap-3">
            {icon}
            <span className="font-medium">{label}</span>
        </div>
        {badge > 0 && (
            <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                {badge}
            </span>
        )}
    </button>
);

const StatusBadge = ({ status }) => {
    const styles = {
        pending: 'bg-yellow-100 text-yellow-700',
        confirmed: 'bg-green-100 text-green-700',
        cancelled: 'bg-red-100 text-red-700',
        completed: 'bg-blue-100 text-blue-700'
    };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
            {status}
        </span>
    );
};

export default AdminDashboard;
