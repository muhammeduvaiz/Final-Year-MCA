import React, { useState, useEffect } from 'react'
import bgImage from '../image/background.png'
import { toast } from 'react-toastify'

function AccidentReport() {
    const [formData, setFormData] = useState({
        location: '',
        accidentDescription: '',
        accidentDate: '',
        accidentTime: '',
        casualties: ''
    })
    const [images, setImages] = useState([])
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

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files)
        if (files.length > 2) {
            toast.error('Maximum 2 images allowed')
            return
        }
        setImages(files)
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
            const formDataToSend = new FormData()
            formDataToSend.append('location', formData.location)
            formDataToSend.append('accidentDescription', formData.accidentDescription)
            formDataToSend.append('accidentDate', formData.accidentDate)
            formDataToSend.append('accidentTime', formData.accidentTime)
            formDataToSend.append('casualties', formData.casualties)
            
            // Add conductor details
            formDataToSend.append('conductorName', userInfo.name)
            formDataToSend.append('conductorPhone', userInfo.phone)
            formDataToSend.append('conductorUsername', userInfo.username)
            
            // Add multiple images
            images.forEach((image, index) => {
                formDataToSend.append('images', image)
            })

            const response = await fetch('http://localhost:5000/addAccidentData', {
                method: 'POST',
                body: formDataToSend
            })

            const result = await response.json()

            if (result.success) {
                toast.success(`Accident report submitted successfully! ${result.pnrCount} passenger tickets automatically included.`)
                setFormData({
                    location: '',
                    accidentDescription: '',
                    accidentDate: '',
                    accidentTime: '',
                    casualties: ''
                })
                setImages([])
            } else {
                toast.error(result.message || 'Failed to submit report. Please try again.')
            }
        } catch (error) {
            console.error('Error submitting accident report:', error)
            toast.error('Error submitting report. Please check your connection.')
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
                    ℹ️ All active passenger tickets from the database will be automatically included in this report.
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
                        <label htmlFor='images' style={{ fontSize: '1.1rem', color: '#333' }}>Images (Max 2)</label>
                        <input
                            type='file'
                            id='images'
                            name='images'
                            onChange={handleImageChange}
                            accept='image/*'
                            multiple
                            style={{
                                padding: '10px',
                                borderRadius: '8px',
                                border: '1px solid #ccc',
                                fontSize: '1rem',
                                width: '100%'
                            }}
                            required
                        />
                        {images.length > 0 && (
                            <div style={{ fontSize: '0.9rem', color: '#666' }}>
                                Selected: {images.length} image(s)
                            </div>
                        )}
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