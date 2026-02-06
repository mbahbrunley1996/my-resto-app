// src/lib/localStorage.js
// LocalStorage Database Utility for THE ESSENCE

const KEYS = {
    MENU_ITEMS: 'essence_menu_items',
    RESERVATIONS: 'essence_reservations',
    USERS: 'essence_users',
    ORDERS: 'essence_orders'
};

// ============ GENERIC HELPERS ============

export const getFromStorage = (key) => {
    if (typeof window === 'undefined') return [];
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error(`Error reading from localStorage (${key}):`, error);
        return [];
    }
};

export const saveToStorage = (key, data) => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error saving to localStorage (${key}):`, error);
    }
};

// ============ MENU ITEMS ============

export const getMenuItems = () => getFromStorage(KEYS.MENU_ITEMS);

export const saveMenuItems = (items) => saveToStorage(KEYS.MENU_ITEMS, items);

export const addMenuItem = (item) => {
    const items = getMenuItems();
    const newItem = {
        ...item,
        id: Date.now(),
        createdAt: new Date().toISOString()
    };
    items.push(newItem);
    saveMenuItems(items);
    return newItem;
};

export const updateMenuItem = (id, updates) => {
    const items = getMenuItems().filter(item => item !== null);
    const index = items.findIndex(item => item && (item.id === id || item.id === Number(id) || String(item.id) === String(id)));
    if (index !== -1) {
        items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
        saveMenuItems(items);
        return items[index];
    }
    return null;
};

export const deleteMenuItem = (id) => {
    const items = getMenuItems().filter(item => item !== null);
    const filtered = items.filter(item => {
        if (!item) return false;
        const itemId = item.id;
        return itemId !== id && itemId !== Number(id) && String(itemId) !== String(id);
    });
    saveMenuItems(filtered);
    return filtered;
};

// ============ RESERVATIONS ============

export const getReservations = () => getFromStorage(KEYS.RESERVATIONS);

export const saveReservations = (reservations) => saveToStorage(KEYS.RESERVATIONS, reservations);

export const addReservation = (reservation) => {
    const reservations = getReservations();
    const newReservation = {
        ...reservation,
        id: Date.now(),
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    reservations.push(newReservation);
    saveReservations(reservations);
    return newReservation;
};

export const updateReservation = (id, updates) => {
    const reservations = getReservations();
    const index = reservations.findIndex(r => r.id === id);
    if (index !== -1) {
        reservations[index] = { ...reservations[index], ...updates };
        saveReservations(reservations);
        return reservations[index];
    }
    return null;
};

export const deleteReservation = (id) => {
    const reservations = getReservations();
    const filtered = reservations.filter(r => r.id !== id);
    saveReservations(filtered);
    return filtered;
};

// ============ USERS ============

export const getUsers = () => getFromStorage(KEYS.USERS);

export const saveUsers = (users) => saveToStorage(KEYS.USERS, users);

export const addUser = (user) => {
    const users = getUsers();
    const newUser = {
        ...user,
        id: Date.now(),
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    saveUsers(users);
    return newUser;
};

export const deleteUser = (id) => {
    const users = getUsers();
    const filtered = users.filter(u => u.id !== id);
    saveUsers(filtered);
    return filtered;
};

// ============ ORDERS ============

export const getOrders = () => getFromStorage(KEYS.ORDERS);

export const saveOrders = (orders) => saveToStorage(KEYS.ORDERS, orders);

export const addOrder = (order) => {
    const orders = getOrders();
    const newOrder = {
        ...order,
        id: `ESS-${Math.floor(100000 + Math.random() * 900000)}`,
        status: 'completed',
        createdAt: new Date().toISOString()
    };
    orders.push(newOrder);
    saveOrders(orders);
    return newOrder;
};

// ============ STATS ============

export const getDashboardStats = () => {
    const menuItems = getMenuItems();
    const reservations = getReservations();
    const users = getUsers();
    const orders = getOrders();
    
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    const pendingReservations = reservations.filter(r => r.status === 'pending').length;
    const confirmedReservations = reservations.filter(r => r.status === 'confirmed').length;
    
    return {
        totalMenuItems: menuItems.length,
        totalReservations: reservations.length,
        pendingReservations,
        confirmedReservations,
        totalUsers: users.length,
        totalOrders: orders.length,
        totalRevenue
    };
};
