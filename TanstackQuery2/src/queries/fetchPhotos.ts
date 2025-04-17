import { queryOptions } from "@tanstack/react-query";

export const fetchPhotos = () =>
  queryOptions({
    queryKey: ["photos"],
    queryFn: getPhotos,
  });

const getPhotos = async () => {
  const res = fetch("https://jsonplaceholder.typicode.com/photos");
  return (await res).json();
};
