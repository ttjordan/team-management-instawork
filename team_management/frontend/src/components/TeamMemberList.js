import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTeamMembers, deleteTeamMember } from '../api/teamMemberApi';
import { useNavigate } from 'react-router-dom';
import '../styles/TeamMember.css';

function TeamMemberList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: teamMembers = [], isLoading, error } = useQuery({
    queryKey: ['teamMembers'],
    queryFn: fetchTeamMembers,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries(['teamMembers']);
    },
  });

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleAdd = () => {
    navigate('/add');
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching team members</p>;

  return (
    <div className="container">
      <div className="header">
        <h2>Team Members</h2>
        <button onClick={handleAdd}>+</button>
      </div>
      <p className="subheader">You have {teamMembers.length} team members.</p>
      <ul>
        {teamMembers.map(member => (
          <li key={member.id} className="list-item">
            <img src="https://via.placeholder.com/40" alt="Avatar" />
            <div className="list-item-info">
              <h3>{member.first_name} {member.last_name} ({member.role})</h3>
              <p>{member.phone_number}</p>
              <p>{member.email}</p>
            </div>
            <div className="list-item-buttons">
              <button className="edit-btn" onClick={() => handleEdit(member.id)}>Edit</button>
              <button className="delete-btn-list" onClick={() => handleDelete(member.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamMemberList;
