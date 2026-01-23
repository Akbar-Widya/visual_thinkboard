import { useTaskStore } from "../store/useTaskStore";
import TaskRow from "../components/TaskRow";

const BoardView = () => {
  const { tasks, loading, searchQuery } = useTaskStore();
  const columns = ["todo", "in-progress", "done"];

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading)
    return <div className="p-8 text-sm text-text-muted">Loading board...</div>;

  return (
    <div className="flex flex-1 h-full gap-6 p-6 overflow-x-auto bg-white">
      {columns.map((col) => (
        <div key={col} className="flex-1 min-w-80 max-w-110 flex flex-col shrink-0">
          {/* Column Header */}
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
              {col === "in-progress" ? "Doing" : col}
            </h3>
            <span className="text-[10px] bg-side-bg px-2 py-0.5 rounded-full font-bold">
              {filteredTasks.filter((t) => t.status === col).length}
            </span>
          </div>

          {/* Task List in Column */}
          <div className="flex flex-col border border-border rounded-lg bg-white min-h-[100px] overflow-hidden">
            {filteredTasks
              .filter((t) => t.status === col)
              .map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}

            {filteredTasks.filter((t) => t.status === col).length === 0 && (
              <div className="p-8 text-center text-xs text-text-muted italic">
                No tasks here
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoardView;