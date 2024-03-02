import React from 'react'
import styled from 'styled-components'


const SortButton = ({name}) => {
  
  function sort(){

  }
  // console.log("tjong" + Object.keys(event))

  return <button>{name}</button>
}


const EventList = ({event}) => {
  return <div className="eventContainer">
    <h1>Test</h1>
    
    <p>Date: {event.date}</p>
    <p>Type: {event.type}</p>
    <p>Priority: {event.priority}</p>
    <p>Description: {event.description}</p>

  </div>

}

export const Timeline = ({ items }) => {
  // TODO: Replace me
  // console.log(Object.keys(getEvents()))
  
  
  
  
  console.log(items)
  return (
    <StyledPlaceholder>your component here
    <br></br>
    {Object.keys(items[0]).map((value) => <SortButton name={value}></SortButton>)} {/* Creating buttons for every key in objects, assuming every object will contain same keys */}
    {items.map((value) => <EventList event={value} ></EventList>)} {/* .map() to loop through the events themselves, instead of having to use [1], [2] etc. */}
    </StyledPlaceholder>
  ) 

  
  
}




const StyledPlaceholder = styled.div`
  padding: 3rem 4rem;
  border-radius: 1rem;
  background: #1b98f511;
  border: 3px dotted #1b98f5;
  font-family: Nunito, sans-serif;
  color: #1b98f5;
  text-align: center;
  max-height: 500px;
  overflow-y: scroll;
`
