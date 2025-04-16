import { queryOptions } from "@tanstack/react-query";

export const fetchUsers = () =>
  queryOptions({
    queryKey: ["users"],
    queryFn: getUsers,
  });

const getUsers = async () => {
  const res = fetch("https://jsonplaceholder.typicode.com/users");
  return (await res).json();
};
