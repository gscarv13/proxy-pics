import React from "react";


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import NewOrder from "./views/NewOrder.jsx";
import Home from "./views/Home.jsx";
import Navigation from "./components/Navigation.jsx";
import SignIn from "./views/SignIn.jsx";
import Order from "./views/Order.jsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <div className="container">
          <Routes>
            <Route index element={<SignIn />} />
            <Route element={<ProtectedRoutes />}>
              <Route path='/home' element={<Home />} />
              <Route path="/new-order" element={<NewOrder />} />
              <Route path="/order/:id" element={<Order />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
