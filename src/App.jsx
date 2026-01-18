import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./lib/supabase";
import { useTaskStore } from "./store/useTaskStore";
import AuthView from "./views/AuthView";
import Sidebar from "./components/Sidebar";
import BoardView from "./views/BoardView";
import ListView from "./views/ListView";
import DetailPanel from "./components/DetailPanel";

function App() {
  const { user, setUser, fetchTasks } = useTaskStore();

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setUser(session?.user ?? null));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) fetchTasks();
  }, [user]);

  if (!user) return <AuthView />;

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar />
        <main className="main-viewport flex flex-row">
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <Routes>
              <Route path="/board" element={<BoardView />} />
              <Route path="/list" element={<ListView />} />
              <Route path="*" element={<Navigate to="/board" />} />
            </Routes>
          </div>
          <DetailPanel />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
