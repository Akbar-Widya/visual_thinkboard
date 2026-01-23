import { useTaskStore } from "../store/useTaskStore";

const TaskRow = ({ task, showIndicator }) => {
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const setSelectedTask = useTaskStore((state) => state.setSelectedTask);

  return (
    <div className="group flex items-center justify-between p-3 border-b border-border hover:bg-side-bg transition-all">
      <div
        onClick={() => setSelectedTask(task)}
        className="flex items-center gap-3 min-w-0"
      >
        {showIndicator && (
          <div
            className={`w-1.5 h-6 rounded-full ${
              task.status === "done" ? "bg-green-500" : "bg-border"
            }`}
          />
        )}
        <span className="text-sm font-medium truncate">{task.title}</span>
      </div>

      {/* Action Area: group-hover logic */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
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
          className="p-1.5 -me-2 text-red-600 hover:text-red-700 transition-colors cursor-pointer"
          title="Delete Task"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            className="w-5 h-5 fill-current"
          >
            <path d="M232.7 69.9C237.1 56.8 249.3 48 263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9zM128 208L512 208L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 208zM216 272C202.7 272 192 282.7 192 296L192 488C192 501.3 202.7 512 216 512C229.3 512 240 501.3 240 488L240 296C240 282.7 229.3 272 216 272zM320 272C306.7 272 296 282.7 296 296L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 296C344 282.7 333.3 272 320 272zM424 272C410.7 272 400 282.7 400 296L400 488C400 501.3 410.7 512 424 512C437.3 512 448 501.3 448 488L448 296C448 282.7 437.3 272 424 272z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskRow;
