import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { BrowserRouter, Routes, Route } from "react-router";
// import { MainGrid } from "./components/MainGrid/MainGrid.tsx";
// import { Settings } from "./components/Settings/Settings.tsx";
// import { Analytics } from "./components/Analytics/Analytics.tsx";
// import { Cards } from "./components/Cards/Cards.tsx";

Amplify.configure(outputs);
document.title = "TEST"
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator >
      <ThemeProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} >
            {/* <Route index element={<MainGrid/>} />
            <Route path="cards/:pid" element={<Cards/>} />
            <Route path="analytics" element={<Analytics/>} />
            <Route path="settings" element={<Settings/>} /> */}
          </Route>
        </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Authenticator>
  </React.StrictMode>
);
