import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="card">
      <Link to={"/counter"}>Counter</Link>
      <Link to={"/user-profile"}>UserProfile</Link>
      <Link to={"/shop"}>Shop</Link>
    </div>
  )
}
