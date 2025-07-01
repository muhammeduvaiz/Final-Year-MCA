import React, { useState } from 'react'
import bgImage from '../image/background.png'  
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

function ALogin() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post('http://localhost:5000/admin/login', formData, {
        withCredentials: true
      })

      if (response.data.message === "admin login successfull") {
        // Store admin info in localStorage or state management
        localStorage.setItem('adminInfo', JSON.stringify(response.data.adminExist))
        toast.success('Admin login successful! Welcome.')
        navigate('/adashboard')
      } else {
        toast.error('Login failed. Please check your credentials.')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error(error.response?.data?.error || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: `url(${bgImage}) center center / cover no-repeat`
      }}
    >
      <div
        style={{
          padding: '20px',
          maxWidth: '400px',
          width: '100%',
          margin: 'auto',
          background: 'rgba(255, 255, 255, 0.59)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.18)'
        }}
      >
        <h1 style={{ textAlign: 'center' }}>KSRTC ADMIN LOGIN</h1>
        <div style={{
          border: '1px solid #ccc', 
          padding: '20px', 
          borderRadius: '5px', 
          background: '#fff', 
          padding: '20px',
          background: 'rgba(255, 255, 255, 0)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px 0 rgba(30, 36, 116, 0.37)',
          backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.18)'
        }}>
          <h2>Login</h2>
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                width: '100%' }}>
              <label htmlFor="email" style={{ marginBottom: '5px' }}>Admin Email :</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required 
                style={{ width: '90%', padding: '8px' }} 
              />
            </div>
            <div style={{ display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                width: '100%' }}>
              <label htmlFor="password" style={{ marginBottom: '5px' }}>Password :</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={formData.password}
                onChange={handleChange}
                required 
                style={{ width: '90%', padding: '8px' }} 
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: loading ? '#6c757d' : 'red',
                color: '#fff',
                border: 'none',
                padding: '10px',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '16px',
                fontWeight: 'bold',
                marginTop: '20px' 
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ALogin