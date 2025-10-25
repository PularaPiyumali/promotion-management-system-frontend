import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import UserForm from "../components/UserForm";

export default function EditUserPage() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/admins/${id}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (loading) return <div>Loading user data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>User not found</div>;

  return <UserForm existing={userData} />;
}
