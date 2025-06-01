// File: src/styles/supplementGuideStyles.js

const styles = {
  container: {
    padding: "2rem",
    backgroundColor: "#111827", // dark background
    fontFamily: "Arial, sans-serif",
    color: "#f3f4f6", // light text
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    fontSize: "2.5rem",
    marginBottom: "1rem",
    color: "#facc15", // royal gold
  },
  subtitle: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#d1d5db", // light grey
    marginBottom: "2rem",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#1f2937", // dark card
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
    padding: "1.5rem",
    width: "250px",
    textAlign: "center",
    transition: "transform 0.3s ease",
  },
  cardTitle: {
    fontSize: "1.25rem",
    marginBottom: "0.75rem",
    color: "#facc15", // royal gold
    fontWeight: "bold",
  },
  cardText: {
    fontSize: "1rem",
    color: "#e5e7eb", // light gray
  },
};

export default styles;
