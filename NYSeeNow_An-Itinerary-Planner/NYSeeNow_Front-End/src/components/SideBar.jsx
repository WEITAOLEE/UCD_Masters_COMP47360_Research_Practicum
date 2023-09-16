import React, { useState, useEffect, useContext } from 'react'
import SidebarContent from './SidebarContent'
import { Link } from 'react-router-dom'
import { useSelection } from '../context/SelectionContext'
import { useNavigate } from 'react-router-dom'
import { post_itinerary } from '../net/net'
import { useTripData } from '../context/TripDataContext'
import axios from 'axios'
import { LocatorContext } from '../context/LocatorContext'


export const SideBar = ({ mapRef }) => {
  // State for holding the left position of AttractionCounter
  const [counterLeft, setCounterLeft] = useState('60px')
  const [isOpen, setIsOpen] = useState(false)
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [attractionListToSend, setAttractionListToSend] = useState([])

  const { selectedList, setSelectedList } = useSelection()
  const { tripData, setTripData } = useTripData()
  const navigate = useNavigate()
  const logo = "/nyseenowLogoOnly.png";
  const skyline = "/skyline.png";

  const [counterBottom, setCounterBottom] = useState('10px');

  useEffect(() => {
    setCounterLeft(isOpen ? 'calc(100% - 60px)' : '60px')
  }, [isOpen])


  useEffect(() => {
    const updateSidebarPosition = () => {
      if (window.innerWidth >= 768) {
        setCounterLeft(isOpen ? 'calc(50% + 60px)' : '60px');
        setCounterBottom('10px');
      } else {
        setCounterLeft('10px');
        setCounterBottom(isOpen ? 'calc(50% + 60px)' : '60px');
      }
    };


    // Updates the position when the component mounts
    updateSidebarPosition();

    // Updates the position whenever the window size changes
    window.addEventListener('resize', updateSidebarPosition);

    // Cleans up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', updateSidebarPosition);
    };
  }, [isOpen]);

  // Uses the showLocator and setShowLocator from LocatorContext
  const { showLocator, setShowLocator } = useContext(LocatorContext)

  // Handles locator button click
  const handleLocatorClick = () => {
    setIsOpen(false)
    setShowLocator(true)
    console.log('Locator button clicked, showLocator:', showLocator) // add this line
  }

  const handleSubmitButton = () => {
    // Check if all attractions have a 'day' value of "Not Selected" or don't have 'day' value at all
    const isAnyAttractionNotSelected = selectedList.some(attraction =>
        !attraction.day || attraction.day === "Not Selected");

    if (!startDate || !endDate || !selectedList.length || isAnyAttractionNotSelected) {
      alert('Please fill in the start date, end date, and select a day for each attraction.');
      return;
    }
    
    console.log('calling submit funtion')

    console.log('SENDING REQUEST')
    const request_obj = {
      start_date: startDate,
      end_date: endDate,
      attraction_list: selectedList
    }
    console.log('This is the sending list: FYR')
    console.log(selectedList)

    const url = 'itinerary/predict'

    const req_string = JSON.stringify(request_obj)

    const response_processing = (response_obj) => {
      let new_map = {}
      Object.entries(response_obj).map(([key, attraction_list]) => {
        new_map[key] = []
        attraction_list.map((attraction, arrKey) => {
          let attraction_string = attraction
          let attraction_object = JSON.parse(attraction_string)
          new_map[key].push(attraction_object)
        })
      })

      return new_map
    }

    axios
      .post(url, req_string, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log('Success!')
        console.log(response)
        let response_obj = response_processing(response.data)
        setTripData(response_obj)
        navigate('/itinerary-builder')
        setIsOpen(false)
      })
      .catch((error) => {
        console.log('You have an error!')
        console.log(error)
      })
  }

  useEffect(() => {
    const sidebar = document.querySelector(".side-bar.open");
    const arrowDiv = document.querySelector(".close-arrow");
    if (sidebar && arrowDiv) {
      arrowDiv.addEventListener("click", () => {
        setIsOpen(false);
      });
    }
  }, [isOpen]);
  

  return (
    
    <aside className={`side-bar ${isOpen ? 'open' : ''}`}>
      {isOpen && <img src={logo} alt="Logo" className="sidebar-logo" />}
      <div className="sidebar-content">
        <SidebarContent
          open={isOpen}
          getStartDate={setStartDate}
          getEndDate={setEndDate}
          submitHandler={handleSubmitButton}
          currStartDate={startDate}
          currEndDate={endDate}
        />
        {isOpen && <img src={skyline} alt="Skyline" className="sidebar-skyline" />}
      </div>
      <div className={`sidebar-icons ${isOpen ? 'sidebar-open' : ''}`}>
        <div
          className="hamburger-icon"
          onClick={() => setIsOpen(!isOpen)}
          style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
        >
          <i className="fas fa-bars"></i>
        </div>
        <Link to="/itineraries" className="calendar-icon sidebar-link">
          <i className="far fa-calendar-alt"></i>
          <p>My Itineraries</p>
        </Link>
        <div className="locator-icon" onClick={handleLocatorClick} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <i className="fas fa-map-marker-alt"></i>
          <p>Locator</p>
        </div>
        <Link to="/" className="question-mark-icon" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <i className="fas fa-question-circle"></i>
          <p>Help</p>
        </Link>
      </div>
      {isOpen && <div className="close-arrow"><i className="fas fa-chevron-down"></i></div>}
    </aside>
  )
}
