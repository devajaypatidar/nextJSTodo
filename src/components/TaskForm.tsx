import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TaskForm({ onSubmit }: { onSubmit: (task: string) => void }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;
    onSubmit(task);
    setTask(""); 
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-center">
      <div className="flex flex-col gap-2">
        <Label htmlFor="task">New Task</Label>
        <Input
          id="task"
          type="text"
          placeholder="Enter your task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </div>
      <Button type="submit" className="self-end">Add Task</Button>
    </form>
  );
}
