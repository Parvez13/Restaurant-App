const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MenuItem = require('./models/MenuItem'); 
const Order = require('./models/Order');

dotenv.config();

const sampleMenuItems = [
  // Appetizers
  { name: "Crispy Spring Rolls", description: "Vegetable filled rolls with sweet chili sauce", category: "Appetizer", price: 8, ingredients: ["Flour", "Cabbage", "Carrots"], preparationTime: 10, imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=500", isAvailable: true },
  { name: "Garlic Bruschetta", description: "Toasted bread topped with tomato and basil", category: "Appetizer", price: 7, ingredients: ["Bread", "Garlic", "Tomato"], preparationTime: 8, imageUrl: "https://images.unsplash.com/photo-1572656631137-7935297eff55?q=80&w=500", isAvailable: true },
  { name: "Chicken Wings", description: "Spicy buffalo wings with blue cheese dip", category: "Appetizer", price: 12, ingredients: ["Chicken", "Buffalo Sauce"], preparationTime: 15, imageUrl: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=500", isAvailable: true },
  { name: "Crispy Vegetable Sliders", description: "Mini vegetable patties with spicy mayo", category: "Appetizer", price: 11.00, ingredients: ["Vegetables", "Flour"], preparationTime: 15, imageUrl: "https://images.unsplash.com/photo-1521305916504-4a1121188589?q=80&w=800", isAvailable: true },

  // MAIN COURSES
  { name: "Margherita Pizza", description: "Classic tomato and mozzarella pizza", category: "Main Course", price: 15, ingredients: ["Dough", "Mozzarella"], preparationTime: 20, imageUrl: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=500", isAvailable: true },
  { name: "Beef Burger", description: "Gourmet beef patty with caramelized onions", category: "Main Course", price: 18, ingredients: ["Beef", "Bun"], preparationTime: 15, imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500", isAvailable: true },
  { name: "Pesto Pasta", description: "Creamy basil pesto with penne", category: "Main Course", price: 14, ingredients: ["Penne", "Basil"], preparationTime: 12, imageUrl: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=500", isAvailable: true },
  { name: "Grilled Salmon", description: "Fresh salmon with asparagus", category: "Main Course", price: 22, ingredients: ["Salmon", "Asparagus"], preparationTime: 25, imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=500", isAvailable: true },
  { name: "Classic Chicken Curry", description: "Tender chicken in rich gravy", category: "Main Course", price: 16.50, ingredients: ["Chicken", "Spices"], preparationTime: 25, imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800", isAvailable: true },

  // DESSERTS
  { name: "Warm Chocolate Brownie", description: "Dense, fudgy brownie", category: "Dessert", price: 8.50, ingredients: ["Chocolate", "Butter"], preparationTime: 10, imageUrl: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?q=80&w=800", isAvailable: true },
  { name: "New York Cheesecake", description: "Classic creamy cheesecake", category: "Dessert", price: 8, ingredients: ["Cream Cheese", "Biscuits"], preparationTime: 5, imageUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=500", isAvailable: true },
  { name: "Tiramisu", description: "Italian coffee-flavored dessert", category: "Dessert", price: 10, ingredients: ["Mascarpone", "Coffee"], preparationTime: 5, imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=500", isAvailable: true },

  // BEVERAGES
  { name: "Iced Caramel Latte", description: "Cold brew with milk", category: "Beverage", price: 6, ingredients: ["Coffee", "Milk"], preparationTime: 5, imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=500", isAvailable: true },
  { name: "Fresh Orange Juice", description: "100% natural orange juice", category: "Beverage", price: 5.00, ingredients: ["Oranges"], preparationTime: 3, imageUrl: "https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=800", isAvailable: true },
  { name: "Lemon Mint Mojito", description: "Refreshing soda with lime", category: "Beverage", price: 5, ingredients: ["Soda", "Lime"], preparationTime: 5, imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=500", isAvailable: true }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Atlas...");

    await MenuItem.deleteMany({});
    await Order.deleteMany({});
    console.log("Old data cleared.");

    // STEP 2: Insert Menu Items first to get their IDs
    const createdItems = await MenuItem.insertMany(sampleMenuItems);
    console.log(`${createdItems.length} Menu Items inserted.`);

    // STEP 3: Define Orders INSIDE the function so it can use createdItems
    const sampleOrders = [
      {
        orderNumber: "ORD-1001",
        items: [
          { menuItem: createdItems[0]._id, quantity: 2, price: createdItems[0].price },
          { menuItem: createdItems[2]._id, quantity: 1, price: createdItems[2].price }
        ],
        totalAmount: (createdItems[0].price * 2) + createdItems[2].price,
        status: 'Preparing',
        customerName: "John Doe",
        tableNumber: 4
      },
      {
        orderNumber: "ORD-1002",
        items: [{ menuItem: createdItems[1]._id, quantity: 1, price: createdItems[1].price }],
        totalAmount: createdItems[1].price,
        status: 'Pending',
        customerName: "Jane Smith",
        tableNumber: 10
      },
      {
        orderNumber: "ORD-1003",
        items: [
          { menuItem: createdItems[4]._id, quantity: 1, price: createdItems[4].price },
          { menuItem: createdItems[12]._id, quantity: 2, price: createdItems[12].price }
        ],
        totalAmount: createdItems[4].price + (createdItems[12].price * 2),
        status: 'Ready',
        customerName: "Robert Brown",
        tableNumber: 2
      },
      {
        orderNumber: "ORD-1004",
        items: [{ menuItem: createdItems[5]._id, quantity: 1, price: createdItems[5].price }],
        totalAmount: createdItems[5].price,
        status: 'Delivered',
        customerName: "Emily Davis",
        tableNumber: 7
      },
      {
        orderNumber: "ORD-1005",
        items: [{ menuItem: createdItems[3]._id, quantity: 3, price: createdItems[3].price }],
        totalAmount: createdItems[3].price * 3,
        status: 'Cancelled',
        customerName: "Michael Wilson",
        tableNumber: 15
      },
      {
        orderNumber: "ORD-1006",
        items: [
          { menuItem: createdItems[6]._id, quantity: 1, price: createdItems[6].price },
          { menuItem: createdItems[7]._id, quantity: 1, price: createdItems[7].price }
        ],
        totalAmount: createdItems[6].price + createdItems[7].price,
        status: 'Preparing',
        customerName: "Sarah Miller",
        tableNumber: 3
      },
      {
        orderNumber: "ORD-1007",
        items: [{ menuItem: createdItems[14]._id, quantity: 4, price: createdItems[14].price }],
        totalAmount: createdItems[14].price * 4,
        status: 'Pending',
        customerName: "David Garcia",
        tableNumber: 12
      },
      {
        orderNumber: "ORD-1008",
        items: [
          { menuItem: createdItems[8]._id, quantity: 1, price: createdItems[8].price },
          { menuItem: createdItems[10]._id, quantity: 1, price: createdItems[10].price },
          { menuItem: createdItems[13]._id, quantity: 1, price: createdItems[13].price }
        ],
        totalAmount: createdItems[8].price + createdItems[10].price + createdItems[13].price,
        status: 'Ready',
        customerName: "Chris Taylor",
        tableNumber: 1
      },
      {
        orderNumber: "ORD-1009",
        items: [{ menuItem: createdItems[9]._id, quantity: 2, price: createdItems[9].price }],
        totalAmount: createdItems[9].price * 2,
        status: 'Delivered',
        customerName: "Jessica Lee",
        tableNumber: 9
      },
      {
        orderNumber: "ORD-1010",
        items: [{ menuItem: createdItems[11]._id, quantity: 1, price: createdItems[11].price }],
        totalAmount: createdItems[11].price,
        status: 'Pending',
        customerName: "Mark Anderson",
        tableNumber: 6
      }
    ];

    await Order.insertMany(sampleOrders);
    console.log("Sample Orders inserted.");

    console.log("✅ Database seeding complete!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
};

seedDB();