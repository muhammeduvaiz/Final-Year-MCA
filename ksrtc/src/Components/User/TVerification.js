import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bgImage from '../image/background.png'
import axios from 'axios'
import { toast } from 'react-toastify'

const TVerification = () => {
  const [pnr, setPnr] = useState('')
  const [verificationResult, setVerificationResult] = useState(null)
  const [ticketDetails, setTicketDetails] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!pnr.trim()) {
      toast.error('Please enter a PNR number')
      return
    }

    setLoading(true)
    setVerificationResult(null)
    setTicketDetails(null)
    setShowPopup(false)

    try {
      const response = await axios.post('http://localhost:5000/ticketverify', { pnr })
      
      if (response.data.success) {
        setTicketDetails(response.data.ticketDetails)
        setShowPopup(true)
        setVerificationResult({
          success: true,
          message: 'PNR verified successfully!'
        })
        toast.success('PNR verified successfully!')
      }
    } catch (error) {
      console.error('Verification error:', error)
      if (error.response && error.response.status === 404) {
        setVerificationResult({
          success: false,
          message: 'Invalid PNR - Ticket not found'
        })
        toast.error('Invalid PNR - Ticket not found')
      } else {
        setVerificationResult({
          success: false,
          message: 'Error occurred during verification. Please try again.'
        })
        toast.error('Error occurred during verification. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    navigate('/dashboard')
  }

  const closePopup = () => {
    setShowPopup(false)
    setTicketDetails(null)
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

        {verificationResult && !verificationResult.success && (
          <div style={{
            marginTop: '30px',
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: 'rgba(220, 53, 69, 0.1)',
            border: '2px solid #dc3545'
          }}>
            <h3 style={{
              textAlign: 'center',
              color: '#dc3545',
              marginBottom: '10px'
            }}>
              ❌ INVALID PNR
            </h3>
            <p style={{
              textAlign: 'center',
              color: '#333',
              fontSize: '1rem',
              lineHeight: '1.5'
            }}>
              {verificationResult.message}
            </p>
          </div>
        )}

        {/* Ticket Details Popup */}
        {showPopup && ticketDetails && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '16px',
              maxWidth: '500px',
              width: '90%',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              position: 'relative'
            }}>
              <h2 style={{
                textAlign: 'center',
                color: '#28a745',
                marginBottom: '25px',
                fontSize: '1.8rem'
              }}>
                ✅ TICKET VERIFIED
              </h2>
              
              <div style={{
                display: 'grid',
                gap: '15px',
                marginBottom: '25px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px'
                }}>
                  <strong>PNR:</strong>
                  <span>{ticketDetails.pnr}</span>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px'
                }}>
                  <strong>Date:</strong>
                  <span>{ticketDetails.date || 'Not specified'}</span>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px'
                }}>
                  <strong>Source:</strong>
                  <span>{ticketDetails.source}</span>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px'
                }}>
                  <strong>Destination:</strong>
                  <span>{ticketDetails.destination}</span>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px'
                }}>
                  <strong>Adults:</strong>
                  <span>{ticketDetails.adult}</span>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px'
                }}>
                  <strong>Children:</strong>
                  <span>{ticketDetails.child}</span>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px'
                }}>
                  <strong>Price:</strong>
                  <span>₹{ticketDetails.price}</span>
                </div>
              </div>
              
              <button
                onClick={closePopup}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '1.1rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TVerification
