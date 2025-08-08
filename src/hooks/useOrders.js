import { useState, useEffect } from 'react';
import { mockOrders } from '../data/mockData';
import { generateOrderId } from '../utils/validation';

export const useOrders = (userId) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('adscreenhub_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Initialize with mock orders for the user
      const userOrders = mockOrders.filter(order => order.userId === userId);
      setOrders(userOrders);
      localStorage.setItem('adscreenhub_orders', JSON.stringify(userOrders));
    }
    setLoading(false);
  }, [userId]);

  // Create new order
  const createOrder = (orderData) => {
    const newOrder = {
      id: generateOrderId(),
      userId,
      orderDate: new Date().toISOString().split('T')[0],
      status: 'Pending Approval',
      ...orderData
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('adscreenhub_orders', JSON.stringify(updatedOrders));

    return { success: true, order: newOrder };
  };

  // Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    
    setOrders(updatedOrders);
    localStorage.setItem('adscreenhub_orders', JSON.stringify(updatedOrders));

    return { success: true };
  };

  // Cancel order
  const cancelOrder = (orderId) => {
    return updateOrderStatus(orderId, 'Cancelled Display');
  };

  // Revise order design
  const reviseOrder = (orderId, newDesignFile, newSupportingDoc) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { 
        ...order, 
        designFile: newDesignFile,
        supportingDoc: newSupportingDoc,
        status: 'Pending Approval'
      } : order
    );
    
    setOrders(updatedOrders);
    localStorage.setItem('adscreenhub_orders', JSON.stringify(updatedOrders));

    return { success: true };
  };

  // Get order by ID
  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  // Get orders by status
  const getOrdersByStatus = (status) => {
    return orders.filter(order => order.status === status);
  };

  // Check if screen is already booked for a specific date
  const isScreenBooked = (screenId, date) => {
    return orders.some(order => 
      order.screenId === screenId && 
      order.displayDate === date && 
      order.status !== 'Cancelled Display'
    );
  };

  // Get all booked screens for a specific date
  const getBookedScreensForDate = (date) => {
    return orders
      .filter(order => 
        order.displayDate === date && 
        order.status !== 'Cancelled Display'
      )
      .map(order => order.screenId);
  };

  return {
    orders,
    loading,
    createOrder,
    updateOrderStatus,
    cancelOrder,
    reviseOrder,
    getOrderById,
    getOrdersByStatus,
    isScreenBooked,
    getBookedScreensForDate
  };
};
