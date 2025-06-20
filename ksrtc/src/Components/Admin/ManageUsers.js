import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../image/background.png';
import axios from 'axios';

function ManageUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phone: '',
    password: '',
    confirmpassword: '',
    age: '',
    gender: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/admin/users', {
        withCredentials: true
      });
      setUsers(response.data);
    } catch (error) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      username: '',
      phone: '',
      password: '',
      confirmpassword: '',
      age: '',
      gender: ''
    });
    setEditingUser(null);
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.username || !formData.phone || !formData.password || !formData.confirmpassword) {
      setError('Please fill in all required fields.');
      return false;
    }
    if (formData.password !== formData.confirmpassword) {
      setError('Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      if (editingUser) {
        await axios.put(`http://localhost:5000/admin/users/${editingUser._id}`, formData, { withCredentials: true });
      } else {
        await axios.post('http://localhost:5000/admin/users', formData, { withCredentials: true });
      }
      fetchUsers();
      setShowForm(false);
      resetForm();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to save user');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || '',
      username: user.username || '',
      phone: user.phone || '',
      password: '',
      confirmpassword: '',
      age: user.age || '',
      gender: user.gender || ''
    });
    setShowForm(true);
    setError('');
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/admin/users/${userId}`, { withCredentials: true });
        fetchUsers();
      } catch (error) {
        setError('Failed to delete user');
      }
    }
  };

  const handleAddNew = () => {
    resetForm();
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    resetForm();
  };

  return (
    <div style={{ minHeight: '100vh', background: `url(${bgImage}) center center / cover no-repeat`, padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', background: 'rgba(255, 255, 255, 0.9)', borderRadius: '16px', padding: '30px', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#333', margin: 0 }}>Manage Users</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleAddNew} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add New User</button>
            <button onClick={() => navigate('/adashboard')} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Back to Dashboard</button>
          </div>
        </div>
        {error && <div style={{ backgroundColor: 'rgba(220, 53, 69, 0.1)', color: '#dc3545', padding: '15px', borderRadius: '5px', marginBottom: '20px', textAlign: 'center' }}>{error}</div>}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>Loading users...</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Name</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Username</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Phone</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Age</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Gender</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '15px' }}>{user.name}</td>
                    <td style={{ padding: '15px' }}>{user.username}</td>
                    <td style={{ padding: '15px' }}>{user.phone}</td>
                    <td style={{ padding: '15px' }}>{user.age}</td>
                    <td style={{ padding: '15px' }}>{user.gender}</td>
                    <td style={{ padding: '15px' }}>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <button
                          onClick={() => handleEdit(user)}
                          style={{
                            padding: '5px 10px',
                            backgroundColor: '#ffc107',
                            color: 'black',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            transition: 'background 0.2s, color 0.2s',
                          }}
                          onMouseOver={e => {
                            e.target.style.backgroundColor = '#e0a800';
                            e.target.style.color = 'white';
                          }}
                          onMouseOut={e => {
                            e.target.style.backgroundColor = '#ffc107';
                            e.target.style.color = 'black';
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          style={{
                            padding: '5px 10px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            transition: 'background 0.2s',
                          }}
                          onMouseOver={e => {
                            e.target.style.backgroundColor = '#a71d2a';
                          }}
                          onMouseOut={e => {
                            e.target.style.backgroundColor = '#dc3545';
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {showForm && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', width: '90%', maxWidth: '500px', maxHeight: '80vh', overflowY: 'auto' }}>
              <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>{editingUser ? 'Edit User' : 'Add New User'}</h2>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} autoComplete="off">
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}><span>Name:</span></label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }} autoComplete="off" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}><span>Username:</span></label>
                  <input type="text" name="username" value={formData.username} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }} autoComplete="off" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}><span>Phone:</span></label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }} autoComplete="off" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}><span>Password:</span></label>
                  <input type="password" name="password" value={formData.password} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }} autoComplete="new-password" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}><span>Confirm Password:</span></label>
                  <input type="password" name="confirmpassword" value={formData.confirmpassword} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }} autoComplete="new-password" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}><span>Age:</span></label>
                  <input type="number" name="age" value={formData.age} onChange={handleInputChange} style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }} autoComplete="off" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}><span>Gender:</span></label>
                  <select name="gender" value={formData.gender} onChange={handleInputChange} style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }} required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                  <button type="submit" style={{ flex: 1, padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>{editingUser ? 'Update User' : 'Add User'}</button>
                  <button type="button" onClick={handleCancel} style={{ flex: 1, padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageUsers;
