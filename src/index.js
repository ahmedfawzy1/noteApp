import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "react-bootstrap/dist/react-bootstrap.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import UserContextProvider from "./components/Context/UserContext.js";
import NoteContextProvider from "./components/Context/NotesContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <NoteContextProvider>
        <App />
      </NoteContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);

reportWebVitals();
