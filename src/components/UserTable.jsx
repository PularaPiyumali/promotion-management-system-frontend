import React, { useEffect, useState, useCallback } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import api from "../services/api";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/admins");
      setUsers(response.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admins/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const styles = {
    container: {
      marginTop: "30px",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      overflow: "hidden",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px",
      borderBottom: "1px solid #dee2e6",
    },
    title: { margin: 0, fontSize: "20px", fontWeight: "600", color: "#343a40" },
    createButton: {
      padding: "10px 20px",
      backgroundColor: "#000",
      color: "#fff",
      fontWeight: "700",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
    },
    tableContainer: { overflowX: "auto" },
    table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
    th: {
      padding: "12px 8px",
      borderBottom: "2px solid #dee2e6",
      textAlign: "left",
      fontSize: "12px",
      fontWeight: "600",
      color: "#495057",
      backgroundColor: "#f8f9fa",
      minWidth: "100px",
    },
    td: {
      padding: "12px 8px",
      borderBottom: "1px solid #dee2e6",
      fontSize: "12px",
      color: "#495057",
      maxWidth: "150px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    actionButton: {
      padding: "6px 12px",
      backgroundColor: "#000",
      color: "white",
      border: "1px solid #000",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "11px",
      fontWeight: "500",
      marginRight: "5px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s ease",
    },
    loading: { textAlign: "center", padding: "40px", color: "#6c757d" },
    noData: {
      textAlign: "center",
      padding: "40px",
      color: "#6c757d",
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Users</h3>
        <button
          style={styles.createButton}
          onClick={() => (window.location.href = "/create-user")}
        >
          Create User
        </button>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>First Name</th>
              <th style={styles.th}>Last Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Username</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={styles.loading}>
                  Loading users...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="7" style={styles.noData}>
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr
                  key={user.id || index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "white" : "#f8f9fa",
                  }}
                >
                  <td style={styles.td}>{user.firstName || "N/A"}</td>
                  <td style={styles.td}>{user.lastName || "N/A"}</td>
                  <td style={styles.td}>{user.email || "N/A"}</td>
                  <td style={styles.td}>{user.phoneNumber || "N/A"}</td>
                  <td style={styles.td}>{user.username || "N/A"}</td>
                  <td style={styles.td}>{user.role || "N/A"}</td>
                  <td style={styles.td}>
                    <button
                      style={styles.actionButton}
                      onClick={() =>
                        (window.location.href = `/edit-user/${user.id}`)
                      }
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#333")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#000")
                      }
                    >
                      <FiEdit size={16} />
                    </button>

                    <button
                      style={styles.actionButton}
                      onClick={() => handleDelete(user.id)}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#333")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#000")
                      }
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
