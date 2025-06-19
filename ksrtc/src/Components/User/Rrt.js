import React from 'react'
import bgImage from '../image/background.png'

function Rrt() {
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
        <form style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'center',
            width: '100%'
          }}>
            <label htmlFor='location' style={{ fontSize: '1.1rem', color: '#333' }}>Location</label>
            <input 
              type='text' 
              id='location' 
              name='location' 
              placeholder='Enter Location'
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '1rem',
                width: '90%',
                textAlign: 'center'
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'center',
            width: '100%'
          }}>
            <label htmlFor='description' style={{ fontSize: '1.1rem', color: '#333' }}>Description</label>
            <textarea 
              name='description' 
              id='description' 
              placeholder='Enter Description'
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '1rem',
                width: '90%',
                minHeight: '100px',
                resize: 'vertical',
                textAlign: 'center'
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'center',
            width: '100%'
          }}>
            <label htmlFor='date' style={{ fontSize: '1.1rem', color: '#333' }}>Date</label>
            <input 
              type='date' 
              id='date' 
              name='date'
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '1rem',
                width: '90%',
                textAlign: 'center'
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'center',
            width: '100%'
          }}>
            <label htmlFor='time' style={{ fontSize: '1.1rem', color: '#333' }}>Time</label>
            <input 
              type='time' 
              id='time' 
              name='time'
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '1rem',
                width: '90%',
                textAlign: 'center'
              }}
            />
          </div>

          <button 
            type='submit'
            style={{
              backgroundColor: '#ffc107',
              color: 'black',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '1.1rem',
              cursor: 'pointer',
              marginTop: '20px',
              transition: 'background-color 0.3s',
              width: '90%'
            }}
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  )
}

export default Rrt