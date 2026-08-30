import express, { json , type Request, type Response} from "express";

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
let users: User[] = [
  { id: 1, name: "tasav", email: "tev@gmail.com", age: 20 },
];
let currentId = users.length > 0 ? Math.max(...users.map((u) => u.id)) : 0;
app.get("/users", (_, res) => {
  res.json(users);
});

app.get("/users/:id", (req , res) => {
  let id: number = Number(req.params.id);
  const foundUser = users.find((u) => u.id === id);
  if (!foundUser) {
    res.status(400).json({ error: "no user found" });
  }
  res.json({
    user :foundUser,
  });
});
type CreateUserDto = {
  name: string;
  email: string;
  age: number;
};
app.post("/users",(req : Request<{},{},CreateUserDto>,res:Response)=>{
  const { name , email , age} = req.body
  const newUser : User = {
    id : ++currentId, 
    name,
    email ,
    age
  }
  users.push(newUser)
  res.status(201).json({createdUser:newUser , users})
})


app.delete("/users/:id",(req : Request<{id:string},{},{}> , res:Response)=>{
 let id: number = Number(req.params.id);


  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }
 users = users.filter((u) => u.id !== id);
 res.json({ message: "User deleted successfully", users });
})
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
