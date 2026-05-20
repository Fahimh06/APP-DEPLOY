import { useEffect, useState } from "react";

import API from "../services/api";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");



  // GET TASKS
  const fetchTasks = async () => {
    try {

      const token = localStorage.getItem("token");

      const response = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data);

    } catch (error) {

      console.log(error);

    }
  };



  // CREATE TASK
  const createTask = async () => {
    try {

      const token = localStorage.getItem("token");

      await API.post(
        "/tasks",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setDescription("");

      fetchTasks();

    } catch (error) {

      console.log(error);

    }
  };



  // DELETE TASK
  const deleteTask = async (id) => {
    try {

      const token = localStorage.getItem("token");

      await API.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTasks();

    } catch (error) {

      console.log(error);

    }
  };



  useEffect(() => {
    fetchTasks();
  }, []);



  return (
    <div>

      <h1>Dashboard</h1>

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />
      <br />

      <button onClick={createTask}>
        Add Task
      </button>

      <hr />

      {
        tasks.map((task) => (
          <div key={task._id}>

            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <button
              onClick={() => deleteTask(task._id)}
            >
              Delete
            </button>

            <hr />

          </div>
        ))
      }

    </div>
  );
}

export default Dashboard;