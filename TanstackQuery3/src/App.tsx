import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./App.css";

function App() {

  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["post"],
    queryFn: getPosts,
  });

  const postResponse = useMutation({
    mutationFn: postPost,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey : ["post"]}) // Re-fetching the data just after post request success
    },
    retry: 5,
  });

  if (error || postResponse.error) {
    return "Something Went Wrong";
  }
  return (
    <>
      <button
        onClick={() =>
          postResponse.mutate({
            userId: 123,
            id: 123,
            title:
              "Heyy!!",
            body: "Hello Form Tanstack Query",
          })
        }
      >
        Add New Post
      </button>
      {isPending ? (
        "Loading..."
      ) : (
        <div>
          {data.map((post: any) => (
            <div
              key={post.id}
              style={{
                margin: "5px",
                padding: "5px",
                display: "flex",
                backgroundColor: "gray",
                borderRadius: "5px",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  height: "25px",
                  marginRight: "10px",
                  padding: "10px 20px",
                  backgroundColor: "orange",
                  borderRadius: "5px",
                }}
              >
                {post.userId}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <p style={{}}>{post.title}</p>
                <p>{post.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

const getPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return await res.json();
};

const postPost = async (newPost: any) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(newPost),
  });
  return await res.json();
};

export default App;
