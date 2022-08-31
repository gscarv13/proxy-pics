import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postRequest } from '../helpers/requests'
import { signIn } from "../redux/features/requester";
import { POST_AUTHENTICATION } from '../helpers/constants'

const SignIn = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()

  const handleAuthentication = async (e) => {
    e.preventDefault()

    const body = {
      requester: {
        name: e.target.name.value,
      }
    }

    try {
      const res = await postRequest(POST_AUTHENTICATION, body)
      console.log(res.data);
      dispatch(signIn(res.data))
      nav('/home')
    } catch (error) {
      throw new Error('authentication failed: ', error)
    }
  }

  return <>
    <div>
      <form onSubmit={handleAuthentication} >
        <input type="text" name="name" placeholder="Name" required />
        <button type="submit">Sign In</button>
      </form>
    </div>
  </>
}

export default SignIn;
