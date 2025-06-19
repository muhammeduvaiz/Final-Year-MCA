import React from 'react'
import bgImage from '../image/background.png'

const TVerification = () => {
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
                }}>TICKET VERIFICATION</h1>
                <form style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                    }}>
                        <label htmlFor='ticketId' style={{ fontSize: '1.1rem', color: '#333' }}>PNR ID</label>
                        <input 
                            type='text' 
                            id='ticketId' 
                            name='ticketId' 
                            placeholder='Enter PNR ID'
                            style={{
                                padding: '10px',
                                borderRadius: '8px',
                                border: '1px solid #ccc',
                                fontSize: '1rem',
                                width: '100%'
                            }}
                        />
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                    }}>
                        <label htmlFor='busNumber' style={{ fontSize: '1.1rem', color: '#333' }}>Bus Number</label>
                        <input 
                            type='text' 
                            id='busNumber' 
                            name='busNumber' 
                            placeholder='Enter Bus Number'
                            style={{
                                padding: '10px',
                                borderRadius: '8px',
                                border: '1px solid #ccc',
                                fontSize: '1rem',
                                width: '100%'
                            }}
                        />
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                    }}>
                        <label htmlFor='date' style={{ fontSize: '1.1rem', color: '#333' }}>Journey Date</label>
                        <input 
                            type='date' 
                            id='date' 
                            name='date' 
                            style={{
                                padding: '10px',
                                borderRadius: '8px',
                                border: '1px solid #ccc',
                                fontSize: '1rem',
                                width: '100%'
                            }}
                        />
                    </div>

                    <button 
                        type='submit'
                        style={{
                            backgroundColor: '#28a745',
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
                        Verify Ticket
                    </button>
                </form>
            </div>
        </div>
    )
}

export default TVerification