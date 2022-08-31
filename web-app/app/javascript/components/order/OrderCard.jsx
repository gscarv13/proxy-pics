import React from 'react';
import { Link } from 'react-router-dom';

const OrderCard = ({ order }) => {

  return <div className='order-card'>
    <span></span>
    <div className='order-card-content'>
      <p>ID {order.id}</p>
      <h3>{order.address}</h3>
      <div className='order-card-footer'>
        <p>Status: {order.status}</p>
        <p>Create at {order.created_at}</p>
      </div>
    </div>
    <Link className='order-card-link' to={`/order/${order.id}`}>details</Link>
  </div>

}

export default OrderCard;