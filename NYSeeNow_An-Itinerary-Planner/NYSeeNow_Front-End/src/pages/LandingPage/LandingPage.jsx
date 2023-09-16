import React from 'react'
import styles from './LandingPage.module.css'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const LandingPage = () => {
  const location = useLocation()
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth()


  return (
    <div className={styles['landing-page']}>
      <header>
        <nav className={location.pathname === '/' ? styles['landing-navbar'] : ''}>
          <div className={styles['logo-section']}>
            <img
              src="nyseenowLogoLanding.png"
              alt="logo"
              style={{ maxHeight: '50px', maxWidth: '100%' }}
            />
          </div>

          {!isLoggedIn && (
            <div className={styles['nav-links']}>
              <Link to="/userprofile">Sign In</Link>
            </div>
          )}
          {isLoggedIn && (
            <div className={styles['nav-links']}>
              <Link to="/userprofile">UserProfile</Link>
            </div>
          )}
        </nav>
      </header>
      <section className={styles.hero}>
        <h1 className={styles['hero-heading']}>
          Welcome!
          <br />
          Live your NYC dream trip, NOW!
        </h1>
        <p className={styles['hero-subheading']}>
          Find top attractions, build an itinerary, and decide what suits you here and NOW. Using
          our 'NOW mode' you can check busyness levels, weather info and directions between
          destinations. All in one place here and now!
        </p>
        <h2 className={styles.slogan}>The best time is now</h2>
        <div className={styles['action-buttons']}>
          <Link to="/home" className={`${styles.button} ${styles['button-plan']}`}>
            Explore NOW!
          </Link>
        </div>
      </section>

      {/* User Flow Section */}
      <section className={styles['user-flow-section']}>
        <div className={styles['user-flow-item']} style={{ backgroundColor: ' #eaedfe' }}>
          <img src="/UserFlow1.png" alt="User Flow 1" />
          <h2>Discover NOW!</h2>
          <p>
            Dive into our interactive map and explore the heart of NYC. Browse and pinpoint your
            favorite attractions at your own pace.
          </p>
        </div>
        <div className={styles['user-flow-item']} style={{ backgroundColor: 'white' }}>
          <img src="/UserFlow2.png" alt="User Flow 2" />
          <h2>Plan Your Trip...</h2>
          <p>
            Select attractions that catch your eye and add them to a personalised itinerary. Whether
            it's for a future adventure or for right NOW, tailor your journey to what you want.
          </p>
        </div>
        <div className={styles['user-flow-item']} style={{ backgroundColor: '#eaedfe' }}>
          <img src="/UserFlow3.png" alt="User Flow 3" />
          <h2>Create your experiences NOW...</h2>
          <p>
            After setting up your profile, save your planned trips. Revisit and modify them anytime,
            ensuring your adventures are always up-to-date.
          </p>
        </div>
        <div className={styles['user-flow-item']} style={{ backgroundColor: 'white' }}>
          <img src="/UserFlow4.png" alt="User Flow 4" />
          <h2>Personalise Your Adventure</h2>
          <p>
            Choose from a diverse range of attractions, each color and symbol-coded for
            accessibility. Tailor your trip to match your unique interests.
          </p>
        </div>
        <div className={styles['user-flow-item']} style={{ backgroundColor: '#eaedfe' }}>
          <img src="/UserFlow5.png" alt="User Flow 5" />
          <h2>Use our Locator feature for the here & NOW...</h2>
          <p>
            Stay informed with real-time locations of selected attractions. Plot walking routes and
            navigate the city with ease.
          </p>
        </div>
        <div className={styles['user-flow-item']} style={{ backgroundColor: 'white' }}>
          <img src="/UserFlow6.png" alt="User Flow 6" />
          <h2>NOW Mode!</h2>
          <p>
            Experience NYC in real-time. Activate NOW Mode to view a heat map of the city's busyness
            levels and stay updated with the current weather.
          </p>
        </div>
      </section>
      <section className={styles.cta}>
        <Link to="/home" className={`${styles.button} ${styles['button-plan']}`}>
          Explore NOW!
        </Link>
        <p>
          <i>There's no time like NOW!</i>
        </p>
      </section>

      <footer>
        <p>© 2023 NYSeeNOW</p>
        <div className={styles['social-icons']}>
          <i className="fab fa-facebook"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-youtube"></i>
        </div>
        <div className={styles['footer-links']}>
          <Link to="">About</Link>
          <Link to="">Privacy</Link>
          <Link to="">Terms</Link>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
