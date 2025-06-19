import React from 'react'
import bgImage from '../image/background.png'  
function ALogin() {
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
          border: '1px solid #ccc', padding: '20px', borderRadius: '5px', background: '#fff', padding: '20px',

          background: 'rgba(255, 255, 255, 0)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px 0 rgba(30, 36, 116, 0.37)',
          backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.18)'
        }}>
          <h2>Login</h2>
          <form
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
              <label htmlFor="username" style={{ marginBottom: '5px' }}>Admin ID :</label>
              <input type="text" id="username" name="username" required style={{ width: '90%', padding: '8px' }} />
            </div>
            <div style={{ display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                width: '100%' }}>
              <label htmlFor="password" style={{ marginBottom: '5px' }}>Password :</label>
              <input type="password" id="password" name="password" required style={{ width: '90%', padding: '8px' }} />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: 'red',
                color: '#fff',
                border: 'none',
                padding: '10px',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '16px',
                fontWeight: 'bold',
                marginTop: '20px' 
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ALogin