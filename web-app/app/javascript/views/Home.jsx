import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allOrders } from "../redux/features/order";
import { fetchData } from "../helpers/requests";

import OrderCard from "../components/order/OrderCard.jsx";

const Home = () => {
  const orders = useSelector(state => state.order.value)
  const dispatch = useDispatch();
  
  const handleFilterClick = (e) => {

  }

  useEffect(() => {
    fetchData(dispatch, allOrders);
  }, []);
  
  return <>
    <div className="order-card-container">
      <h2>Orders list</h2>
      <div className="order-list-filters">
          Filter by{' '}
          <select name='state'>
            <option value="none" selected disabled hidden>State</option>
          </select>
          <select name='date'>
            <option value="none" selected disabled hidden>Date</option>
          </select>
          <select name='status'>
            <option value="none" selected disabled hidden>Status</option>
          </select>
      </div>
      {orders.length > 0 && orders.map((order) => < OrderCard key={order.id} order={order} />)}
    </div>
  </>
}

export default Home;
