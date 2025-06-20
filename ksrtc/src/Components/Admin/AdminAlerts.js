import React, { useState, useEffect } from 'react'
import bgImage from '../image/background.png'
import axios from 'axios'

function AdminAlerts() {
  const [rrtRequests, setRrtRequests] = useState([])
  const [accidentReports, setAccidentReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('rrt')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch RRT requests
      const rrtResponse = await axios.get('http://localhost:5000/getAllRrtRequests')
      if (rrtResponse.data.success) {
        setRrtRequests(rrtResponse.data.data)
      }

      // Fetch accident reports
      const accidentResponse = await axios.get('http://localhost:5000/getAllAccidentReports')
      if (accidentResponse.data.success) {
        setAccidentReports(accidentResponse.data.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setMessage('Error loading data')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (type, id, status, adminResponse = '') => {
    try {
      let response
      if (type === 'rrt') {
        response = await axios.put(`http://localhost:5000/updateRrtStatus/${id}`, {
          status,
          adminResponse
        })
      } else if (type === 'accident') {
        response = await axios.put(`http://localhost:5000/updateAccidentStatus/${id}`, {
          status,
          adminResponse
        })
      }

      if (response.data.success) {
        setMessage(`${type.toUpperCase()} request ${status} successfully`)
        fetchData() // Refresh data
      }
    } catch (error) {
      console.error('Error updating status:', error)
      setMessage('Error updating status')
    }
  }

  const formatDateTime = (dateString, timeString) => {
    const date = new Date(dateString)
    return `${date.toLocaleDateString()} at ${timeString}`
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffc107'
      case 'accepted': return '#28a745'
      case 'rejected': return '#dc3545'
      default: return '#6c757d'
    }
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: `url(${bgImage}) center center / cover no-repeat`
      }}>
        <div style={{ color: 'white', fontSize: '1.2rem' }}>Loading...</div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '20px',
      background: `url(${bgImage}) center center / cover no-repeat`
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
      }}>
        <h1 style={{
          textAlign: 'center',
          marginBottom: '30px',
          color: '#333',
          fontSize: '2.5rem'
        }}>ADMIN ALERTS</h1>

        {message && (
          <div style={{
            padding: '10px',
            marginBottom: '20px',
            borderRadius: '8px',
            textAlign: 'center',
            backgroundColor: message.includes('successfully') ? '#d4edda' : '#f8d7da',
            color: message.includes('successfully') ? '#155724' : '#721c24',
            border: `1px solid ${message.includes('successfully') ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            {message}
          </div>
        )}

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          marginBottom: '20px',
          borderBottom: '2px solid #dee2e6'
        }}>
          <button
            onClick={() => setActiveTab('rrt')}
            style={{
              padding: '10px 20px',
              border: 'none',
              background: activeTab === 'rrt' ? '#007bff' : '#f8f9fa',
              color: activeTab === 'rrt' ? 'white' : '#333',
              cursor: 'pointer',
              borderRadius: '5px 5px 0 0',
              marginRight: '5px'
            }}
          >
            RRT Requests ({rrtRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('accident')}
            style={{
              padding: '10px 20px',
              border: 'none',
              background: activeTab === 'accident' ? '#007bff' : '#f8f9fa',
              color: activeTab === 'accident' ? 'white' : '#333',
              cursor: 'pointer',
              borderRadius: '5px 5px 0 0'
            }}
          >
            Accident Reports ({accidentReports.length})
          </button>
        </div>

        {/* RRT Requests Tab */}
        {activeTab === 'rrt' && (
          <div>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>RRT Requests</h2>
            {rrtRequests.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#666' }}>No RRT requests found</p>
            ) : (
              <div style={{ display: 'grid', gap: '20px' }}>
                {rrtRequests.map((request) => (
                  <div key={request._id} style={{
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    padding: '20px',
                    backgroundColor: 'white'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '15px'
                    }}>
                      <div>
                        <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                          Location: {request.location}
                        </h3>
                        <p style={{ margin: '5px 0', color: '#666' }}>
                          <strong>Date:</strong> {formatDateTime(request.date, request.time)}
                        </p>
                        <p style={{ margin: '5px 0', color: '#666' }}>
                          <strong>Conductor:</strong> {request.conductorDetails?.name || 'Unknown'} | 
                          <strong>Phone:</strong> {request.conductorDetails?.phone || 'Unknown'}
                        </p>
                        <p style={{ margin: '5px 0', color: '#666' }}>
                          <strong>Status:</strong> 
                          <span style={{
                            backgroundColor: getStatusColor(request.status),
                            color: 'white',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            marginLeft: '8px'
                          }}>
                            {request.status.toUpperCase()}
                          </span>
                        </p>
                      </div>
                      {request.status === 'pending' && (
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button
                            onClick={() => handleStatusUpdate('rrt', request._id, 'accepted')}
                            style={{
                              backgroundColor: '#28a745',
                              color: 'white',
                              border: 'none',
                              padding: '8px 16px',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleStatusUpdate('rrt', request._id, 'rejected')}
                            style={{
                              backgroundColor: '#dc3545',
                              color: 'white',
                              border: 'none',
                              padding: '8px 16px',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Description:</h4>
                      <p style={{ margin: '0', color: '#666', lineHeight: '1.5' }}>
                        {request.description}
                      </p>
                    </div>

                    <div>
                      <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>
                        Passenger Tickets ({request.passengerTickets.length}):
                      </h4>
                      <div style={{
                        maxHeight: '200px',
                        overflowY: 'auto',
                        border: '1px solid #dee2e6',
                        borderRadius: '4px',
                        padding: '10px'
                      }}>
                        {request.passengerTickets.map((ticket, index) => (
                          <div key={index} style={{
                            borderBottom: index < request.passengerTickets.length - 1 ? '1px solid #eee' : 'none',
                            padding: '8px 0'
                          }}>
                            <p style={{ margin: '2px 0', fontSize: '0.9rem' }}>
                              <strong>PNR:</strong> {ticket.pnr} | 
                              <strong>Route:</strong> {ticket.source} → {ticket.destination} | 
                              <strong>Passengers:</strong> {ticket.adult} adults, {ticket.child} children
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {request.adminResponse && (
                      <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                        <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>Admin Response:</h4>
                        <p style={{ margin: '0', color: '#666' }}>{request.adminResponse}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Accident Reports Tab */}
        {activeTab === 'accident' && (
          <div>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>Accident Reports</h2>
            {accidentReports.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#666' }}>No accident reports found</p>
            ) : (
              <div style={{ display: 'grid', gap: '20px' }}>
                {accidentReports.map((report) => (
                  <div key={report._id} style={{
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    padding: '20px',
                    backgroundColor: 'white'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '15px'
                    }}>
                      <div>
                        <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                          Location: {report.location}
                        </h3>
                        <p style={{ margin: '5px 0', color: '#666' }}>
                          <strong>Date:</strong> {formatDateTime(report.accidentDate, report.accidentTime)}
                        </p>
                        <p style={{ margin: '5px 0', color: '#666' }}>
                          <strong>Conductor:</strong> {report.conductorDetails?.name || 'Unknown'} | 
                          <strong>Phone:</strong> {report.conductorDetails?.phone || 'Unknown'}
                        </p>
                        <p style={{ margin: '5px 0', color: '#666' }}>
                          <strong>Casualties:</strong> {report.casualties || 'Not specified'}
                        </p>
                        <p style={{ margin: '5px 0', color: '#666' }}>
                          <strong>Status:</strong> 
                          <span style={{
                            backgroundColor: getStatusColor(report.status || 'pending'),
                            color: 'white',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            marginLeft: '8px'
                          }}>
                            {(report.status || 'pending').toUpperCase()}
                          </span>
                        </p>
                      </div>
                      {(report.status === 'pending' || !report.status) && (
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button
                            onClick={() => handleStatusUpdate('accident', report._id, 'accepted')}
                            style={{
                              backgroundColor: '#28a745',
                              color: 'white',
                              border: 'none',
                              padding: '8px 16px',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleStatusUpdate('accident', report._id, 'rejected')}
                            style={{
                              backgroundColor: '#dc3545',
                              color: 'white',
                              border: 'none',
                              padding: '8px 16px',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Description:</h4>
                      <p style={{ margin: '0', color: '#666', lineHeight: '1.5' }}>
                        {report.accidentDescription}
                      </p>
                    </div>

                    {report.images && report.images.length > 0 && (
                      <div style={{ marginBottom: '15px' }}>
                        <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Images:</h4>
                        <div style={{
                          display: 'flex',
                          gap: '10px',
                          flexWrap: 'wrap'
                        }}>
                          {report.images.map((image, index) => (
                            <img 
                              key={index}
                              src={`http://localhost:5000/${image}`} 
                              alt={`Accident ${index + 1}`} 
                              style={{
                                maxWidth: '200px',
                                maxHeight: '200px',
                                borderRadius: '4px',
                                border: '1px solid #dee2e6'
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {report.adminResponse && (
                      <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                        <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>Admin Response:</h4>
                        <p style={{ margin: '0', color: '#666' }}>{report.adminResponse}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminAlerts 