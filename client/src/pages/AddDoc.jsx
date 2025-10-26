import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddDoc = () => {
  const [formData, setFormData] = useState({
    owner: "",
    phone: "",
    vehicleNumber: "",
    cf: "",
    np: "",
    auth: "",
    remarks: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.owner.trim() || !formData.vehicleNumber.trim()) {
      alert("Owner and Vehicle Number are required fields.");
      return;
    }

    try {
      setLoading(true);
      setMessage(null);
      setError(null);

      const response = await fetch("http://localhost:5000/api/add-doc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add document");
      }

      setMessage("✅ Document added successfully!");
      setFormData({
        owner: "",
        phone: "",
        vehicleNumber: "",
        cf: "",
        np: "",
        auth: "",
        remarks: "",
      });
    } catch (err) {
      setError("❌ Failed to add document. " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f7f7f7",
      }}
    >
        <button
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "10px 16px",
          backgroundColor: "#6c757d",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        ← Go Back
      </button>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          width: "340px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Add Vehicle</h2>

        {message && (
          <p style={{ color: "green", textAlign: "center", marginBottom: "5px" }}>
            {message}
          </p>
        )}
        {error && (
          <p style={{ color: "red", textAlign: "center", marginBottom: "5px" }}>
            {error}
          </p>
        )}

        <input
          type="text"
          name="owner"
          placeholder="Owner Name *"
          value={formData.owner}
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          style={{
            padding: "10px",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        <input
          type="text"
          name="vehicleNumber"
          placeholder="Vehicle Number *"
          value={formData.vehicleNumber}
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        <label style={{ fontSize: "0.9rem", fontWeight: "500" }}>CF Date</label>
        <input
          type="date"
          name="cf"
          value={formData.cf}
          onChange={handleChange}
          onFocus={(e) => (e.target.showPicker ? e.target.showPicker() : null)}
          style={{
            padding: "10px",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        <label style={{ fontSize: "0.9rem", fontWeight: "500" }}>NP Date</label>
        <input
          type="date"
          name="np"
          value={formData.np}
          onChange={handleChange}
          onFocus={(e) => (e.target.showPicker ? e.target.showPicker() : null)}
          style={{
            padding: "10px",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        <label style={{ fontSize: "0.9rem", fontWeight: "500" }}>Auth Date</label>
        <input
          type="date"
          name="auth"
          value={formData.auth}
          onChange={handleChange}
          onFocus={(e) => (e.target.showPicker ? e.target.showPicker() : null)}
          style={{
            padding: "10px",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        <textarea
          name="remarks"
          placeholder="Remarks (optional)"
          value={formData.remarks}
          onChange={handleChange}
          rows="3"
          style={{
            padding: "10px",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            resize: "none",
          }}
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px",
            fontSize: "1rem",
            backgroundColor: loading ? "#6c757d" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            marginTop: "10px",
            transition: "background-color 0.2s ease",
          }}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddDoc;
