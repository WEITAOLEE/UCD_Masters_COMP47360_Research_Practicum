import { Link } from 'react-router-dom'
import { SearchBar } from './SearchBar'
import CategoryDropDown from './CategoriesDropDown'
import styles from './NavBar.module.css'
import { useState } from 'react'

export const NavBar = ({ isOpen, set_map_center }) => {
  const navStyle = {
    marginLeft: isOpen ? '40%' : '0', // position of sidebar extended
    transition: 'margin-left 0.3s ease' // transition animation
  }

  const logoStyle = {
    marginLeft: isOpen ? '50%' : '0', // position of logo when sidebar is extended
    transition: 'margin-left 0.3s ease' // transition animation
  }

  const [burgerOpen, setBurgerOpen] = useState(false)

  const toggleBurger = () => {
    setBurgerOpen(!burgerOpen)
  }
  return (
    <nav style={navStyle}>
      <ul>
        <div style={logoStyle}>
          <Link to="/home" className={styles.siteTitle}>
            <div className={styles['logo-section']}>
              <img
                src="nyseenowLogoLanding.png"
                alt="logo"
                style={{ maxHeight: '100px', maxWidth: '100%' }}
              />
            </div>
          </Link>
        </div>
      </ul>
      <ul>
        <li>
          <SearchBar set_map_center={set_map_center}></SearchBar>
        </li>
      </ul>
      <ul className={styles.changeableNav}>
        <li>
          <CategoryDropDown></CategoryDropDown>
        </li>
        <li>
          <Link to="/userprofile">User</Link>
        </li>
      </ul>
      <ul className={styles.navHamburger}>
        <li onClick={toggleBurger}>
          <i className="fas fa-chevron-down"></i>
        </li>
        {burgerOpen && (
          <div className={styles.dropdownContainer}>
            <div>
              <CategoryDropDown></CategoryDropDown>
            </div>
            <div>
              <Link to="/userprofile">User</Link>
            </div>
          </div>
        )}
      </ul>
    </nav>
  )
}
