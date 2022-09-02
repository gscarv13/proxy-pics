import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allOrders } from "../redux/features/order";
import { getRequest } from "../helpers/requests";

import { GET_ORDERS } from "../helpers/constants";

import OrderCard from "../components/order/OrderCard.jsx";

const initialSelectedFilter = { status: 'none', date: 'none', state: 'none' }

const Home = () => {
  const [stateFilter, setStateFilter] = useState({ ready: false })
  const [dateFilter, setDateFilter] = useState({ ready: false })
  const [statusFilter, setStatusFilter] = useState({ ready: false })
  const [selectedFilter, setSelectedFilter] = useState(initialSelectedFilter)
  const [filteredOrders, setFilteredOrders] = useState(null)

  const { token } = useSelector((state) => state.requester.value)
  const orders = useSelector(state => state.order.value)
  const dispatch = useDispatch();
  
  const handleFilterClick = (e) => {
    const key = e.target.name
    const value =  e.target.value

    const filtered = orders.filter(order => {
      if (key === 'state') {
        const state = order.address.split(',')[2]

        return state === value
      }
      
      if (key === 'date') {
        return order.created_at === value
      }
      
      if (key === 'status') {
        return order.status === value        
      } 
    })

    setSelectedFilter((state) => ({...state, [key]: value }))
    setFilteredOrders(filtered)
  }

  const optionsForFilter = (filterState) => {
    return <>
      {Object.keys(filterState).map(current => {
        if (current === 'ready') return

        return <option key={`key-${current}`} value={current}>{current}</option>
      })}
    </>
  }

  const ordersList = (ordersArr) => {
    return ordersArr.map((order) => < OrderCard key={order.id} order={order} />)
  }

  const cleanFilter = () => {
    setSelectedFilter(initialSelectedFilter)
    setFilteredOrders(null)
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRequest(GET_ORDERS, token);
        
        dispatch(allOrders(res.data));
        for(let order of res.data) {
          const state = order.address.split(',')[2]
          const date = order.created_at
          const status = order.status
          
          setStateFilter(prevState => ({ ...prevState, [state]: true }))
          setDateFilter(prevState => ({ ...prevState, [date]: true }))
          setStatusFilter(prevState => ({ ...prevState, [status]: true }))
        }
        setStateFilter(prevState => ({ ...prevState, ready: true }))
        setDateFilter(prevState => ({ ...prevState, ready: true }))
        setStatusFilter(prevState => ({ ...prevState, ready: true }))
      } catch (error) {
        throw new Error(error)
      }
    }
    fetchData();
  }, []);
  
  return <>
    <div className="order-card-container">
      <h2>Orders list</h2>
      <div className="order-list-filters">
        <div>
          Filter by{' '}
          <select onChange={handleFilterClick} name='state' value={selectedFilter.state}>
            <option value="none" selected disabled hidden>State</option>
            { 
              stateFilter.ready && optionsForFilter(stateFilter)
            }
          </select>
          <select onChange={handleFilterClick} name='date' value={selectedFilter.date}>
            <option value="none" selected disabled hidden>Date</option>
            {
              dateFilter.ready && optionsForFilter(dateFilter)
            }
          </select>
          <select onChange={handleFilterClick} name='status' value={selectedFilter.status}>
            <option value="none" selected disabled hidden>Status</option>
            {
              statusFilter.ready && optionsForFilter(statusFilter)
            }
          </select>
        </div>
          <button onClick={cleanFilter}>Reset filters</button>
      </div>
      {orders.length > 0 && 
        filteredOrders ? ordersList(filteredOrders) : ordersList(orders)
      }
    </div>
  </>
}

export default Home;
