// File: src/styles/ExerciseStyles.js

const styles = {
  page: {
    backgroundColor: "#FFF6E0",
    fontFamily: "'Inter', sans-serif",
    color: "#272829",
    height: "100vh",
    overflow: "hidden",
  },
  scrollContainer: {
    scrollSnapType: "y mandatory",
    overflowY: "scroll",
    height: "100vh",
    scrollBehavior: "smooth",
  },
  snapSection: {
    scrollSnapAlign: "start",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  sectionBox: {
    backgroundColor: "#FFF6E0",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(216, 217, 218, 0.4)",
    padding: "2rem",
    width: "90%",
    maxWidth: "1000px",
    textAlign: "center",
  },
  categoryTitle: {
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "1.5rem",
    color: "#272829",
  },
  exerciseList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "1rem",
    marginTop: "1rem",
  },
  card: {
    backgroundColor: "#FFF6E0",
    border: "1px solid #D8D9DA",
    borderRadius: "10px",
    padding: "1rem",
    boxShadow: "0 4px 10px rgba(216,217,218,0.3)",
    transition: "transform 0.25s ease",
  },
  cardTitle: {
    fontSize: "1.2rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
  },
  cardSubtitle: {
    fontSize: "0.95rem",
    color: "#61677A",
  },
};

export default styles;
