import { Droppable } from "@hello-pangea/dnd";
import { ITask, TaskStatus } from "../../App";
import { Task } from "../Task";
import styles from "./tasks.module.css";

interface Props {
  tasks: ITask[];
  onDelete: (taskId: string) => void;
  onMoveTask: (taskId: string, newStatus: TaskStatus) => void;
}

const COLUMNS: { id: TaskStatus; label: string }[] = [
  { id: "To Do", label: "To Do" },
  { id: "Doing", label: "Doing" },
  { id: "Pendente", label: "Pendente" },
  { id: "Done", label: "Done" },
];

export function Tasks({ tasks, onDelete, onMoveTask }: Props) {
  return (
    <div className={styles.tasks}>
      <div className={styles.kanbanBoard}>
        {COLUMNS.map((column) => (
          <div key={column.id} className={styles.column}>
            <header className={styles.columnHeader}>
              <p>{column.label}</p>
              <span>{tasks.filter((t) => t.status === column.id).length}</span>
            </header>

            <Droppable droppableId={column.id}>
              {(provided) => (
                <div 
                  className={styles.columnList} 
                  {...provided.droppableProps} 
                  ref={provided.innerRef}
                >
                  {tasks
                    .filter((t) => t.status === column.id)
                    .map((task, index) => (
                      <Task 
                        key={task.id} 
                        index={index} 
                        task={task} 
                        onDelete={onDelete} 
                        onMoveTask={onMoveTask} 
                      />
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </div>
  );
}