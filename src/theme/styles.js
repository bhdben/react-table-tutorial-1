const styles = {
  global: {
    "html, body": {
      backgroundColor: "white",
      color: "black",
    },
    svg: {
      cursor: "pointer",
    },
    ".table": {
      border: "1px solid #000000",
    },
    ".tr": {
      display: "flex",
      width: "fit-content",
    },
    ".th": { 
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "black",
      padding: "0.5rem",
      fontWeight: "bold",
      fontSize: "xs",
      textTransform: "uppercase",
      textAlign: "center",
      borderBottom: "1px solid #000000",
    },
    ".td": {
      boxShadow: "none",
    },
    ".td.calculated": {
      borderTop: "1px solid #000000",
    },
    ".td > input": {
      m: "1",
      padding: "0.2rem",
      bg: "transparent",
      maxW: "100%",
      color: "black",
    },
    ".date-wrapper": {
      display: "flex",
      alignItems: "center",
      w: "100%",
      h: "100%",
    },
    ".resizer": {
      position: "absolute",
      opacity: 0,
      top: 0,
      right: 0,
      h: "100%",
      w: "5px",
      bg: "#27bbff",
      cursor: "col-resize",
      userSelect: "none",
      touchAction: "none",
      borderRadius: "6px",
    },
    ".resizer.isResizing": {
      bg: "#2eff31",
      opacity: 1,
    },
    "*:hover > .resizer": {
      opacity: 1,
    },
  },
};

export default styles;
