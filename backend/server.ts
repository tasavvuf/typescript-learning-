import express, { json, type Request, type Response } from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello from TypeScript + Bun",
  });
});

type User = {
  id: number;
  name: string;
  email: string;
  age: number;
};
let users: User[] = [{ id: 1, name: "tasav", email: "tev@gmail.com", age: 20 }];
let currentId = users.length > 0 ? Math.max(...users.map((u) => u.id)) : 0;
app.get("/users", (_, res) => {
  res.json(users);
});

type Task = {
  id: number;
  title: string;
  des: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  UserId: number;
  createdAt: Date;
  updatedAt: Date;
};
let tasks: Task[] = [
  {
    id: 1,
    title: "task1",
    des: "task1",
    completed: false,
    priority: "low",
    UserId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
let currentTaskId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) : 0;

type createTaskDto = {
  title: string;
  des: string;
  priority: "low" | "medium" | "high";
  UserId: number;
};
app.post("/tasks", (req: Request<{}, {}, createTaskDto>, res: Response) => {
  const { title, des, priority, UserId } = req.body;
  if (!title || !des || !priority || !UserId) {
    return res.status(400).json({ error: "missing fields" });
  }
  const foundUser = users.find((u) => u.id === UserId);
  if (!foundUser) {
    return res.status(404).json({ error: "User not found" });
  }
  const newTask: Task = {
    id: ++currentTaskId,
    title,
    des,
    priority,
    UserId,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  tasks.push(newTask);
  res.status(201).json({ createdTask: newTask, tasks });
});
app.get("/users/:id", (req, res) => {
  let id: number = Number(req.params.id);
  const foundUser = users.find((u) => u.id === id);
  if (!foundUser) {
    res.status(400).json({ error: "no user found" });
  }
  res.json({
    user: foundUser,
  });
});
type CreateUserDto = {
  name: string;
  email: string;
  age: number;
};
app.post("/users", (req: Request<{}, {}, CreateUserDto>, res: Response) => {
  const { name, email, age } = req.body;
  const newUser: User = {
    id: ++currentId,
    name,
    email,
    age,
  };
  users.push(newUser);
  res.status(201).json({ createdUser: newUser, users });
});
app.get("/tasks/:id", (req: Request<{ id: string }>, res: Response) => {
  let id: number = Number(req.params.id);
  const foundTask = tasks.find((t) => t.id === id);
  if (!foundTask) {
    return res.status(404).json({ error: "task not found" });
  }
  res.json({ task: foundTask });
});
app.patch(
  "/notes/:id",
  (req: Request<{ id: string }, {}, {}>, res: Response) => {
    let id: number = Number(req.params.id);
    const task = tasks.find((t) => t.id === id);
    if (!task) {
      res.status(404).json({ message: "no task found" });
    }
    tasks = tasks.map((t) =>
      t.id === id
        ? { ...t, completed: !t.completed, updatedAt: new Date() }
        : t,
    );
    return res.json({ updatedTask: tasks.find((t) => t.id === id), tasks });
  },
);
type GetTasksQuery = {
  completed?: string;
  priority?: string;
  userId?:string
};

app.get("/tasks", (req: Request<{}, {}, {}, GetTasksQuery>, res: Response) => {
  const { completed: completedQuery, priority: priorityQuery, userId: userIdQuery } = req.query;

  let userId: number | undefined;
  if (userIdQuery !== undefined) {
    const parsedUserId = Number(userIdQuery);
    if (!isNaN(parsedUserId)) {
      userId = parsedUserId;
    }
  }

  let completed: boolean | undefined;
  if (completedQuery === "true") completed = true;
  if (completedQuery === "false") completed = false;

  let priority: Task["priority"] | undefined;
  if (
    priorityQuery === "low" ||
    priorityQuery === "medium" ||
    priorityQuery === "high"
  ) {
    priority = priorityQuery;
  }

  let filteredTasks = tasks;

  if (completed !== undefined) {
    filteredTasks = filteredTasks.filter((t) => t.completed === completed);
  }

  if (priority !== undefined) {
    filteredTasks = filteredTasks.filter((t) => t.priority === priority);
  }

  if (userId !== undefined) {
    filteredTasks = filteredTasks.filter((t) => t.UserId === userId);
  }

  return res.json({ tasks: filteredTasks });
});
app.delete(
  "/tasks/:id",
  (req: Request<{ id: string }, {}, {}>, res: Response) => {
    let id: number = Number(req.params.id);
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task not found" });
    }
    tasks = tasks.filter((t) => t.id !== id);
    return res.json({ message: "Task deleted successfully", tasks });
  },
);

app.delete(
  "/users/:id",
  (req: Request<{ id: string }, {}, {}>, res: Response) => {
    let id: number = Number(req.params.id);

    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }
    users = users.filter((u) => u.id !== id);
    res.json({ message: "User deleted successfully", users });
  },
);
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
