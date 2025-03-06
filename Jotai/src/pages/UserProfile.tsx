import { useAtom } from "jotai";
import { loadableUserAtom } from "../store/atom/atom";

export default function UserProfile() {
  const [userDetails] = useAtom(loadableUserAtom);

  if (userDetails.state == "hasError") return "Something Went Wrong";
  if (userDetails.state == "loading") return "Loading...";
  return <div>
    <h2>User Details</h2>
    <p>{userDetails.data.name}</p>
    <p>{userDetails.data.email}</p>
  </div>;
}
