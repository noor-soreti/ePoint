import Analytics from "./dashboard/components/Analytics";
import Cards from "./dashboard/components/Cards";
import { Settings } from "./dashboard/components/Settings";
import Dashboard from "./dashboard/Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import SignIn from "./sign-in/SignIn";
import SignUp from "./sign-up/SignUp";
import ConfirmUserPage from "./confirmUserPage";
import MainGrid from "./dashboard/components/MainGrid";

function App() {

  const isAuthenticated = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    return !!accessToken;
  };
  
  return (
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
  );
}

export default App;
