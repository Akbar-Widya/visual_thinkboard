import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useTaskStore = create((set, get) => ({
  user: null,
  tasks: [],
  loading: false,
  selectedTask: null,
  searchQuery: '',

  setUser: (user) => set({ user }),
  setSelectedTask: (task) => set({ selectedTask: task }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  fetchTasks: async () => {
    set({ loading: true });
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('position', { ascending: true });

    if (!error) set({ tasks: data });
    set({ loading: false });
  },

  addTask: async (title) => {
    if (!title.trim()) return;

    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title, status: 'todo' }])
      .select();

    if (!error) {
      // Append the new task from db to the existing tasks state
      set((state) => ({ tasks: [...state.tasks, ...data] }));
    } else {
      alert("Error adding task");
    }
  },

  // Add this inside your useTaskStore create() block
  updateTaskStatus: async (taskId, newStatus) => {
    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', taskId);

    if (!error) {
      // Local Update (Optimistic)
      set((state) => ({
        // state.tasks is the existing tasks state
        tasks: state.tasks.map((t) =>
          t.id === taskId ? { ...t, status: newStatus } : t
        ),
      }));
    } else {
      alert("Failed to update task status");
    }
  },

  // Add this inside your useTaskStore create() block
  deleteTask: async (taskId) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);

    if (!error) {
      // Local Update: Filter out the deleted task
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== taskId),
      }));
    } else {
      alert("Failed to delete task");
    }
  },

  updateDescription: async (taskId, description) => {
    const { error } = await supabase
      .from('tasks')
      .update({ description })
      .eq('id', taskId);

    if (!error) {
      set((state) => ({
        tasks: state.tasks.map((t) => 
          t.id === taskId ? { ...t, description } : t
        ),
        // Sync the selected task view as well
        selectedTask: state.selectedTask?.id === taskId 
          ? { ...state.selectedTask, description } 
          : state.selectedTask
      }));
    }
  }
}));