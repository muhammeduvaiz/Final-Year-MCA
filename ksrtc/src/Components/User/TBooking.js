import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bgImage from '../image/background.png'
import axios from 'axios'
import { toast } from 'react-toastify'

// Define the order of cities from south to north
const CITY_ORDER = ['Trivandrum', 'Kollam', 'Kochi', 'Kannur', 'Kasaragod']

const TBooking = () => {
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [adult, setAdult] = useState(1)
  const [child, setChild] = useState(0)
  const [pnrCounter, setPnrCounter] = useState(() => {
    const last = localStorage.getItem('lastPNR')
    return last ? parseInt(last, 10) : 1001
  })
  const navigate = useNavigate()

  const calculatePoints = () => {
    if (!source || !destination) return 0
    const sourceIndex = CITY_ORDER.indexOf(source)
    const destIndex = CITY_ORDER.indexOf(destination)
    if (sourceIndex === -1 || destIndex === -1) return 0
    return Math.abs(destIndex - sourceIndex)
  }

  const getPrice = () => {
    const points = calculatePoints()
    const pricePerAdult = points * 50
    const pricePerChild = pricePerAdult * 0.5
    return (Number(adult) * pricePerAdult) + (Number(child) * pricePerChild)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newPNR = pnrCounter
    setPnrCounter(prev => {
      localStorage.setItem('lastPNR', prev + 1)
      return prev + 1
    })
    const currentDate = new Date().toLocaleDateString('en-GB') // Format: DD/MM/YYYY

    // Prepare ticket data
    const ticketData = {
      pnr: 'PNR' + newPNR,
      source,
      destination,
      adult,
      child,
      price: getPrice(),
      points: calculatePoints(),
      date: currentDate
    }

    try {
      // Send POST request to backend
      await axios.post('http://localhost:5000/addTicket', ticketData)
      
      toast.success('Ticket booked successfully!')
      // On success, navigate to TicketDetails
      navigate('/ticketdetails', { state: ticketData })
    } catch (error) {
      toast.error('Failed to save ticket. Please try again.')
      console.log(error)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: `url(${bgImage}) center center / cover no-repeat`
    }}>
      <div style={{
        padding: '40px',
        maxWidth: '500px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.68)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(6px)',
        border: '1px solid rgba(255,255,255,0.18)'
      }}>
        <h1 style={{
          textAlign: 'center',
          marginBottom: '40px',
          color: '#333',
          fontSize: '2.5rem'
        }}>TICKET BOOKING</h1>
        <form style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }} onSubmit={handleSubmit}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <label htmlFor='source' style={{ fontSize: '1.1rem', color: '#333' }}>Source</label>
            <select
              name='source'
              id='source'
              value={source}
              onChange={e => setSource(e.target.value)}
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '1rem',
                width: '100%'
              }}
              required
            >
              <option value=''>Select Source</option>
              {CITY_ORDER.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <label htmlFor='destination' style={{ fontSize: '1.1rem', color: '#333' }}>Destination</label>
            <select
              name='destination'
              id='destination'
              value={destination}
              onChange={e => setDestination(e.target.value)}
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '1rem',
                width: '100%'
              }}
              required
            >
              <option value=''>Select Destination</option>
              {CITY_ORDER.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <label htmlFor='Adult' style={{ fontSize: '1.1rem', color: '#333' }}>Number of Adults</label>
            <input
              type='number'
              id='Adult'
              name='Adult'
              min='1'
              value={adult}
              onChange={e => setAdult(e.target.value)}
              placeholder='Enter number of adults'
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '1rem',
                width: '100%'
              }}
              required
            />
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <label htmlFor='Child' style={{ fontSize: '1.1rem', color: '#333' }}>Number of Children</label>
            <input
              type='number'
              id='Child'
              name='Child'
              min='0'
              value={child}
              onChange={e => setChild(e.target.value)}
              placeholder='Enter number of children'
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '1rem',
                width: '100%'
              }}
            />
          </div>

          <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem', color: '#007bff' }}>
            Points: {calculatePoints()} | Total Price: ₹{getPrice()}
          </div>

          <button
            type='submit'
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '1.1rem',
              cursor: 'pointer',
              marginTop: '20px',
              transition: 'background-color 0.3s'
            }}
          >
            Book Ticket
          </button>
        </form>
      </div>
    </div>
  )
}

export default TBooking