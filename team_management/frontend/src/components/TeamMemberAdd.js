import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTeamMember } from '../api/teamMemberApi';
import { useNavigate } from 'react-router-dom';
import '../styles/TeamMember.css';

function TeamMemberAdd() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    role: 'regular',
  });

  const addMemberMutation = useMutation({
    mutationFn: addTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries(['teamMembers']);
      navigate('/');
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMemberMutation.mutate(formData);
  };

  return (
    <div className="form-container">
      <h2 className="form-header">Add a team member</h2>
      <p className="form-subheader">Set email, location, and role.</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="regular">Regular – Can't delete members</option>
            <option value="admin">Admin – Can delete members</option>
          </select>
        </div>

        <button type="submit" className="save-btn">Save</button>
      </form>
    </div>
  );
}

export default TeamMemberAdd;
