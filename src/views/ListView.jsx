import { useTaskStore } from "../store/useTaskStore";
import TaskRow from "../components/TaskRow";
import CreateTaskBar from "../components/CreateTaskBar";

const ListView = () => {
  const { tasks, searchQuery } = useTaskStore();

  // Filter tasks based on search query
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-white">
      <CreateTaskBar />
      <div className="flex-1 overflow-auto">
        {/* We remove the .filter((t) => t.status === col) because there are no columns here */}
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))
        ) : (
          <div className="p-10 text-center text-sm text-text-muted">
            {searchQuery ? "No tasks match your search." : "Your workspace is empty."}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListView;