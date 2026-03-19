import { TbTrash } from "react-icons/tb";
import { Draggable } from "@hello-pangea/dnd";
import { ITask, TaskStatus } from "../../App";
import styles from "./task.module.css";

interface Props {
  task: ITask;
  index: number;
  onDelete: (taskId: string) => void;
  onMoveTask: (taskId: string, newStatus: TaskStatus) => void;
}

export function Task({ task, index, onDelete, onMoveTask }: Props) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className={styles.task}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p className={task.status === "Done" ? styles.textCompleted : ""}>
            {task.title}
          </p>

          <button className={styles.deleteButton} onClick={() => onDelete(task.id)}>
            <TbTrash size={20} />
          </button>
        </div>
      )}
    </Draggable>
  );
}