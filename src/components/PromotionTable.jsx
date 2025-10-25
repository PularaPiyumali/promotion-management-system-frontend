import React, { useEffect, useState, useCallback } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import api from "../services/api";

export default function PromotionTable() {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPromotions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/promotions");
      console.log("Fetched promotions:", response.data);
      setPromotions(response.data || []);
    } catch (error) {
      console.error("Error fetching promotions:", error);
      setPromotions([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPromotions();
  }, [fetchPromotions]);

  const handleDelete = async (id) => {
    if (!id) return;

    try {
      await api.delete(`/promotions/${id}`);
      setPromotions(promotions.filter((promo) => promo.id !== id));
    } catch (error) {
      console.error("Error deleting promotion:", error);
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
      backgroundColor: "#f8f9fa",
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
      backgroundColor: "#f8f9fa",
      borderBottom: "2px solid #dee2e6",
      textAlign: "left",
      fontSize: "12px",
      fontWeight: "600",
      color: "#495057",
      cursor: "default",
      userSelect: "none",
      minWidth: "100px",
    },
    td: {
      padding: "12px 8px",
      borderBottom: "1px solid #dee2e6",
      fontSize: "12px",
      color: "#495057",
      maxWidth: "200px",
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
        <h3 style={styles.title}>Promotions</h3>
        <button
          style={styles.createButton}
          onClick={() => (window.location.href = "/create-promotion")}
        >
          Create New Promotion
        </button>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Start Date</th>
              <th style={styles.th}>End Date</th>
              <th style={styles.th}>Banner</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={styles.loading}>
                  Loading promotions...
                </td>
              </tr>
            ) : promotions.length === 0 ? (
              <tr>
                <td colSpan="5" style={styles.noData}>
                  No promotions found
                </td>
              </tr>
            ) : (
              promotions.map((promo, index) => (
                <tr
                  key={promo.id || index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "white" : "#f8f9fa",
                  }}
                >
                  <td style={styles.td}>{promo.name || "N/A"}</td>
                  <td style={styles.td}>
                    {promo.startDate
                      ? new Date(promo.startDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td style={styles.td}>
                    {promo.endDate
                      ? new Date(promo.endDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td style={styles.td}>
                    {promo.bannerImageUrl ? (
                      <img
                        src={`http://localhost:8080${promo.bannerImageUrl}`}
                        alt={promo.name || "Banner Preview"}
                        style={{ maxWidth: "100px", borderRadius: "6px" }}
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td style={styles.td}>
                    <button
                      style={styles.actionButton}
                      onClick={() =>
                        (window.location.href = `/edit-promotion/${promo.id}`)
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
                      onClick={() => handleDelete(promo.id)}
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
