import React, { useRef, useState } from 'react'
import '../../style.css'

// Container for singular Events.
const EventContainer = ({ event }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const toggleExpanded = () => setIsExpanded(!isExpanded)

  return (
    <div className='itemContainer'>
      {/* Visible */}
      <h1 className='itemHeader'>{event.date}</h1>
      <p className='itemP'>Priority: <br></br> {event.priority}</p>

      {/* Toggleable, room for more if required */}
      {isExpanded && (
        <div className='toggleAbleDiv'>
          <p className='itemP'>Label: {event.label}</p>
          <p className='itemP'>Description: {event.description}</p>
        </div>
      )}

      {/* Toggle button */}
      <button className='showMoreButton' onClick={toggleExpanded}>
        {isExpanded ? 'Show Less' : 'Show More'}
      </button>
    
    </div>
  )
}

export const Timeline = ({ items }) => {
  const [eventItems, setEventItems] = useState(items)
  const [sortCriteria, setSortCriteria] = useState('date-first')

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
    if (criteria === 'date-first') {
      sortedItems.sort((a, b) => new Date(a.date) - new Date(b.date))
    }
    else if (criteria === 'date-last') {
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
    // Timeline itself
    <div className='timeline'>
      
      {/* Option selector for sorting */}
      <select className='sortSelector' value={sortCriteria} onChange={handleSortChange}>
        <option value='date-first'>Date, First - Last</option>
        <option value='date-last'>Date, Last - First</option>

        <option value='priority-lowFirst'>Priority, Low - High</option>
        <option value='priority-highFirst'>Priority, High - Low</option>

      </select>

      {/* A parent container to house the scroll buttons on either side of the events */}
      <div className='parentContainer'>

        <button className='scrollButton' onClick={scrollLeft} id='scrollLeft'>
          <i className='arrow left'></i> {/* Arrow inside the button */}
        </button>

        {/* Div container, scrollable, houses event containers  */}
        <div ref={scrollContainerRef} className='eventsContainer'>
          {eventItems.map((value) => <EventContainer event={value} ></EventContainer>)} {/* .map() to loop through the events themselves */}
        </div>

        <button className='scrollButton' onClick={scrollRight} id='scrollRight'>
          <i className='arrow right'></i> {/* Arrow inside the button */}
        </button>

      </div>
    </div>
  )

}

