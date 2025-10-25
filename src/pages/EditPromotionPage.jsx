import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import PromotionForm from "../components/PromotionForm";

export default function EditPromotionPage() {
  const { id } = useParams();
  const [promotionData, setPromotionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        const response = await api.get(`/promotions/${id}`);
        setPromotionData(response.data);
      } catch (error) {
        console.error("Error fetching promotion:", error);
        setError("Failed to load promotion data");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPromotion();
  }, [id]);

  if (loading) return <div>Loading promotion data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!promotionData) return <div>Promotion not found</div>;

  return <PromotionForm existing={promotionData} />;
}
