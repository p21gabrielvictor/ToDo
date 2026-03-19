import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";

const LOCAL_STORAGE_KEY = "todo:savedTasks";

// 1. Definição dos tipos (Essenciais para os outros arquivos)
export type TaskStatus = "To Do" | "Doing" | "Pendente" | "Done";

export interface ITask {
  id: string;
  title: string;
  status: TaskStatus;
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  function setTasksAndSave(newTasks: ITask[]) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  function addTask(taskTitle: string) {
    setTasksAndSave([
      ...tasks,
      { id: crypto.randomUUID(), title: taskTitle, status: "To Do" },
    ]);
  }

  function deleteTaskById(taskId: string) {
    setTasksAndSave(tasks.filter((task) => task.id !== taskId));
  }

  function moveTask(taskId: string, newStatus: TaskStatus) {
    setTasksAndSave(tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
  }

  function onDragEnd(result: DropResult) {
    const { destination, draggableId } = result;
    if (!destination) return;
    moveTask(draggableId, destination.droppableId as TaskStatus);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Header onAddTask={addTask} />
      <Tasks tasks={tasks} onDelete={deleteTaskById} onMoveTask={moveTask} />
    </DragDropContext>
  );
}

export default App;