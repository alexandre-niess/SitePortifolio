import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Portifolio } from "./pages/Portifolio/Portifolio.jsx";
import { Home } from "./pages/Home/Home.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/SitePortifolio" element={<App />}>
          <Route index element={<Home />} />
          <Route path="portifolio" element={<Portifolio />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
