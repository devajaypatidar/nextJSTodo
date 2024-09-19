"use client";

import { useEffect, useState } from "react";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const API_URL = "http://localhost:5000/api"; 

export default function Home() {
  const [tasks, setTasks] = useState<{ id: string; task: string; status: boolean }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedTask, setEditedTask] = useState<string>("");

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/tasks`);
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const fetchedTasks = await response.json();
      setTasks(fetchedTasks);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  
  const handleAddTask = async (newTask: string) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: newTask }),
      });
      if (!response.ok) {
        throw new Error("Failed to create task");
      }
      await fetchTasks(); 
    } catch (err) {
      setError("Failed to create task. Please try again.");
    }
  };

  
  const handleDeleteTask = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      await fetchTasks(); 
    } catch (err) {
      setError("Failed to delete task. Please try again.");
    }
  };

  
  const handleEditTask = (id: string, task: string) => {
    setEditingTaskId(id);
    setEditedTask(task); 
  };

  
  const handleUpdateTask = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: editedTask }),
      });
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      await fetchTasks(); 
      setEditingTaskId(null); 
      setEditedTask(""); 
    } catch (err) {
      setError("Failed to update task. Please try again.");
    }
  };

  
  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditedTask("");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start ">
       
        <Card className="w-full bg-black text-white">
          <CardContent>
            <h1 className="text-3xl font-bold">To-Do List</h1>
          </CardContent>
        </Card>

        
        <TaskForm onSubmit={handleAddTask} />

        
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        
        <Separator className="my-4 w-full" />

        
        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <TaskList
            tasks={tasks}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
            editingTaskId={editingTaskId}
            editedTask={editedTask}
            setEditedTask={setEditedTask}
            onUpdate={handleUpdateTask}
            onCancelEdit={handleCancelEdit}
          />
        )}
      </main>
    </div>
  );
}
