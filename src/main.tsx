import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react';
import { BrowserRouter, Routes, Route } from "react-router";
import MainGrid from "./dashboard/components/MainGrid.tsx";
import Cards from "./dashboard/components/Cards.tsx";
import Analytics from "./dashboard/components/Analytics.tsx";
import { Settings } from "./dashboard/components/Settings.tsx";
import { generateClient } from "aws-amplify/api";
import { Schema } from "../amplify/data/resource.ts";
import '@aws-amplify/ui-react/styles.css';
import { getCurrentUser } from 'aws-amplify/auth';

Amplify.configure(outputs);

// const client = generateClient<Schema>();
// console.log(getCurrentUser());

const currentUser = async () => {
  console.log(await getCurrentUser())
}

currentUser()


document.title = "ePoint"
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <Authenticator>
        <ThemeProvider>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} >
            <Route index element={<MainGrid/>}/>
            <Route path="/cards" element={<Cards/>}/>
            <Route path="/analytics" element={<Analytics/>}/>
            <Route path="/settings" element={<Settings/>}/>
            </Route>
          </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Authenticator>
  </React.StrictMode>
);
