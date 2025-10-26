import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const TrackDoc = () => {
  const [filters, setFilters] = useState({
    owner: "",
    vehicleNumber: "",
    cfStart: "",
    cfEnd: "",
    npStart: "",
    npEnd: "",
    authStart: "",
    authEnd: "",
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setResults([]);

    const query = Object.entries(filters)
      .filter(([_, value]) => value.trim() !== "")
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    if (!query) {
      alert("Please fill at least one search field.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/track-doc?${query}`);

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Search failed");
      setResults(data.documents || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date)) return "-";
    return date.toISOString().split("T")[0]; // Only YYYY-MM-DD
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7f7f7",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "40px",
        paddingBottom: "40px",
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
      <h2 style={{ marginBottom: "20px" }}>Track Documents</h2>

      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          backgroundColor: "white",
          padding: "25px 30px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          width: "400px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          name="owner"
          placeholder="Owner Name"
          value={filters.owner}
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
          placeholder="Vehicle Number"
          value={filters.vehicleNumber}
          onChange={handleChange}
          style={{
            padding: "10px",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        {/* CF Range */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "500" }}>CF Expiry Range</label>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="date"
              name="cfStart"
              value={filters.cfStart}
              onChange={handleChange}
              style={{
                flex: 1,
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <input
              type="date"
              name="cfEnd"
              value={filters.cfEnd}
              onChange={handleChange}
              style={{
                flex: 1,
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
        </div>

        {/* NP Range */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "500" }}>NP Expiry Range</label>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="date"
              name="npStart"
              value={filters.npStart}
              onChange={handleChange}
              style={{
                flex: 1,
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <input
              type="date"
              name="npEnd"
              value={filters.npEnd}
              onChange={handleChange}
              style={{
                flex: 1,
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
        </div>

        {/* Auth Range */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "500" }}>Auth Expiry Range</label>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="date"
              name="authStart"
              value={filters.authStart}
              onChange={handleChange}
              style={{
                flex: 1,
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <input
              type="date"
              name="authEnd"
              value={filters.authEnd}
              onChange={handleChange}
              style={{
                flex: 1,
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px",
            backgroundColor: loading ? "#6c757d" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "1rem",
          }}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Results Table */}
      <div style={{ width: "80%", maxWidth: "800px" }}>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        {results.length > 0 ? (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "white",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <thead style={{ backgroundColor: "#007bff", color: "white" }}>
              <tr>
                <th style={{ padding: "10px", textAlign: "left" }}>Owner</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Phone</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Vehicle No</th>
                <th style={{ padding: "10px", textAlign: "left" }}>CF Expiry</th>
                <th style={{ padding: "10px", textAlign: "left" }}>NP Expiry</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Auth Expiry</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {results.map((doc) => (
                <tr key={doc._id}>
                  <td style={{ padding: "10px", borderTop: "1px solid #ddd" }}>{doc.owner}</td>
                  <td style={{ padding: "10px", borderTop: "1px solid #ddd" }}>{doc.phone || "-"}</td>
                  <td style={{ padding: "10px", borderTop: "1px solid #ddd" }}>{doc.vehicleNumber}</td>
                  <td style={{ padding: "10px", borderTop: "1px solid #ddd" }}>{formatDate(doc.cf)}</td>
                  <td style={{ padding: "10px", borderTop: "1px solid #ddd" }}>{formatDate(doc.np)}</td>
                  <td style={{ padding: "10px", borderTop: "1px solid #ddd" }}>{formatDate(doc.auth)}</td>
                  <td style={{ padding: "10px", borderTop: "1px solid #ddd" }}>{doc.remarks || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <p style={{ textAlign: "center", color: "#555" }}>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default TrackDoc;
