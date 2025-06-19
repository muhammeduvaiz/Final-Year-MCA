import React, { useState } from 'react'
import bgImage from '../image/background.png'

function AccidentReport() {
    const [formData, setFormData] = useState({
        location: '',
        accidentDescription: '',
        accidentDate: '',
        accidentTime: '',
        casualties: ''
    })
    const [image, setImage] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState('')

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setMessage('')

        try {
            const formDataToSend = new FormData()
            formDataToSend.append('location', formData.location)
            formDataToSend.append('accidentDescription', formData.accidentDescription)
            formDataToSend.append('accidentDate', formData.accidentDate)
            formDataToSend.append('accidentTime', formData.accidentTime)
            formDataToSend.append('casualties', formData.casualties)
            
            if (image) {
                formDataToSend.append('image', image)
            }

            const response = await fetch('http://localhost:5000/addAccidentData', {
                method: 'POST',
                body: formDataToSend
            })

            const result = await response.json()

            if (result.success) {
                setMessage(`Accident report submitted successfully! ${result.pnrCount} PNRs automatically included.`)
                setFormData({
                    location: '',
                    accidentDescription: '',
                    accidentDate: '',
                    accidentTime: '',
                    casualties: ''
                })
                setImage(null)
            } else {
                setMessage(result.message || 'Failed to submit report. Please try again.')
            }
        } catch (error) {
            console.error('Error submitting accident report:', error)
            setMessage('Error submitting report. Please check your connection.')
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
                }}>ACCIDENT REPORT</h1>
                
                <div style={{
                    padding: '10px',
                    marginBottom: '20px',
                    borderRadius: '8px',
                    textAlign: 'center',
                    backgroundColor: '#e7f3ff',
                    color: '#0056b3',
                    border: '1px solid #b3d9ff',
                    fontSize: '0.9rem'
                }}>
                    ℹ️ All active PNRs from the ticket database will be automatically included in this report.
                </div>
                
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
                        <label htmlFor='location' style={{ fontSize: '1.1rem', color: '#333' }}>Accident Location</label>
                        <input
                            type='text'
                            id='location'
                            name='location'
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder='Enter Accident Location'
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
                        <label htmlFor='accidentDescription' style={{ fontSize: '1.1rem', color: '#333' }}>Accident Description</label>
                        <textarea
                            name='accidentDescription'
                            id='accidentDescription'
                            value={formData.accidentDescription}
                            onChange={handleInputChange}
                            placeholder='Enter Accident Description'
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
                        <label htmlFor='accidentDate' style={{ fontSize: '1.1rem', color: '#333' }}>Accident Date</label>
                        <input
                            type='date'
                            id='accidentDate'
                            name='accidentDate'
                            value={formData.accidentDate}
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
                        <label htmlFor='accidentTime' style={{ fontSize: '1.1rem', color: '#333' }}>Accident Time</label>
                        <input
                            type='time'
                            id='accidentTime'
                            name='accidentTime'
                            value={formData.accidentTime}
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
                        <label htmlFor='image' style={{ fontSize: '1.1rem', color: '#333' }}>Image</label>
                        <input
                            type='file'
                            id='image'
                            name='image'
                            onChange={handleImageChange}
                            accept='image/*'
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
                        <label htmlFor='casualties' style={{ fontSize: '1.1rem', color: '#333' }}>Casualties</label>
                        <input
                            type='number'
                            id='casualties'
                            name='casualties'
                            value={formData.casualties}
                            onChange={handleInputChange}
                            min='0'
                            placeholder='Enter number of casualties'
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
                        disabled={isSubmitting}
                        style={{
                            backgroundColor: isSubmitting ? '#6c757d' : '#dc3545',
                            color: 'white',
                            border: 'none',
                            padding: '12px',
                            borderRadius: '8px',
                            fontSize: '1.1rem',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            marginTop: '20px',
                            transition: 'background-color 0.3s'
                        }}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Report'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AccidentReport