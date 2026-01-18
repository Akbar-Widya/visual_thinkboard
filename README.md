# Workspace: Minimalist Task Management

A high-density, "Function First" task management application built with **React**, **Tailwind 4**, and **Supabase**. This project focuses on a streamlined user experience inspired by professional tools like Slack and Linear.

## 🚀 Core Features

* **Real-time Synchronization:** Powered by Supabase Postgres changes for instant updates across clients.
* **Built-in Authentication:** Secure user sessions using Supabase Auth (Email/Password).
* **Hybrid View System:** Seamlessly switch between a high-density **List View** and a **Kanban Board**.
* **Global State Management:** Managed via **Zustand** for a single source of truth and predictable data flow.
* **Responsive Detail Panel:** Edit task descriptions with auto-save functionality (`onBlur` pattern).
* **Row-Level Security (RLS):** Database-level security ensuring users can only access their own data.

## 🛠️ Tech Stack

* **Frontend:** React 19, Vite, Tailwind CSS 4.
* **State:** Zustand (Global Store).
* **Backend/Database:** Supabase (PostgreSQL).
* **Routing:** React Router 7.

## 📁 Architecture

The project follows a "Vital Organs" folder structure to keep logic and UI strictly separated:

* `/src/store`: Centralized logic (The Brain).
* `/src/lib`: Configuration and API clients (The Bridge).
* `/src/views`: Page-level components (The Context).
* `/src/components`: Reusable, atomic UI units (The Skeleton).

## ⚙️ Setup

1. **Clone and Install:**
```bash
npm install

```


2. **Environment Variables:**
Create a `.env` file in the root:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

```


3. **Database Setup:**
Run the provided SQL schema in your Supabase SQL Editor to create the `tasks` table with RLS policies enabled.
4. **Run Development:**
```bash
npm run dev

```



---

### Final Next Step:

Your code and documentation are now complete. Since you mentioned this is for your portfolio, the final stage is **Deployment**.

**Would you like me to guide you through the 2-minute process of deploying this to Vercel so you have a live link to show people?**