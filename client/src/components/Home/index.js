import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-heading">Manage Your Restaurant With Precision</h1>
        <p className="home-description">
          Streamline your kitchen operations, manage your digital menu, and 
          track real-time orders all in one place. Scale your business with 
          data-driven insights and a seamless management experience..
        </p>
        <Link to="/menu">
          <button type="button" className="menu-button">
            Go to Menu
          </button>
        </Link>
      </div>
    </div>
  </>
)
export default Home