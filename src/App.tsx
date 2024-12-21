// import { useEffect, useState } from "react";
// import type { Schema } from "../amplify/data/resource";
// import { generateClient } from "aws-amplify/data";
// import { useAuthenticator } from '@aws-amplify/ui-react';
// import { SideBar } from "./components/SideBar/SideBar";
// import { Outlet } from "react-router";
import Dashboard from "./dashboard/Dashboard";

function App() {
  
  return (
    <main>
      <Dashboard/>
    </main>
  );
  // const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  // const { signOut } = useAuthenticator();

  // useEffect(() => {
  //   client.models.Todo.observeQuery().subscribe({
  //     next: (data) => setTodos([...data.items]),
  //   });
  // }, []);

  // function createTodo() {
  //   client.models.Todo.create({ content: window.prompt("Todo content") });
  // }

  // function deleteTodo(id: string) {
  //   client.models.Todo.delete({ id })
  // }
}

export default App;
