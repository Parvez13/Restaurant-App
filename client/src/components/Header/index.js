import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoMdClose} from 'react-icons/io' 
import './index.css'

class Header extends Component {
  state = {isMenuOpen: false}

  toggleMenu = () => {
    this.setState(prevState => ({isMenuOpen: !prevState.isMenuOpen}))
  }

  render() {
    const {isMenuOpen} = this.state
    const {location} = this.props
    const {pathname} = location

    const homeClassName =
      pathname === '/' ? 'nav-link active-nav-link' : 'nav-link'
    const menuClassName =
      pathname === '/menu' ? 'nav-link active-nav-link' : 'nav-link'
    const orderClassName =
      pathname === '/orders' ? 'nav-link active-nav-link': 'nav-link'

    return (
      <nav className="nav-header">
        <div className="nav-content">
          <Link to="/">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/dahdfe5do/image/upload/v1769931844/Colorful_Illustrative_Restaurant_Master_Chef_Logo_ox2tnk.png"
              alt="website logo"
            />
          </Link>

          <button
            type="button"
            className="hamburger-btn"
            onClick={this.toggleMenu}
          >
            <GiHamburgerMenu size={25} />
          </button>

          <ul className="nav-menu desktop-menu">
            <li className="nav-menu-item">
              <Link to="/" className={homeClassName}>
                Home
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/menu" className={menuClassName}>
                Menu
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/orders" className={orderClassName}>
                Orders
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="logout-desktop-btn"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>

        {isMenuOpen && (
          <div className="mobile-nav-menu">
            <ul className="mobile-nav-menu">
              <li className="mobile-nav-item">
                <Link to="/" className={homeClassName}>
                  Home
                </Link>
              </li>
              <li className="mobile-nav-item">
                <Link to="/menu" className={menuClassName}>
                  Menu
                </Link>
              </li>
              <li className="mobile-nav-item">
                <Link to="/orders" className={orderClassName}>
                  Orders
                </Link>
              </li>
              <li className="mobile-nav-item">
                <button
                  type="button"
                  className="logout-desktop-btn"
                >
                  Logout
                </button>
              </li>
            </ul>
            <button
              type="button"
              className="close-btn"
              onClick={this.toggleMenu}
            >
              <IoMdClose size={25} />
            </button>
          </div>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)