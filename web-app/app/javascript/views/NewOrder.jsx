import React, { useState } from 'react';

const NewOrder = ({ assigneeProps = [{ id: '123', name: 'placeholder'}] }) => {
  const initialAddress = {
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
    assignee_id: "",
  }

  const [formData, setFormData] = useState(initialAddress)

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
    console.log('submit!', formData);

    postRequest('/api/orders/', requestBody)
    
  }

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  };



  return <>
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
              assigneeProps.map((assignee) => <option value={assignee.id}>{assignee.name}</option>)
            }
          </select>
        </div>
        <button type="submit" >Create Order</button>
    </form>
  </>
}

export default NewOrder;
