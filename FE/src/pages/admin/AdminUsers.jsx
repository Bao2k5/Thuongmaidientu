import { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { api } from '../../services/api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadUsers();
  }, [page]);

  const loadUsers = async () => {
    try {
      const response = await api.get(`/admin/users?page=${page}&limit=20`);
      setUsers(response.data.users || []);
      setTotalPages(response.data.pages || 1);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (userId, newRole) => {
    try {
      await api.put(`/admin/users/${userId}`, { role: newRole });
      loadUsers();

      { }
      {
          </div >
        )
      }
      </div >
    </AdminLayout >
  );
};

export default AdminUsers;
