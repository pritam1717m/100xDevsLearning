import { gql, useMutation, useQuery } from "@apollo/client";
import "./App.css";
import { useState } from "react";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      age
      name
      isStudent
    }
  }
`;

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      age
      name
      isStudent
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isStudent: Boolean) {
    createUser(name: $name, age: $age, isStudent: $isStudent) {
      age
      name
      isStudent
    }
  }
`;

function App() {
  const [id, setId] = useState("1");
  const [newUser, setNewUser] = useState({
    name: "",
    age: 0,
    isStudent: true,
  });

  const users = useQuery(GET_USERS);
  const user = useQuery(GET_USER_BY_ID, {
    variables: { id: id },
  });
  const [createUser] = useMutation(CREATE_USER)

  const handleOnClick = async () => {
    createUser({variables: {name: newUser.name, age: newUser.age, isStudent: newUser.isStudent}})
    users.refetch()
  }

  if (users.error) {
    return "Something went wrong";
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "30px",
          }}
        >
          <h1>Create User</h1>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) =>
                setNewUser((newUser) => ({ ...newUser, name: e.target.value }))
              }
            />
            <input
              type="number"
              name="age"
              id="age"
              onChange={(e) =>
                setNewUser((newUser) => ({
                  ...newUser,
                  age: parseInt(e.target.value),
                }))
              }
            />
            <select
              name="isStudent"
              id="isStudent"
              onChange={(e) =>
                setNewUser((newUser) => ({ ...newUser, isStudent: Boolean(e.target.value)}))
              }
            >
              <option value="true">Yes</option>
              <option value="">No</option>
            </select>
            <button onClick={() => handleOnClick()}>Add User</button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "30px",
          }}
        >
          <h1>Users</h1>
          {users.loading ? (
            "Loading..."
          ) : (
            <div>
              {users.data.getUsers.map((user: any) => (
                <div
                  key={user.id}
                  onClick={() => setId(user.id)}
                  style={{ cursor: "pointer" }}
                >
                  {user.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <h1>Selected User</h1>
          {user.loading ? "Loading..." : user.data.getUserById.name}
        </div>
      </div>
    </>
  );
}

export default App;
