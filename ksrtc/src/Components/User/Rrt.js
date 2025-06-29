import React, { useState, useEffect } from 'react'
import bgImage from '../image/background.png'
import { toast } from 'react-toastify'

function Rrt() {
  const [formData, setFormData] = useState({
    location: '',
    description: '',
    date: '',
    time: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    // Get user info from localStorage
    const storedUserInfo = localStorage.getItem('userInfo')
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo))
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!userInfo) {
      toast.error('User information not found. Please login again.')
      setIsSubmitting(false)
      return
    }

    try {
      const requestData = {
        ...formData,
        conductorName: userInfo.name,
        conductorPhone: userInfo.phone,
        conductorUsername: userInfo.username
      }

      const response = await fetch('http://localhost:5000/addRrtRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      })

      const result = await response.json()

      if (result.success) {
        toast.success(`RRT request submitted successfully! ${result.pnrCount} passenger tickets automatically included.`)
        setFormData({
          location: '',
          description: '',
          date: '',
          time: ''
        })
      } else {
        toast.error(result.message || 'Failed to submit request. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting RRT request:', error)
      toast.error('Error submitting request. Please check your connection.')
    } finally {
      setIsSubmitting(false)
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
        }}>RAPID RESPONSE TEAM</h1>

        <div style={{
          padding: '10px',
          marginBottom: '20px',
          borderRadius: '8px',
          textAlign: 'center',
          backgroundColor: '#fff3cd',
          color: '#856404',
          border: '1px solid #ffeaa7',
          fontSize: '0.9rem'
        }}>
          ⚠️ All active passenger tickets from the database will be automatically included in this request.
        </div>

        {userInfo && (
          <div style={{
            padding: '10px',
            marginBottom: '20px',
            borderRadius: '8px',
            textAlign: 'center',
            backgroundColor: '#d4edda',
            color: '#155724',
            border: '1px solid #c3e6cb',
            fontSize: '0.9rem'
          }}>
            📋 Conductor: {userInfo.name} | Phone: {userInfo.phone}
          </div>
        )}

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
            <label htmlFor='location' style={{ fontSize: '1.1rem', color: '#333' }}>Location</label>
            <input 
              type='text' 
              id='location' 
              name='location' 
              value={formData.location}
              onChange={handleInputChange}
              placeholder='Enter Location'
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
            <label htmlFor='description' style={{ fontSize: '1.1rem', color: '#333' }}>Description</label>
            <textarea 
              name='description' 
              id='description' 
              value={formData.description}
              onChange={handleInputChange}
              placeholder='Enter Description'
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '1rem',
                width: '100%',
                minHeight: '100px',
                resize: 'vertical'
              }}
              required
            />
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <label htmlFor='date' style={{ fontSize: '1.1rem', color: '#333' }}>Date</label>
            <input 
              type='date' 
              id='date' 
              name='date'
              value={formData.date}
              onChange={handleInputChange}
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
            <label htmlFor='time' style={{ fontSize: '1.1rem', color: '#333' }}>Time</label>
            <input 
              type='time' 
              id='time' 
              name='time'
              value={formData.time}
              onChange={handleInputChange}
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

          <button 
            type='submit'
            disabled={isSubmitting}
            style={{
              backgroundColor: isSubmitting ? '#6c757d' : '#ffc107',
              color: 'black',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '1.1rem',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              marginTop: '20px',
              transition: 'background-color 0.3s'
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Rrt