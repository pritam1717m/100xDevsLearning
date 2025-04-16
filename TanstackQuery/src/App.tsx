import { useQueries, useSuspenseQuery } from "@tanstack/react-query";
import "./App.css";
import { Suspense, useState } from "react";
import { fetchUsers } from "./queries/fetchUsers";
import { fetchUserById } from "./queries/fetchUserById";

function App() {
  const [id, setId] = useState(1);
  const [on, setOn] = useState(true);

  // const users = useQuery(fetchUsers());
  // const user = useQuery(fetchUserById(id, on));
  const suspenseUsers = useSuspenseQuery(fetchUsers());

  const [users, user] = useQueries({            // Also can be used for suspense queries -> useSuspenseQueries
    queries: [fetchUsers(), fetchUserById(id, on)],
  });

  return (
    <div
      style={{
        width: "100vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        {users.isPending
          ? "Loading..."
          : users.data?.map((user: any) => <li key={user.id}>{user.name}</li>)}
        <button
          onClick={() => {
            users.refetch();
            window.alert("Caching is used here for refetching the same data");
          }}
        >
          Refetch Data
        </button>
      </div>
      <div>
        {user.isPending ? "Loading..." : user.data.name}
        <button
          onClick={() => {
            setId((prev) => prev + 1);
            if (id == 10) {
              setOn(false);
            }
          }}
        >
          Next User
        </button>
      </div>
      <Suspense fallback={"Loading..."}>
        <div>
          {suspenseUsers.isPending
            ? "Loading..."
            : users.data?.map((user: any) => (
                <li key={user.id}>{user.name}</li>
              ))}
        </div>
        <button
          onClick={() => {
            suspenseUsers.refetch();
          }}
        >
          Refetch Data
        </button>
      </Suspense>
    </div>
  );
}

export default App;
