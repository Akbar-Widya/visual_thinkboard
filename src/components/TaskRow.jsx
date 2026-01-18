import { useTaskStore } from "../store/useTaskStore";

const TaskRow = ({ task }) => {
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const setSelectedTask = useTaskStore((state) => state.setSelectedTask);

  return (
    <div className="group flex items-center justify-between p-3 border-b border-border hover:bg-side-bg transition-all">
      <div
        onClick={() => setSelectedTask(task)}
        className="flex items-center gap-3 min-w-0"
      >
        <div
          className={`w-1.5 h-6 rounded-full ${
            task.status === "done" ? "bg-green-500" : "bg-border"
          }`}
        />
        <span className="text-sm font-medium truncate">{task.title}</span>
      </div>

      {/* Action Area: group-hover logic */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
        <select
          value={task.status}
          onChange={(e) => updateTaskStatus(task.id, e.target.value)}
          className="text-[10px] uppercase font-bold border border-border rounded px-1 py-0.5 bg-white cursor-pointer"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">Doing</option>
          <option value="done">Done</option>
        </select>

        <button
          onClick={() => {
            if (confirm("Delete this task?")) deleteTask(task.id);
          }}
          className="text-[10px] uppercase font-bold text-red-600 hover:text-red-700 px-2 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskRow;
