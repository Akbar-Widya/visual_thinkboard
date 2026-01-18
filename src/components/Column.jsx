import TaskItem from './TaskRow';

const Column = ({ status, tasks }) => {
  return (
    <div className="w-80 flex flex-col shrink-0">
      <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-4 px-2">
        {status.replace('-', ' ')} ({tasks.length})
      </h3>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;