import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { Turnstile } from '@marsidev/react-turnstile';

function App() {
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState("");
  return (
    <>
      <input type="text" name="otp" id="otp" onChange={(e) => setOtp(e.currentTarget.value) } />
      <Turnstile onSuccess={(token) => setToken(token)}  siteKey={import.meta.env.VITE_SITE_KEY} />
      <button onClick={async () => {
        await axios.post("http://localhost:3000/reset-password", {
          email: "pritam1212@gmail.com",
          otp,
          token
        })
      }}>Submit</button>
    </>
  )
}

export default App
