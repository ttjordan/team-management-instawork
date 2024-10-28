import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

export const fetchTeamMembers = () => api.get('teammembers').then(res => res.data);
export const addTeamMember = (data) => api.post('teammembers/', data).then(res => res.data);
export const editTeamMember = (id, data) => api.put(`teammembers/${id}/`, data).then(res => res.data);
export const deleteTeamMember = (id) => api.delete(`teammembers/${id}/`).then(res => res.data);
