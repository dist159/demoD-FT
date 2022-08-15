import "./App.css";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const TASK_SERVICE_URL = "http://localhost:3001";

function App() {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState();
  const [taskAmmount, setTaskAmmount] = useState();

  const loadTasks = async () => {
    const response = await fetch(
      `${TASK_SERVICE_URL}/tasks?taskAmount=${taskAmmount}`
    );

    setTasks(await response.json());
  };

  const completeTask = async (taskId) => {
    try {
      const response = await fetch(`${TASK_SERVICE_URL}/tasks`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskId,
        }),
      });
      if (response.status === 200) {
        setModalOpen(false);
      }
      console.log(await response.json());
    } catch (error) {
      console.error(error);
    }
  };

  const openTask = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleText = (e) => {
    setTaskAmmount(e.target.value);
  };

  return (
    <div className="App">
      <div className="task_ammount">
        <TextField
          id="filled-basic"
          label="task amount"
          variant="outlined"
          onChange={handleText}
        />
        <button onClick={loadTasks}> Load tasks</button>
      </div>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 4, md: 12 }}
      >
        {tasks.map((task, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Card
              variant="outlined"
              onClick={() => openTask(task)}
              className="task"
            >
              <div>
                task #{index} : {task.Title}{" "}
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card variant="outlined" className="card">
          <div>TITLE: {selectedTask?.Title} </div>
          <div>UUID: {selectedTask?.UUID} </div>
          <button onClick={() => completeTask(selectedTask._id)}>
            Terminate task
          </button>
          <button onClick={() => setModalOpen(false)}>close modal</button>
        </Card>
      </Modal>
    </div>
  );
}

export default App;
