import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bgImage from '../image/background.png'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo')
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo))
    } else {
      // If no user info, redirect to login
      navigate('/')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('userInfo')
    navigate('/')
  }

  if (!userInfo) {
    return <div>Loading...</div>
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
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
        <div style={{
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          <h1 style={{ 
            marginBottom: '10px',
            color: '#333',
            fontSize: '2.5rem'
          }}>USER DASHBOARD</h1>
          <p style={{
            color: '#666',
            fontSize: '1rem',
            marginBottom: '10px'
          }}>
            Welcome, {userInfo.name}!
          </p>
          <p style={{
            color: '#888',
            fontSize: '0.9rem'
          }}>
            Username: {userInfo.username}
          </p>
        </div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '100%',
          alignItems: 'center'
        }}>
          <Link to="/tbooking" style={{ width: '90%' }}>
            <button style={{
              width: '100%',
              padding: '12px',
              fontSize: '1.1rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}>TICKET BOOKING</button>
          </Link>

          <Link to="/tverification" style={{ width: '90%' }}>
            <button style={{
              width: '100%',
              padding: '12px',
              fontSize: '1.1rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}>TICKET VERIFICATION</button>
          </Link>

          <Link to="/accidentreport" style={{ width: '90%' }}>
            <button style={{
              width: '100%',
              padding: '12px',
              fontSize: '1.1rem',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}>REPORT ACCIDENT</button>
          </Link>

          <Link to="/rrt" style={{ width: '90%' }}>
            <button style={{
              width: '100%',
              padding: '12px',
              fontSize: '1.1rem',
              backgroundColor: '#ffc107',
              color: 'black',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}>RAPID RESPONSE TEAM</button>
          </Link>

          <button 
            onClick={handleLogout}
            style={{
              width: '90%',
              padding: '12px',
              fontSize: '1.1rem',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              marginTop: '20px'
            }}
          >
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard