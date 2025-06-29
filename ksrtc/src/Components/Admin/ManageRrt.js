import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../image/background.png';
import axios from 'axios';
import { toast } from 'react-toastify';

function ManageRrt() {
  const navigate = useNavigate();
  const [rrtUsers, setRrtUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmpassword: ''
  });

  useEffect(() => {
    fetchRrtUsers();
  }, []);

  const fetchRrtUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/admin/rrt-users', {
        withCredentials: true
      });
      setRrtUsers(response.data);
    } catch (error) {
      toast.error('Failed to fetch RRT users');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmpassword: ''
    });
    setEditingUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.username || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields.');
      return false;
    }
    
    // For new users, password is required
    if (!editingUser) {
      if (!formData.password || !formData.confirmpassword) {
        toast.error('Password fields are required for new users.');
        return false;
      }
    }
    
    // If password is provided (either for new user or update), validate it
    if (formData.password || formData.confirmpassword) {
      if (!formData.password || !formData.confirmpassword) {
        toast.error('Both password fields must be filled if updating password.');
        return false;
      }
      if (formData.password !== formData.confirmpassword) {
        toast.error('Passwords do not match.');
        return false;
      }
      if (formData.password.length < 6) {
        toast.error('Password must be at least 6 characters long.');
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      if (editingUser) {
        console.log('Updating RRT user:', editingUser._id, formData);
        const response = await axios.put(`http://localhost:5000/admin/rrt-users/${editingUser._id}`, formData, { withCredentials: true });
        console.log('Update response:', response.data);
        toast.success('RRT user updated successfully');
      } else {
        console.log('Creating new RRT user:', formData);
        const response = await axios.post('http://localhost:5000/admin/rrt-users', formData, { withCredentials: true });
        console.log('Create response:', response.data);
        toast.success('RRT user added successfully');
      }
      fetchRrtUsers();
      setShowForm(false);
      resetForm();
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      console.error('Error response:', error.response?.data);
      toast.error(error.response?.data?.error || 'Failed to save RRT user');
    }
  };

  const handleEdit = (user) => {
    console.log('Editing user:', user);
    setEditingUser(user);
    setFormData({
      name: user.name || '',
      username: user.username || '',
      email: user.email || '',
      phone: user.phone || '',
      password: '',
      confirmpassword: ''
    });
    setShowForm(true);
  };

  const handleDelete = async (userId) => {
    console.log('Deleting user with ID:', userId);
    if (window.confirm('Are you sure you want to delete this RRT user?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/admin/rrt-users/${userId}`, { withCredentials: true });
        console.log('Delete response:', response.data);
        toast.success('RRT user deleted successfully');
        fetchRrtUsers();
      } catch (error) {
        console.error('Error in handleDelete:', error);
        console.error('Error response:', error.response?.data);
        toast.error(error.response?.data?.error || 'Failed to delete RRT user');
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
          <h1 style={{ color: '#d32f2f', margin: 0 }}>Manage RRT Team</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleAddNew} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add New RRT Member</button>
            <button onClick={() => navigate('/adashboard')} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Back to Dashboard</button>
          </div>
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>Loading RRT team members...</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Name</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Username</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Email</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Phone</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rrtUsers.map((user) => (
                  <tr key={user._id} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '15px' }}>{user.name}</td>
                    <td style={{ padding: '15px' }}>{user.username}</td>
                    <td style={{ padding: '15px' }}>{user.email}</td>
                    <td style={{ padding: '15px' }}>{user.phone}</td>
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
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', width: '90%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
              <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#d32f2f' }}>{editingUser ? 'Edit RRT Member' : 'Add New RRT Member'}</h2>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} autoComplete="off">
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}><span style={{ color: 'red' }}>*</span> Name:</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }} autoComplete="off" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}><span style={{ color: 'red' }}>*</span> Username:</label>
                  <input type="text" name="username" value={formData.username} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }} autoComplete="off" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}><span style={{ color: 'red' }}>*</span> Email:</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }} autoComplete="off" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}><span style={{ color: 'red' }}>*</span> Phone:</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }} autoComplete="off" />
                </div>
                {!editingUser && (
                  <>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}><span style={{ color: 'red' }}>*</span> Password:</label>
                      <input type="password" name="password" value={formData.password} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }} autoComplete="new-password" />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}><span style={{ color: 'red' }}>*</span> Confirm Password:</label>
                      <input type="password" name="confirmpassword" value={formData.confirmpassword} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }} autoComplete="new-password" />
                    </div>
                  </>
                )}
                {editingUser && (
                  <>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password (leave blank to keep current):</label>
                      <input type="password" name="password" value={formData.password} onChange={handleInputChange} style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }} autoComplete="new-password" placeholder="Enter new password" />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Confirm Password:</label>
                      <input type="password" name="confirmpassword" value={formData.confirmpassword} onChange={handleInputChange} style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }} autoComplete="new-password" placeholder="Confirm new password" />
                    </div>
                  </>
                )}
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                  <button type="submit" style={{ flex: 1, padding: '10px', backgroundColor: '#d32f2f', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>{editingUser ? 'Update RRT Member' : 'Add RRT Member'}</button>
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

export default ManageRrt; 