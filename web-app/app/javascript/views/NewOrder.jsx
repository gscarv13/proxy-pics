import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { assignees as assigneesAction } from '../redux/features/requester'
import { getRequest, postRequest } from '../helpers/requests';
import { GET_ASSIGNEES, POST_ORDER } from '../helpers/constants';

const initialFormState = {
  street_address: "",
  city: "",
  state: "",
  zip_code: "",
  assignee_id: "",
}

const NewOrder = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.requester.value)
  const assignees = useSelector((state) => state.requester.assignees)
  const [formData, setFormData] = useState(initialFormState)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRequest(GET_ASSIGNEES, token);
        dispatch(assigneesAction(res.data)); 
      } catch (error) {
        throw new Error(error)
      }
    }
    fetchData();
  }, []);

 
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      address: {
        street_address: formData.street_address,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zip_code,  
      },
      assignee_id: formData.assignee_id,
    }
    try {      
      postRequest(POST_ORDER, requestBody, token)
      setFormData(initialFormState)
      navigate('/home')
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <>
    <h2>Create Order:</h2>
    <form onSubmit={handleSubmit}>
        <div>
          <label>Address</label>
          <input onChange={handleChange}  type="text" placeholder="40570 Savanna" name="street_address" required />
        </div>
        <div>
          <label>City</label>
          <input onChange={handleChange} type="text" placeholder="South Dawson" name="city" required />
        </div>
        <div>
          <label>State</label>
          <input onChange={handleChange} type="text" placeholder="South Dakota" name="state" required />
        </div>
        <div>
          <label>Zip code</label>
          <input onChange={handleChange} type="text" placeholder="45600" name="zip_code" required/>
        </div>
        <div>
          <label>Assignee</label>
          <select onChange={handleChange} type="text" placeholder="Select assignee" name="assignee_id" required >
            <option value="none" selected disabled hidden>Select assignee</option>
            {
              assignees.map((assignee) => <option key={`assignee-${assignee.id}`} value={assignee.id} >{assignee.name}</option>)
            }
          </select>
        </div>
        <button type="submit" >Create Order</button>
    </form>
  </>
  )
}

export default NewOrder;
