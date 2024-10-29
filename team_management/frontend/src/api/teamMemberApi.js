import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

export const fetchTeamMembers = async () => {
  try {
    const res = await api.get('teammembers');
    return res.data;
  } catch (error) {
    console.error("Error fetching team members:", error);
    throw error;
  }
};

export const addTeamMember = async (data) => {
  try {
    const res = await api.post('teammembers/', data);
    return res.data;
  } catch (error) {
    console.error("Error adding team member:", error);
    throw error;
  }
};

export const editTeamMember = async (id, data) => {
  try {
    const res = await api.put(`teammembers/${id}/`, data);
    return res.data;
  } catch (error) {
    console.error("Error editing team member:", error);
    throw error;
  }
};

export const deleteTeamMember = async (id) => {
  try {
    const res = await api.delete(`teammembers/${id}/`);
    return res.data;
  } catch (error) {
    console.error("Error deleting team member:", error);
    throw error;
  }
};
