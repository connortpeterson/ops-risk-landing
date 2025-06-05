// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        color: '#333333',
        padding: '1rem',
      }}
    >
      <h1>Worried your next deal’s IT/ops risk is hidden?</h1>
      <p>Get a 1-page execution risk snapshot in under 5 minutes.</p>
      <input
        type="email"
        placeholder="your email"
        style={{
          padding: '0.5rem',
          margin: '0.5rem 0',
          border: '1px solid #ccc',
          borderRadius: '4px',
          width: '100%',
          maxWidth: '300px',
        }}
      />
      <button
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Continue
      </button>
    </div>
  );
}

const container = document.getElementById('root');
if (container) {
  ReactDOM.createRoot(container).render(<App />);
} else {
  console.error('Unable to find #root element to mount React.');
}
