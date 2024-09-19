import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function TaskList({
  tasks,
  onDelete,
  onEdit,
  editingTaskId,
  editedTask,
  setEditedTask,
  onUpdate,
  onCancelEdit,
}: {
  tasks: { id: string; task: string; status: boolean }[];
  onDelete: (id: string) => void;
  onEdit: (id: string, task: string) => void;
  editingTaskId: string | null;
  editedTask: string;
  setEditedTask: (task: string) => void;
  onUpdate: (id: string) => void;
  onCancelEdit: () => void;
}) {
  return (
    <div className="w-full">
      {tasks.length === 0 ? (
        <p className="text-center">No tasks yet.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id}>
              <Card className="bg-gray-800 text-white w-full">
                <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4">
                  {editingTaskId === task.id ? (
                    <div className="flex flex-col sm:flex-row w-full gap-4">
                      <input
                        type="text"
                        value={editedTask}
                        onChange={(e) => setEditedTask(e.target.value)}
                        className="bg-gray-700 text-white p-2 w-full sm:w-auto flex-grow"
                      />
                      <div className="flex gap-2">
                        <Button onClick={() => onUpdate(task.id)} className="bg-green-600 hover:bg-green-700">
                          Save
                        </Button>
                        <Button onClick={onCancelEdit} className="bg-gray-600 hover:bg-gray-700">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row w-full gap-4 items-start">
                     
                      <div className="flex-grow">
                        <span
                          style={{
                            wordBreak: 'break-word',
                            overflowWrap: 'anywhere',
                            whiteSpace: 'normal',
                          }}
                        >
                          {task.task}
                        </span>
                      </div>

                     
                      <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0 ml-auto">
                        <Button
                          onClick={() => onEdit(task.id, task.task)}
                          className="bg-yellow-500 hover:bg-yellow-600"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => onDelete(task.id)}
                          className="text-white bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
