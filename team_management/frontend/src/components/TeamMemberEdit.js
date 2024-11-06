import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchTeamMembers, editTeamMember, deleteTeamMember } from '../api/teamMemberApi';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/TeamMember.css';

function TeamMemberEdit() {
  const { memberId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: member, isLoading, error } = useQuery({
    queryKey: ['teamMembers', memberId],
    queryFn: () => fetchTeamMembers(memberId),
    enabled: !!memberId,
    onError: () => alert("Error loading team member data"),
  });

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    role: 'regular',
  });

  useEffect(() => {
    if (!memberId) {
      alert("Invalid member ID.");
      navigate('/'); // Redirect if memberId is invalid
      return;
    }

    if (member) {
      setFormData({
        first_name: member.first_name,
        last_name: member.last_name,
        phone_number: member.phone_number,
        email: member.email,
        role: member.role,
      });
    }
  }, [member, memberId, navigate]);

  const editMutation = useMutation({
    mutationFn: editTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries(['teamMembers']);
      navigate('/');
    },
    onError: () => alert("Failed to edit team member. Please try again."),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries(['teamMembers']);
      navigate('/');
    },
    onError: () => alert("Failed to delete team member. Please try again."),
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
    if (!/^\d+$/.test(formData.phone_number)) {
      alert("Phone number should contain only digits.");
      return;
    }
    editMutation.mutate({ id: memberId, ...formData });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      deleteMutation.mutate(memberId);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading team member data</p>;

  return (
    <div className="form-container">
      <h2 className="form-header">Edit team member</h2>
      <p className="form-subheader">Edit contact info, location, and role.</p>

      <form onSubmit={handleSubmit}>
        <div className="section-title">Info</div>

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
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="section-title">Role</div>

        <div className="form-group radio-group-container">
          <div className="radio-group">
            <input
              type="radio"
              id="regular"
              name="role"
              value="regular"
              checked={formData.role === 'regular'}
              onChange={handleChange}
            />
            <label htmlFor="regular">Regular – Can't delete members</label>
          </div>
          <div className="radio-group">
            <input
              type="radio"
              id="admin"
              name="role"
              value="admin"
              checked={formData.role === 'admin'}
              onChange={handleChange}
            />
            <label htmlFor="admin">Admin – Can delete members</label>
          </div>
        </div>

        <button type="submit" className="save-btn">Save</button>
        <button type="button" className="cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
        <button type="button" className="delete-btn" onClick={handleDelete}>Delete</button>
      </form>
    </div>
  );
}

export default TeamMemberEdit;
