import { useTaskStore } from '../store/useTaskStore';

const SearchBox = () => {
  const { searchQuery, setSearchQuery } = useTaskStore();

  return (
    <div className="px-4 py-2 border-b border-border bg-white">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-side-bg border border-border rounded px-3 py-1 text-sm focus:outline-none focus:border-accent"
      />
    </div>
  );
};

export default SearchBox;