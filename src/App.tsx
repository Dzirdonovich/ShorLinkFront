import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import SquezaPage from "./Pages/squezaPage";

function App() {
  return (
    <BrowserRouter>
      <Route element={<Login />} path={"login"} />
      <Route element={<Register />} path={"register"} />
      <Route element={<SquezaPage />} path="squezze" />
    </BrowserRouter>
  );
}

export default App;
