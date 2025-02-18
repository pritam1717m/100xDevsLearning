import axios from "axios"
import { useEffect, useState } from "react"

interface User {
    email : string
}

export default function Home() {

    const [user, setUser] = useState<User>();

    useEffect(() => {
        (async () => {
            const res = await axios.get("http://localhost:3000/user", {
                withCredentials: true
            })
            setUser({
                ...user,
                email : res.data.email
            })
        })()
    }, [])
  return (
    <div>
        {user?.email}
        <button onClick={async() => {
            await axios.post('http://localhost:3000/logout', {}, {withCredentials : true})
        }}>Logout</button>
    </div>
  )
}
