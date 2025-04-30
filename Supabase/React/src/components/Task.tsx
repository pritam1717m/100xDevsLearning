import { ChangeEvent, useEffect, useState } from "react";
import { supabase } from "../supabase_client";
import { Session } from "@supabase/supabase-js";

interface Task {
  id: number;
  title: string;
  description: string;
  created_at: string;
  img_url: string;
} 

export default function Task({ session }: { session: Session }) {
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState(Array<Task>);
  const [updateTaskDescription, setUpdateTaskDescription] = useState("");
  const [taskImage, setTaskImage] = useState<File | null>(null);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) {
      console.error("Error while getting tasks: ", error);
      return;
    }
    setTasks(data);
  };

  const deleteTask = async (id: number) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      console.error("Error while deleting tasks: ", error);
      return;
    }
  };

  const updateTask = async (id: number) => {
    const { error } = await supabase
      .from("tasks")
      .update({ description: updateTaskDescription })
      .eq("id", id);
    if (error) {
      console.error("Error while updating tasks: ", error);
      return;
    }
  };

  const uploadImage = async (file: File ): Promise<string | null> => {
    const filePath = `${file?.name}-${Date.now()}`;
    const { error } = await supabase.storage
      .from("testimages")
      .upload(filePath, file);

    if(error) {
      console.error("Error while uploading image", error);
      return null;
    }

    const {data} = await supabase.storage.from("testimages").getPublicUrl(filePath)

    return data.publicUrl;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let imageUrl: string | null = null;

    if (taskImage) {
      imageUrl = await uploadImage(taskImage);
    }

    const { error } = await supabase
      .from("tasks")
      .insert({ ...newTask, email: session.user.email, img_url: imageUrl })
      .single();
    if (error) {
      console.error("Error while adding new task: ", error);
      return;
    }
    setNewTask({ title: "", description: "" });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setTaskImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const channel = supabase.channel("task-channel");
    channel
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "tasks" },
        (payload) => {
          const newTask = payload.new as Task;
          setTasks((prev) => [...prev, newTask]);
        }
      )
      .subscribe((status) => {
        console.log("Subscription: ", status);
      });
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div style={{ maxWidth: "300px", margin: "0 auto", padding: "1rem" }}>
      <h2>Task Manager CRUD</h2>
      <button onClick={logout}>Logout</button>
      {/* Form to add a new task */}
      <form style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Task Title"
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, title: e.target.value }))
          }
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />
        <textarea
          placeholder="Task Description"
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, description: e.target.value }))
          }
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button
          type="submit"
          style={{ padding: "0.5rem 1rem" }}
          onClick={handleSubmit}
        >
          Add Task
        </button>
      </form>

      {/* List of Tasks */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks?.map((task, key) => (
          <li
            key={key}
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <img src={task.img_url} style={{ height: 70 }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <textarea
                  placeholder="Updated description..."
                  onChange={(e) => setUpdateTaskDescription(e.target.value)}
                />
                <button
                  style={{ padding: "0.5rem 1rem", marginRight: "0.5rem" }}
                  onClick={() => updateTask(task.id)}
                >
                  Edit
                </button>
                <button
                  style={{ padding: "0.5rem 1rem" }}
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
