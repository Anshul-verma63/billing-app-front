import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import SearchBill from "./component/SearchBill";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import {
  PrivateLoginRoutes,
  Privateroutes,
} from "./PrivateRoutes/Privateroutes";
import AllBills from "./component/AllBills";
import ShowBill from "./component/ShowBill";
import Search from "./component/Search";
import NotFound from "./component/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateLoginRoutes />}>
          <Route path="" element={<LoginPage />} />
        </Route>
        <Route path="/add-product" element={<Privateroutes />}>
          <Route path="" element={<Navbar />} />
        </Route>
        <Route path="/search" element={<Search />} />
        <Route path="/admin-dashboard" element={<Privateroutes />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="/all-bills" element={<Privateroutes />}>
          <Route path="" element={<AllBills />} />
        </Route>
        <Route path="/show-bill/:bid" element={<Privateroutes />}>
          <Route path="" element={<ShowBill />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
