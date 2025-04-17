import { queryOptions } from "@tanstack/react-query";

export const fetchUserById = (id: number, on : boolean) =>
  queryOptions({
    queryKey: ["users", id],
    queryFn: () => getUserById(id),
    enabled: on
  });

const getUserById = async (id: number) => {
  const res = fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  return (await res).json();
};
