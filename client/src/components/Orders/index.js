import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header';
import './index.css';

const statusFilters = ['All', 'Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [activeStatus, setActiveStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [activeStatus, currentPage]);

  // 1. Define the base URL once
  const BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://restaurant-app-ine9.onrender.com'; // <--- Replace with your Render URL

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const statusParam = activeStatus === 'All' ? '' : activeStatus;
      // 2. Use the BASE_URL variable here
      const response = await axios.get(
        `${BASE_URL}/api/orders?status=${statusParam}&page=${currentPage}&limit=5`
      );
      setOrders(response.data.orders);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      // 3. And use the BASE_URL variable here too
      await axios.patch(`${BASE_URL}/api/orders/${orderId}/status`, { status: newStatus });
      
      setOrders(prevOrders =>
        prevOrders.map(order => (order._id === orderId ? { ...order, status: newStatus } : order))
      );
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const toggleExpand = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  return (
    <>
      <Header />
      {isLoading? (
        <p>Loading Orders...</p> // Now 'isLoading' is "used"
      ): (
      <div className="orders-container">
        <h1 className="dashboard-title">Orders Dashboard</h1>

        {/* Status Filter Tabs */}
        <div className="status-tabs">
          {statusFilters.map(status => (
            <button
              key={status}
              className={`status-tab ${activeStatus === status ? 'active-status' : ''}`}
              onClick={() => { setActiveStatus(status); setCurrentPage(1); }}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="orders-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <React.Fragment key={order._id}>
                  <tr className="order-row" onClick={() => toggleExpand(order._id)}>
                    <td>#{order.orderNumber}</td>
                    <td>{order.customerName}</td>
                    <td>${order.totalAmount}</td>
                    <td>
                      <span className={`status-badge ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <select 
                        value={order.status} 
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        className="status-dropdown"
                      >
                        {statusFilters.slice(1).map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                  
                  {/* Expanded Order View */}
                  {expandedOrderId === order._id && (
                    <tr className="expanded-row">
                      <td colSpan="5">
                        <div className="order-details">
                          <h4>Items Ordered:</h4>
                          <ul>
                            {order.items.map((item, idx) => (
                              <li key={idx}>
                                {item.menuItem?.name} x {item.quantity} - ${item.price * item.quantity}
                              </li>
                            ))}
                          </ul>
                          <p><strong>Table Number:</strong> {order.tableNumber}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="pagination-container">
          <button 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="pag-btn"
          >
            Prev
          </button>
          <span className="page-info">Page {currentPage} of {totalPages}</span>
          <button 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="pag-btn"
          >
            Next
          </button>
        </div>
      </div>)}
    </>
  );
};

export default Orders;