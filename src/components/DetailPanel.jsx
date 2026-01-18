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
    <div className="w-96 border-l border-border bg-white flex flex-col p-6 shadow-xl animate-in slide-in-from-right duration-200">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted">
          Task Detail
        </h2>
        <button
          onClick={() => setSelectedTask(null)}
          className="text-text-muted hover:text-text-main cursor-pointer"
        >
          ✕
        </button>
      </div>

      <h3 className="text-lg font-bold mb-4">{selectedTask.title}</h3>

      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase text-text-muted">
          Description
        </label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          onBlur={() => updateDescription(selectedTask.id, desc)}
          placeholder="Add more details..."
          className="w-full h-40 p-3 bg-side-bg border border-border rounded-md text-sm focus:outline-none focus:border-accent resize-none"
        />
        <p className="text-[10px] text-text-muted italic">
          Saves automatically when you click away.
        </p>
      </div>
      <div className="mt-auto pt-6 border-t border-border">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase text-text-muted">
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
