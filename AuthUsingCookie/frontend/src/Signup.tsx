import axios from "axios";
import { useState } from "react";

interface SignUpInput {
  email?: string;
  password?: string;
}

export default function Signup() {
  const [input, setInput] = useState<SignUpInput>();

  function handlerSubmit() {
    axios.post("http://localhost:3000/signin", input, {withCredentials : true})
  }

  return (
    <div>
      <input type="text" name="email" id="email" required  onChange={(e) => setInput({
        ...input,
        email : e.target.value
      })}/>
      <input type="password" name="password" id="password" onChange={(e) => setInput({
        ...input,
        password : e.target.value
      })} />
      <button onClick={handlerSubmit}>Login</button>
    </div>
  );
}
