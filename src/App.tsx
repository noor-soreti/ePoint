import Analytics from "./dashboard/components/Analytics";
import Cards from "./dashboard/components/Cards";
import { Settings } from "./dashboard/components/Settings";
import Dashboard from "./dashboard/Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import SignIn from "./sign-in/SignIn";
import SignUp from "./sign-up/SignUp";
import ConfirmUserPage from "./confirmUserPage";
import MainGrid from "./dashboard/components/MainGrid";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { Authenticator } from "@aws-amplify/ui-react";
import { Business } from "./dashboard/components/Business";
import { BusinessPage } from "./dashboard/components/BusinessPage";

Amplify.configure(outputs);

function App() {

  const isAuthenticated = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    return !!accessToken;
  };
  
  return (
    <Authenticator>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>} >
            <Route index element={<MainGrid/>} />
            <Route path="cards/:cardId" element={<Cards/>}/>
            <Route path="analytics" element={<Analytics/>}/>
            <Route path="business" element={<Business/>}/>
            <Route path="business/:businessId" element={<BusinessPage/>}/>
            <Route path="settings" element={<Settings/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Authenticator>
  );
}

export default App;

/*
<BrowserRouter>
      <Routes>
        <Route path="/" element={
          isAuthenticated() ? (
            <Navigate replace to="/home" />
          ) : (
            <Navigate replace to="/login" />
          )
        }/>
        <Route path="/login" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/confirm" element={<ConfirmUserPage/>} />
        <Route path="/home" element={
          isAuthenticated() ? <Dashboard/> : <Navigate replace to="/login" />
        }>
          <Route index element={<MainGrid/>} />
          <Route path="cards" element={<Cards/>}/>
          <Route path="analytics" element={<Analytics/>}/>
          <Route path="settings" element={<Settings/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
*/