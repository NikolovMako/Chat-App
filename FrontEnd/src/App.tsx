import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TokenProvider } from "./hooks/useToken";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";


export default function App() {
  return (
    <BrowserRouter>
      <TokenProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="*"
            element={<RegisterPage />} />
          <Route
            path="/chat-page"
            element={<ChatPage />}
          />
        </Routes>
      </TokenProvider>
    </BrowserRouter>
  );
}