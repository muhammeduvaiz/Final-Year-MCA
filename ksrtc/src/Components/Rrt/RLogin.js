import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bgImage from '../image/background.png'
import axios from 'axios'
import { toast } from 'react-toastify'

function RLogin() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await axios.post('http://localhost:5000/rrt/login', formData, {
                withCredentials: true
            })

            if (response.data.message === "RRT login successful") {
                // Store RRT info in localStorage
                localStorage.setItem('rrtInfo', JSON.stringify({
                    user: response.data.user,
                    token: response.data.token,
                    role: 'rrt'
                }))
                toast.success('RRT Login successful! Welcome to Rapid Response Team.')
                navigate('/rrt-dashboard') // You can create a dedicated RRT dashboard
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
                <h1 style={{ textAlign: 'center', color: '#d32f2f' }}>KSRTC RRT LOGIN</h1>
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
                    <h2 style={{ color: '#d32f2f', textAlign: 'center' }}>Rapid Response Team</h2>
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px',
                            alignItems: 'center'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%'
                        }}>
                            <label htmlFor="username" style={{ marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>Username:</label>
                            <input 
                                type="text" 
                                id="username" 
                                name="username" 
                                value={formData.username}
                                onChange={handleInputChange}
                                required 
                                style={{ 
                                    width: '90%', 
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '2px solid #ddd',
                                    fontSize: '16px',
                                    transition: 'border-color 0.3s ease'
                                }}
                                placeholder="Enter your username"
                            />
                        </div>
                        <div style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            width: '100%' 
                        }}>
                            <label htmlFor="password" style={{ marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>Password:</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                value={formData.password}
                                onChange={handleInputChange}
                                required 
                                style={{ 
                                    width: '90%', 
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '2px solid #ddd',
                                    fontSize: '16px',
                                    transition: 'border-color 0.3s ease'
                                }}
                                placeholder="Enter your password"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                backgroundColor: loading ? '#6c757d' : '#d32f2f',
                                color: '#fff',
                                border: 'none',
                                padding: '12px',
                                borderRadius: '8px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                marginTop: '20px',
                                transition: 'background-color 0.3s ease',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                            }}
                            onMouseOver={(e) => {
                                if (!loading) {
                                    e.target.style.backgroundColor = '#b71c1c'
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!loading) {
                                    e.target.style.backgroundColor = '#d32f2f'
                                }
                            }}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <p style={{ marginBottom: '10px', color: '#666' }}>
                            <strong>Login with your RRT credentials</strong>
                        </p>
                        <p style={{ fontSize: '14px', color: '#888' }}>
                            Use the username and password provided by your administrator
                        </p>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <p style={{ textAlign: 'center', marginBottom: '10px' }}>
                            <a 
                                href="/" 
                                style={{ 
                                    textDecoration: 'none', 
                                    color: '#007bff',
                                    fontWeight: 'bold',
                                    marginRight: '20px'
                                }}
                            >
                                User Login
                            </a>
                            <a 
                                href="/admin" 
                                style={{ 
                                    textDecoration: 'none', 
                                    color: '#007bff',
                                    fontWeight: 'bold'
                                }}
                            >
                                Admin Login
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RLogin
