import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./contexts/UserContext";
import { Provider } from "./components/ui/provider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
