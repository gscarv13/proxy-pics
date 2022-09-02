import React from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getRequest } from '../helpers/requests';
import { GET_ORDER } from '../helpers/constants';
import { statusColor } from '../helpers/colors';

const Order = () => {
  const { id } = useParams();
  const { token } = useSelector((state) => state.requester.value)
  const [order, setOrder] = useState(null)
  const [statusSpan, setStatusSpan] = useState({ backgroundColor: '' })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRequest(`${GET_ORDER}/${id}`, token)
        setOrder(res.data);
        setStatusSpan({ backgroundColor: statusColor[res.data.status] })
      } catch (error) {
        throw new Error(error)
      }
    }

    fetchData()
  })

  return <>
    <h2>Show page</h2>
    <div>
      {
        order && (
          <>
            <div className='order-card'>
              <span style={statusSpan}></span>
              <div className='order-card-content'>
                <p>ID {order.id}</p>
                <h3>{order.address}</h3>
                <div className='order-card-footer'>
                  <p>Status: {order.status}</p>
                  <p>Create at {order.created_at}</p>
                </div>
              </div>
            </div>

            <h3>images</h3>
            <div className='order-images-container'>
              {order.images.map((image) => (
                <div key={image.id} className='order-image'>
                  <img src={image.url} alt="" />
                </div>
              ))}
            </div>
          </>
        )
      }
    </div>
  </>
}

export default Order;
