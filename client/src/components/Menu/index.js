import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header';
import useDebounce from '../../hooks/useDebounce';
import './index.css';

const categoriesList = [
  { id: 'Appetizer', displayText: 'Appetizers' },
  { id: 'Main Course', displayText: 'Main Course' },
  { id: 'Dessert', displayText: 'Desserts' },
  { id: 'Beverage', displayText: 'Beverages' },
];

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    const getMenuItems = async () => {
  setIsLoading(true);
  try {
    // 1. Define which URL to use
    const baseUrl = window.location.hostname === 'localhost' 
      ? 'http://localhost:5000' 
      : 'https://your-backend-name.onrender.com'; // <--- Paste your Render URL here

    // 2. Use the variable instead of the hardcoded string
    let url = `${baseUrl}/api/menu?category=${activeCategory}`;
    
    if (debouncedSearch) {
      url = `${baseUrl}/api/menu/search?q=${debouncedSearch}`;
    }

    const response = await axios.get(url);
    setMenuItems(response.data);
  } catch (error) {
    console.error("Error fetching menu:", error);
  } finally {
    setIsLoading(false);
  }
};

    getMenuItems();
  }, [debouncedSearch, activeCategory]);

  return (
    <>
      <Header />
      <div className="menu-container">
        {/* Search Bar Section */}
        <div className="search-container">
          <input
            type="search"
            className="search-input"
            placeholder="Search for a dish or ingredient..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        {/* Category Tabs (BookHub Style) */}
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeCategory === '' ? 'active-tab' : ''}`}
            onClick={() => setActiveCategory('')}
          >
            All
          </button>
          {categoriesList.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeCategory === tab.id ? 'active-tab' : ''}`}
              onClick={() => setActiveCategory(tab.id)}
            >
              {tab.displayText}
            </button>
          ))}
        </div>

        {/* Dish Grid */}
        <div className="dishes-grid">
          {isLoading ? (
            <div className="loader">Loading...</div>
          ) : (
            menuItems.map(dish => (
              <div key={dish._id} className="dish-card">
                <img src={dish.imageUrl} alt={dish.name} className="dish-image" />
                <div className="dish-info">
                  <h1 className="dish-name">{dish.name}</h1>
                  <p className="dish-category">{dish.category}</p>
                  <p className="dish-price">${dish.price}</p>
                  <div className={`status ${dish.isAvailable ? 'available' : 'unavailable'}`}>
                    {dish.isAvailable ? 'Available' : 'Out of Stock'}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Menu;