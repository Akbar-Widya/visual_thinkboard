import { useTaskStore } from "../store/useTaskStore";
import { useState, useEffect } from "react";

const DetailPanel = () => {
  const { selectedTask, setSelectedTask, updateDescription } = useTaskStore();
  const [desc, setDesc] = useState("");

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  // Update local state when the selected task changes
  useEffect(() => {
    setDesc(selectedTask?.description || "");
  }, [selectedTask]);

  if (!selectedTask) return null;

  return (
    <div className="w-96 border-l border-border bg-white flex flex-col p-5 shadow-xl animate-in slide-in-from-right duration-200">
      <div className="flex justify-between items-start mb-5 gap-3">
        <h2 className="text-lg font-bold text-text-main leading-tight">
          {selectedTask.title}
        </h2>
        <button
          onClick={() => setSelectedTask(null)}
          className="text-text-muted hover:text-text-main cursor-pointer text-xl p-1 -mt-1"
        >
          ✕
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          onBlur={() => updateDescription(selectedTask.id, desc)}
          placeholder="Add more details..."
          className="w-full h-50 p-3 bg-side-bg border border-border rounded-md text-sm focus:outline-none focus:border-accent resize-none"
        />
        <p className="text-[10px] text-text-muted italic">
          Saves automatically when you click away.
        </p>
      </div>

      <div className="mt-8 pt-4 border-t border-border">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-bold uppercase text-text-muted tracking-wide">
            Created
          </span>
          <span className="text-xs text-text-main">
            {formatDate(selectedTask.created_at)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetailPanel;
