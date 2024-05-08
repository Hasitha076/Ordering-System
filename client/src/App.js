import { useContext, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Sidebar from "./scenes/layout/Sidebar";
import TopBar from "./scenes/layout/TopBar";
import Dashboard from "./scenes/dashboard";
import Team from './scenes/Team'
import Contacts from "./scenes/contacts";
import Order from "./scenes/orders";
import Products from "./scenes/products";
import UserForm from "./scenes/userForm";
import ProductForm from "./scenes/productForm";
import SignInSide from "./scenes/login/SignInSide";
import { loginStatus } from "./contextApi/GlobalApi";
import Bar from "./scenes/bar";
import Pie from "./scenes/pie";
import Line from "./scenes/line";
import SignUp from "./scenes/register/SignUp";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const { isLoggedIn } = useContext(loginStatus)
  console.log(isLoggedIn);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Routes>

            <Route path="/signup" element={<SignUp />} />

            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <SignInSide />
                )
              }
            />


            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <>
                    <Sidebar isSidebar={isSidebar} />
                    <main className="content">
                      <TopBar setIsSidebar={setIsSidebar} />
                      <Dashboard />
                    </main></>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/team"
              element={
                isLoggedIn ? (
                  <>
                    <Sidebar isSidebar={isSidebar} />
                    <main className="content">
                      <TopBar setIsSidebar={setIsSidebar} />
                      <Team />
                    </main></>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/contacts"
              element={
                isLoggedIn ? (
                  <>
                    <Sidebar isSidebar={isSidebar} />
                    <main className="content">
                      <TopBar setIsSidebar={setIsSidebar} />
                      <Contacts />
                    </main></>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/orders"
              element={
                isLoggedIn ? (
                  <>
                    <Sidebar isSidebar={isSidebar} />
                    <main className="content">
                      <TopBar setIsSidebar={setIsSidebar} />
                      <Order />
                    </main></>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/products"
              element={
                isLoggedIn ? (
                  <>
                    <Sidebar isSidebar={isSidebar} />
                    <main className="content">
                      <TopBar setIsSidebar={setIsSidebar} />
                      <Products />
                    </main></>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/create-product"
              element={
                isLoggedIn ? (
                  <>
                    <Sidebar isSidebar={isSidebar} />
                    <main className="content">
                      <TopBar setIsSidebar={setIsSidebar} />
                      <ProductForm />
                    </main></>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/create-user"
              element={
                isLoggedIn ? (
                  <>
                    <Sidebar isSidebar={isSidebar} />
                    <main className="content">
                      <TopBar setIsSidebar={setIsSidebar} />
                      <UserForm />
                    </main></>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/piechart"
              element={
                isLoggedIn ? (
                  <>
                    <Sidebar isSidebar={isSidebar} />
                    <main className="content">
                      <TopBar setIsSidebar={setIsSidebar} />
                      <Pie />
                    </main></>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/barchart"
              element={
                isLoggedIn ? (
                  <>
                    <Sidebar isSidebar={isSidebar} />
                    <main className="content">
                      <TopBar setIsSidebar={setIsSidebar} />
                      <Bar />
                    </main></>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/linechart"
              element={
                isLoggedIn ? (
                  <>
                    <Sidebar isSidebar={isSidebar} />
                    <main className="content">
                      <TopBar setIsSidebar={setIsSidebar} />
                      <Line />
                    </main></>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
