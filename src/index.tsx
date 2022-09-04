import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { Provider } from "react-redux";
import store from "./redux/state";
import "./style.css";
import SquezaPage from "./Pages/squezaPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path={"/login"} />
        <Route element={<Register />} path={"register"} />
        <Route element={<SquezaPage />} path={"squezze"} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
