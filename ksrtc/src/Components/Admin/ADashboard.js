import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bgImage from '../image/background.png'

function ADashboard() {
  const navigate = useNavigate()
  const [adminInfo, setAdminInfo] = useState(null)

  useEffect(() => {
    const storedAdminInfo = localStorage.getItem('adminInfo')
    if (storedAdminInfo) {
      setAdminInfo(JSON.parse(storedAdminInfo))
    } else {
      // If no admin info, redirect to login
      navigate('/admin')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('adminInfo')
    navigate('/admin')
  }

  if (!adminInfo) {
    return <div>Loading...</div>
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
        <div style={{
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <h1 style={{ 
            marginBottom: '10px',
            color: '#333',
            fontSize: '2.5rem'
          }}>ADMIN DASHBOARD</h1>
          <p style={{
            color: '#666',
            fontSize: '1rem',
            marginBottom: '20px'
          }}>
            Welcome, {adminInfo.email}
          </p>
        </div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '100%'
        }}>
          <button 
            onClick={() => navigate('/adminalerts')}
            style={{
              width: '100%',
              padding: '15px',
              fontSize: '1.1rem',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            ALERTS
          </button>
          
          <button 
            onClick={() => navigate('/manageusers')}
            style={{
              width: '100%',
              padding: '15px',
              fontSize: '1.1rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            MANAGE USERS
          </button>
          
          <button style={{
            width: '100%',
            padding: '15px',
            fontSize: '1.1rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}>MANAGE BUSES</button>

          <button 
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '15px',
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

export default ADashboard