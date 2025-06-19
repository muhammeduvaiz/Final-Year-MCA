import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import bgImage from '../image/background.png'

const TicketDetails = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { pnr, source, destination, adult, child, price, date } = location.state || {}

  if (!pnr) {
    // If accessed directly, redirect to booking page
    navigate('/tbooking')
    return null
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
        }}>TICKET DETAILS</h1>
        <div style={{ fontSize: '1.2rem', color: '#222', marginBottom: '10px' }}><b>PNR:</b> {pnr}</div>
        <div style={{ fontSize: '1.2rem', color: '#222', marginBottom: '10px' }}><b>Source:</b> {source}</div>
        <div style={{ fontSize: '1.2rem', color: '#222', marginBottom: '10px' }}><b>Destination:</b> {destination}</div>
        <div style={{ fontSize: '1.2rem', color: '#222', marginBottom: '10px' }}><b>Adults:</b> {adult}</div>
        <div style={{ fontSize: '1.2rem', color: '#222', marginBottom: '10px' }}><b>Children:</b> {child}</div>
        <div style={{ fontSize: '1.2rem', color: '#222', marginBottom: '10px' }}><b>Date:</b> {date}</div>
        <div style={{ fontSize: '1.2rem', color: '#007bff', marginBottom: '10px' }}><b>Total Price:</b> ₹{price}</div>
      </div>
    </div>
  )
}

export default TicketDetails 