# Restaurant Management System
A full-stack MERN (MongoDB, Express, React, Node.js) application designed for seamless restaurant operations. This project features a dynamic menu management system and a real-time orders dashboard with status tracking.

🚀 Live Demo
Frontend (Netlify): restaurant-app-lime-omega.vercel.app
Backend API (Render): https://restaurant-app-ine9.onrender.com

✨ Features🍱

- Menu ManagementCategory Filtering: Browse dishes by category (All, Starters, Main Course, etc.).
- Live Search: Debounced search bar to find dishes instantly.
- Responsive Grid: Optimized for mobile, tablet, and desktop views.📋 Orders DashboardOrder Tracking: View all customer orders with status-specific badges.
- Status Management: Update orders (Pending → Preparing → Ready) via dropdowns.Expanded Details: Click any order row to view specific items and quantities.
- Pagination: Smooth navigation through order history with limit-based loading.🛠️ Tech StackComponentTechnologyFrontendReact.js, React Router v5, Axios, CSS3
- BackendNode.js, Express.jsDatabaseMongoDB Atlas (Mongoose)DeploymentNetlify (Frontend), Render (Backend)

📂 Project Structure
  
```
├── client/              # React Frontend
│   ├── public/          # index.html, _redirects (Netlify fix)
│   └── src/             # Components (Menu, Orders, Header)
├── server/              # Node.js Backend
│   ├── models/          # Mongoose Schemas (Menu, Order)
│   ├── routes/          # API Endpoints
│   └── server.js        # Entry point
└── .gitignore           # Root ignore file
```
⚙️ Setup & Installation
1. Clone the repository : `git clone https://github.com/Parvez13/Restaurant-app.git`
2. Backend SetupBashcd server

```
npm install
```

# Create a .env file and add your MONGODB_URI

```
npm start
```

3. Frontend SetupBashcd client
   
```
npm install
npm start
```

📝 Deployment NotesCORS:

- The backend is configured to allow requests from the Netlify production URL.
- Environment Variables: Sensitive data like MongoDB credentials are managed via Render's Environment Variables dashboard.
- Redirects: A _redirects file is included in the client/public folder to support React Router's single-page navigation on Netlify.


