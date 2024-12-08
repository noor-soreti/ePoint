import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { BrowserRouter, Routes, Route } from "react-router";
import { Settings } from "./components/Settings/Settings.tsx";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator >
      <ThemeProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} >
            <Route path="settings" element={<Settings/>} />
          </Route>
        </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Authenticator>
  </React.StrictMode>
);
