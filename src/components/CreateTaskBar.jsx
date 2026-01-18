import { useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';

const CreateTaskBar = () => {
  const [title, setTitle] = useState('');
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="border-b border-border bg-white p-4">
      <input
        type="text"
        placeholder="+ Add a task to 'To Do' (Press Enter)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-side-bg border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-accent transition-colors"
      />
    </form>
  );
};

export default CreateTaskBar;