import { useState } from "react";
import "./App.css";
import AllRoutes from "./routes/Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./helpers/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <AllRoutes />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
