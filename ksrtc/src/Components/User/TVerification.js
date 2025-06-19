import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bgImage from '../image/background.png'
import axios from 'axios'

const TVerification = () => {
  const [pnr, setPnr] = useState('')
  const [verificationResult, setVerificationResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!pnr.trim()) {
      alert('Please enter a PNR number')
      return
    }

    setLoading(true)
    setVerificationResult(null)

    try {
      // First, verify the ticket exists
      const ticketResponse = await axios.post('http://localhost:5000/ticketverify', { pnr })
      
      // Then check if PNR exists in accident database
      const accidentResponse = await axios.get(`http://localhost:5000/checkAccidentPNR/${pnr}`)
      
      const isInAccidentDB = accidentResponse.data.exists
      
      setVerificationResult({
        ticketExists: true,
        isInAccidentDB,
        verified: isInAccidentDB,
        message: isInAccidentDB 
          ? 'PNR verified successfully! This ticket is associated with an accident report.'
          : 'PNR verified successfully! This ticket is not associated with any accident report.'
      })
    } catch (error) {
      console.error('Verification error:', error)
      setVerificationResult({
        ticketExists: false,
        isInAccidentDB: false,
        verified: false,
        message: 'PNR not found in ticket database.'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    navigate('/dashboard')
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
        }}>PNR VERIFICATION</h1>
        
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
            <label htmlFor='pnr' style={{ fontSize: '1.1rem', color: '#333' }}>Enter PNR Number</label>
            <input
              type='text'
              id='pnr'
              name='pnr'
              value={pnr}
              onChange={e => setPnr(e.target.value.toUpperCase())}
              placeholder='Enter PNR (e.g., PNR1001)'
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
            disabled={loading}
            style={{
              padding: '12px',
              fontSize: '1.1rem',
              backgroundColor: loading ? '#6c757d' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            {loading ? 'Verifying...' : 'Verify PNR'}
          </button>

          <button
            type='button'
            onClick={handleBack}
            style={{
              padding: '12px',
              fontSize: '1.1rem',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            Back to Dashboard
          </button>
        </form>

        {verificationResult && (
          <div style={{
            marginTop: '30px',
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: verificationResult.verified 
              ? 'rgba(40, 167, 69, 0.1)' 
              : verificationResult.ticketExists 
                ? 'rgba(255, 193, 7, 0.1)' 
                : 'rgba(220, 53, 69, 0.1)',
            border: `2px solid ${
              verificationResult.verified 
                ? '#28a745' 
                : verificationResult.ticketExists 
                  ? '#ffc107' 
                  : '#dc3545'
            }`
          }}>
            <h3 style={{
              textAlign: 'center',
              color: verificationResult.verified 
                ? '#28a745' 
                : verificationResult.ticketExists 
                  ? '#ffc107' 
                  : '#dc3545',
              marginBottom: '10px'
            }}>
              {verificationResult.verified ? '✅ VERIFIED' : verificationResult.ticketExists ? '⚠️ TICKET FOUND' : '❌ NOT FOUND'}
            </h3>
            <p style={{
              textAlign: 'center',
              color: '#333',
              fontSize: '1rem',
              lineHeight: '1.5'
            }}>
              {verificationResult.message}
            </p>
            {verificationResult.ticketExists && (
              <div style={{
                marginTop: '15px',
                padding: '10px',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                borderRadius: '5px',
                border: '1px solid #007bff'
              }}>
                <p style={{
                  textAlign: 'center',
                  color: '#007bff',
                  fontSize: '0.9rem',
                  margin: '0'
                }}>
                  <strong>Status:</strong> {verificationResult.isInAccidentDB ? 'Associated with accident report' : 'No accident report found'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default TVerification
