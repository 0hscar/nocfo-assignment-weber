import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import "../../style.css"


const EventList = ({ event }) => {
  return <div className="itemContainer">
    <h1>Test</h1>

    <p>Date: {event.date}</p>
    <p>Label: {event.label}</p>
    <p>Priority: {event.priority}</p>
    <p>Description: {event.description}</p>

  </div>

}

export const Timeline = ({ items }) => {
  // TODO: Replace me
  // items.sort((a, b) => new Date(b.date) - new Date(a.date))
  const [eventItems, setEventItems] = useState(items)
  const [sortCriteria, setSortCriteria] = useState('date')
  
  const scrollContainerRef = useRef(null)

  // Option handler
  const handleSortChange = (event) => {
    const criteria = event.target.value
    setSortCriteria(criteria)
    
    const priorityMap = {
      'LOW': 1,
      'MODERATE': 2,
      'HIGH': 3
    }

    const sortedItems = [...items]
    // If statements for the different sorting options
    if(criteria === 'date-first'){
      sortedItems.sort((a, b) => new Date(a.date) - new Date(b.date))
    }
    else if (criteria === 'date-last'){
      sortedItems.sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    else if (criteria === 'priority-lowFirst') {
      sortedItems.sort((a, b) => priorityMap[a.priority] - priorityMap[b.priority])
    }
    else if (criteria === 'priority-highFirst') {
      sortedItems.sort((a, b) => priorityMap[b.priority] - priorityMap[a.priority])
    }

    setEventItems(sortedItems)
  }

  // Scroll Timeline left and right
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -150, behavior: 'smooth' })
    }
  }
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 150, behavior: 'smooth' })
    }
  }

  return (
    <div className='timeline'>
      <select className='sortSelector' value={sortCriteria} onChange={handleSortChange}>
        <option value='date-first'>Date, First - Last</option>
        <option value='date-last'>Date, Last - First</option>

        <option value='priority-lowFirst'>Priority, Low - High</option>
        <option value='priority-highFirst'>Priority, High - Low</option>
      
      </select>
      <div className='parentContainer'>

        <button onMouseDown={scrollLeft} id='scrollLeft'>
          <i className='arrow left'></i>
        </button>

        <div ref={scrollContainerRef} className='eventsContainer'>
          {eventItems.map((value) => <EventList event={value} ></EventList>)} {/* .map() to loop through the events themselves, instead of having to use [1], [2] etc. */}
        </div>

        <button onClick={scrollRight} id='scrollRight'>
          <i className='arrow right'></i>
        </button>

      </div>
    </div>
  )

}

