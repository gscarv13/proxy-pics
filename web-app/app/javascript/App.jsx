import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

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
            <Route index element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/new-order" element={<NewOrder />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/order/:id" element={<Order />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
