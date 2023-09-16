import { useAuth } from '../../context/AuthContext'
import { useState, useEffect } from 'react'
import { AuthOverlay } from '../authOverlay/AuthOverlay'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { differenceInDays } from 'date-fns'
import styles from './UserProfile.module.css'

export const UserProfile = () => {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth()
  const [email, setEmail] = useState('')
  const [createdAt, setCreatedAt] = useState(null)
  const [selectedTab, setSelectedTab] = useState('My Profile')

  useEffect(() => {
    axios
      .get(`/api/users/${authUser}`)
      .then((response) => {
        setEmail(response.data.email)
        setCreatedAt(new Date(response.data.createdAt)) // Parse the date from the response
      })
      .catch((error) => console.error('Error fetching user data:', error))
  }, [authUser])

  const navigate = useNavigate()

  const timeRegistered = createdAt ? `${differenceInDays(new Date(), createdAt)} days ago` : ''

  const logoutHandler = () => {
    setIsLoggedIn(false)
    navigate('/')
  }

  const [profilePic, setProfilePic] = useState(null)

  const handleProfilePicChange = (event) => {
    setProfilePic(URL.createObjectURL(event.target.files[0]))
  }

  const gobackFunc = () => {
    navigate(-1)
  }

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'My Profile':
        return (
          <>
            <div className={styles.profilePicContainer}>
              <img
                src={profilePic || '/placeholder.png'}
                className={styles.profilePic}
                alt="Profile"
              />
              <input
                type="file"
                onChange={handleProfilePicChange}
                className={styles.fileInputBox}
              />
            </div>
            <p className={styles.profileInfo}>Username: {authUser}</p>
            <p className={styles.profileInfo}>Email: {email}</p>
            <textarea
              className={styles.bioInput}
              placeholder="Short description of you..."
            ></textarea>
            <input className={styles.locationInput} type="text" placeholder="Add your location" />
            <input className={styles.interestsInput} type="text" placeholder="Add your interests" />
            <button className={styles.saveButton}>SAVE</button>
          </>
        )
      case 'Saved Itineraries':
        return <div>Saved Itineraries content goes here</div>
      case 'Favorites':
        return <div>Favorites content goes here</div>
      case 'Settings':
        return <div>Settings content goes here</div>
      default:
        return <div>Select a tab</div>
    }
  }

  if (isLoggedIn) {
    return (
      <div className={styles.userProfileContainer}>
        <div className={styles.profilePicContainer}>
          <img src={profilePic || '/placeholder.png'} className={styles.profilePic} alt="Profile" />
          <input type="file" onChange={handleProfilePicChange} className={styles.fileInputBox} />
        </div>
        <p className={styles.profileInfo}>Username: {authUser}</p>
        <p className={styles.profileInfo}>Email: {email}</p>
        <textarea className={styles.bioInput} placeholder="Short description of you..."></textarea>
        <input className={styles.locationInput} type="text" placeholder="Add your location" />
        <input className={styles.interestsInput} type="text" placeholder="Add your interests" />
        <button className={styles.saveButton}>SAVE</button>
        <button className={styles.button} onClick={logoutHandler}>
          Logout
        </button>
      </div>
      // <div className={styles.pageWrapper}>
      //   <div className={styles.container}>
      //     <div className={styles.header}>
      //       <h2>{selectedTab}</h2>
      //     </div>
      //     <div className={styles.sidebar}>
      //       <button
      //         className={`${styles.button} ${selectedTab === 'My Profile' ? styles.active : ''}`}
      //         onClick={() => setSelectedTab('My Profile')}
      //       >
      //         My Profile
      //       </button>
      //       <button
      //         className={`${styles.button} ${
      //           selectedTab === 'Saved Itineraries' ? styles.active : ''
      //         }`}
      //         onClick={() => setSelectedTab('Saved Itineraries')}
      //       >
      //         Saved Itineraries
      //       </button>
      //       <button
      //         className={`${styles.button} ${selectedTab === 'Favorites' ? styles.active : ''}`}
      //         onClick={() => setSelectedTab('Favorites')}
      //       >
      //         Favorites
      //       </button>
      //       <button
      //         className={`${styles.button} ${selectedTab === 'Settings' ? styles.active : ''}`}
      //         onClick={() => setSelectedTab('Settings')}
      //       >
      //         Settings
      //       </button>
      //       <button className={styles.button} onClick={logoutHandler}>
      //         Logout
      //       </button>
      //       <button className={styles.button} onClick={gobackFunc}>
      //         Go back
      //       </button>
      //     </div>
      //     <div className={styles.content}>{renderTabContent()}</div>
      //   </div>
      // </div>
    )
  } else {
    return <AuthOverlay></AuthOverlay>
  }
}
