import React, {useEffect, useState} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {fetchTeamMembers, editTeamMember, deleteTeamMember} from '../api/teamMemberApi';
import {useNavigate, useParams} from 'react-router-dom';
import '../styles/TeamMember.css';

function TeamMemberEdit() {
    const {memberId} = useParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {data: member, isLoading, error} = useQuery({
        queryKey: ['teamMembers', memberId],
        queryFn: () => fetchTeamMembers(String(memberId)),
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

    const [serverError, setServerError] = useState(null);

    useEffect(() => {
        if (member) {
            setFormData({
                first_name: member.first_name,
                last_name: member.last_name,
                phone_number: member.phone_number,
                email: member.email,
                role: member.role,
            });
        }
    }, [member]);

    const editMutation = useMutation({
        mutationFn: (data) => editTeamMember(memberId, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['teamMembers']);
            navigate('/');
        },
        onError: (error) => {
            if (error.response && error.response.data) {
                const errorMessages = Object.values(error.response.data).flat().join(" ");
                setServerError(errorMessages);
            } else {
                setServerError("Failed to edit team member. Please try again.");
            }
        },
    });

    const deleteMutation = useMutation({
        mutationFn: () => deleteTeamMember(memberId),
        onSuccess: () => {
            queryClient.invalidateQueries(['teamMembers']);
            navigate('/');
        },
        onError: () => setServerError("Failed to delete team member. Please try again."),
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setServerError(null);
        
        if (!/^\d{10,15}$/.test(formData.phone_number)) {
            setServerError("Phone number must be between 10 and 15 digits and contain only numbers.");
            return;
        }

        editMutation.mutate(formData);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this team member?')) {
            deleteMutation.mutate();
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

            {serverError && <p className="error-message">{serverError}</p>}

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
