// File: src/styles/ExerciseStyles.js

const styles = {
  pagePremium: {
    padding: "2.5rem",
    backgroundColor: "#111827", // dark background
    fontFamily: "'Inter', sans-serif",
    color: "#f3f4f6",
  },
  pageTitle: {
    fontSize: "2.75rem",
    textAlign: "center",
    marginBottom: "2.5rem",
    color: "#facc15", // royal gold
    fontWeight: "700",
  },
  categorySection: {
    marginBottom: "2.5rem",
    borderRadius: "14px",
    backgroundColor: "#1f2937", // dark panel
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.5)",
    overflow: "hidden",
  },
  categoryTitle: {
    margin: 0,
    fontSize: "1.75rem",
    fontWeight: "600",
    letterSpacing: "0.5px",
    padding: "1rem 1.5rem",
    backgroundColor: "#374151",
    color: "#facc15",
    borderBottom: "1px solid #4b5563",
  },
  exerciseGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
    padding: "1.75rem",
    backgroundColor: "#111827",
  },
  cardPremium: {
    flex: "1 1 280px",
    backgroundColor: "#1f2937",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
    cursor: "pointer",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    color: "#f3f4f6",
  },
  cardPremiumHover: {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
  },
  cardTitle: {
    margin: "0 0 0.75rem 0",
    fontSize: "1.35rem",
    color: "#facc15",
    fontWeight: "600",
  },
  cardSubtitle: {
    fontSize: "1rem",
    color: "#d1d5db",
    lineHeight: 1.6,
  },
};

export default styles;
